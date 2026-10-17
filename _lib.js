// Shared helpers for the API routes: Upstash Redis (REST), auth cookie, JSON merge.
const crypto = require("crypto");

const REDIS_URL = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "").replace(/\/$/, "");
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const P = process.env.KEY_PREFIX || "wfd:";
const KEYS = { ver: P + "ver", vers: P + "vers", doc: (path) => P + "doc:" + path };

async function redis(command) {
  if (!REDIS_URL || !REDIS_TOKEN) throw Object.assign(new Error("Redis is not configured"), { code: "db_not_configured" });
  const r = await fetch(REDIS_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  const j = await r.json();
  if (!r.ok || j.error) throw new Error(j.error || `Redis error ${r.status}`);
  return j.result;
}

// Atomically write (or delete) a doc and bump its version.
// expected: "*" = unconditional, "" = must not exist yet, "<n>" = must still be at version n.
// Returns the new version, or -1 if the doc changed underneath us.
const WRITE_LUA = `
local cur = redis.call('HGET', KEYS[3], ARGV[1])
if ARGV[3] ~= '*' and (cur or '') ~= ARGV[3] then return -1 end
local v = redis.call('INCR', KEYS[1])
if ARGV[2] == '' then redis.call('DEL', KEYS[2]) else redis.call('SET', KEYS[2], ARGV[2]) end
redis.call('HSET', KEYS[3], ARGV[1], v)
return v`;

function writeDoc(path, json, expected) {
  return redis(["EVAL", WRITE_LUA, "3", KEYS.ver, KEYS.doc(path), KEYS.vers, path, json, expected]);
}

function deepMerge(a, b) {
  const o = { ...(a && typeof a === "object" && !Array.isArray(a) ? a : {}) };
  for (const k of Object.keys(b || {})) {
    const v = b[k];
    o[k] = v && typeof v === "object" && !Array.isArray(v) && o[k] && typeof o[k] === "object" && !Array.isArray(o[k])
      ? deepMerge(o[k], v) : v;
  }
  return o;
}

// ---- Auth: one shared family passcode -> signed HttpOnly cookie ----
const COOKIE = "wfd_auth";
function sessionToken() {
  const pass = process.env.FAMILY_PASSCODE || "";
  return crypto.createHmac("sha256", process.env.SESSION_SECRET || pass).update("wfd-session:" + pass).digest("base64url");
}
function safeEqual(a, b) {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}
function readCookie(req, name) {
  const m = (req.headers.cookie || "").split(/;\s*/).find((c) => c.startsWith(name + "="));
  return m ? decodeURIComponent(m.slice(name.length + 1)) : "";
}
function requireAuth(req, res) {
  if (!process.env.FAMILY_PASSCODE) {
    res.status(500).json({ code: "not_configured", error: "Set FAMILY_PASSCODE in Vercel." });
    return false;
  }
  if (!safeEqual(readCookie(req, COOKIE), sessionToken())) {
    res.status(401).json({ code: "unauthorized", error: "Sign in first." });
    return false;
  }
  return true;
}

const PATH_RE = /^[A-Za-z0-9_\-.:@+]{1,200}(\/[A-Za-z0-9_\-.:@+]{1,200}){1,3}$/;

function fail(res, e) {
  console.error(e);
  const code = e && e.code === "db_not_configured" ? "db_not_configured" : "server_error";
  res.status(500).json({ code, error: code === "db_not_configured" ? "Connect Upstash Redis in Vercel." : "Server error." });
}

module.exports = { redis, writeDoc, deepMerge, KEYS, COOKIE, sessionToken, safeEqual, requireAuth, PATH_RE, fail };

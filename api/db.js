// POST { op: "set" | "update" | "delete", path, data } -> { ver }
// "update" deep-merges nested objects (arrays and null replace), retried on concurrent edits.
const { redis, writeDoc, deepMerge, KEYS, requireAuth, PATH_RE, fail } = require("./_lib");

const MAX_BYTES = 256 * 1024;

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!requireAuth(req, res)) return;
  const { op, path, data } = req.body || {};
  if (!PATH_RE.test(String(path || "")) || /(^|\/)\.+(\/|$)/.test(path)) return res.status(400).json({ code: "bad_path", error: "Invalid path." });
  if (op !== "delete" && (!data || typeof data !== "object" || Array.isArray(data)))
    return res.status(400).json({ code: "bad_data", error: "Data must be an object." });
  try {
    if (op === "set") {
      const json = JSON.stringify(data);
      if (Buffer.byteLength(json) > MAX_BYTES) return res.status(413).json({ code: "too_large" });
      return res.status(200).json({ ver: await writeDoc(path, json, "*") });
    }
    if (op === "delete") {
      return res.status(200).json({ ver: await writeDoc(path, "", "*") });
    }
    if (op === "update") {
      for (let attempt = 0; attempt < 8; attempt++) {
        const [cur, raw] = await Promise.all([redis(["HGET", KEYS.vers, path]), redis(["GET", KEYS.doc(path)])]);
        const merged = deepMerge(raw ? JSON.parse(raw) : {}, data);
        const json = JSON.stringify(merged);
        if (Buffer.byteLength(json) > MAX_BYTES) return res.status(413).json({ code: "too_large" });
        const v = await writeDoc(path, json, raw == null ? (cur == null ? "" : String(cur)) : String(cur));
        if (v !== -1) return res.status(200).json({ ver: v });
        await new Promise((r) => setTimeout(r, 30 + Math.random() * 80));
      }
      return res.status(409).json({ code: "conflict", error: "Busy, try again." });
    }
    return res.status(400).json({ code: "bad_op", error: "Unknown op." });
  } catch (e) {
    fail(res, e);
  }
};

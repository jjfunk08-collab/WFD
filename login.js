// POST {passcode} -> sets the session cookie. DELETE -> signs out.
const { redis, COOKIE, sessionToken, safeEqual, fail } = require("./_lib");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
    return res.status(200).json({ ok: true });
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const pass = process.env.FAMILY_PASSCODE;
  if (!pass) return res.status(500).json({ code: "not_configured", error: "The app isn't set up yet: add FAMILY_PASSCODE in Vercel." });

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  const failKey = "wfd:loginfail:" + ip;
  try {
    const fails = Number(await redis(["GET", failKey])) || 0;
    if (fails >= 10) return res.status(429).json({ error: "Too many tries. Wait 15 minutes." });
    const given = String((req.body && req.body.passcode) || "");
    if (!safeEqual(given, pass)) {
      await redis(["INCR", failKey]);
      await redis(["EXPIRE", failKey, "900"]);
      await new Promise((r) => setTimeout(r, 600));
      return res.status(401).json({ error: "That passcode didn't work." });
    }
    await redis(["DEL", failKey]);
    res.setHeader("Set-Cookie", `${COOKIE}=${encodeURIComponent(sessionToken())}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=31536000`);
    return res.status(200).json({ ok: true });
  } catch (e) {
    return fail(res, e);
  }
};

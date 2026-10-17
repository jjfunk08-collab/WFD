// POST { prompt, tier: "default" | "quick", images: [{ media_type, data(base64) }] } -> { result: <parsed JSON> }
const { requireAuth } = require("./_lib");

const SYSTEM =
  "You are the meal-planning assistant inside a family dinner app in Connecticut. " +
  "Reply with only valid JSON exactly in the shape requested. No prose, no markdown, no code fences.";

function extractJson(text) {
  const t = String(text || "").replace(/```(?:json)?/gi, "").trim();
  try { return JSON.parse(t); } catch {}
  const starts = [t.indexOf("{"), t.indexOf("[")].filter((i) => i >= 0);
  if (!starts.length) throw new Error("no json");
  const s = Math.min(...starts);
  const e = Math.max(t.lastIndexOf("}"), t.lastIndexOf("]"));
  return JSON.parse(t.slice(s, e + 1));
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!requireAuth(req, res)) return;
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(501).json({ code: "ai_not_configured" });

  const { prompt, tier, images } = req.body || {};
  if (!prompt || typeof prompt !== "string") return res.status(400).json({ code: "bad_prompt" });
  if (prompt.length > 120000) return res.status(413).json({ code: "prompt_too_large" });
  const quick = tier === "quick";
  const model = quick
    ? process.env.ANTHROPIC_MODEL_QUICK || "claude-haiku-5-5"
    : process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
  const content = [
    ...(Array.isArray(images) ? images.slice(0, 4) : [])
      .filter((i) => i && /^image\/(jpeg|png|webp|gif)$/.test(i.media_type) && typeof i.data === "string")
      .map((i) => ({ type: "image", source: { type: "base64", media_type: i.media_type, data: i.data } })),
    { type: "text", text: prompt },
  ];

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model, max_tokens: quick ? 2000 : 8000, system: SYSTEM, messages: [{ role: "user", content }] }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error("Anthropic error", r.status, j && j.error);
      const msg = String((j && j.error && j.error.message) || "");
      const code = r.status === 429 || r.status === 529 ? "rate_limited"
        : /too long|too many tokens|prompt is too long/i.test(msg) ? "prompt_too_large"
        : /image/i.test(msg) ? "image_rejected" : "error";
      return res.status(r.status === 429 ? 429 : 502).json({ code });
    }
    const text = (j.content || []).filter((b) => b.type === "text").map((b) => b.text).join("\n");
    if (!text.trim()) return res.status(502).json({ code: "empty_completion" });
    try {
      return res.status(200).json({ result: extractJson(text) });
    } catch {
      return res.status(502).json({ code: "invalid_json" });
    }
  } catch (e) {
    console.error(e);
    return res.status(502).json({ code: "error" });
  }
};

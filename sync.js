// GET ?since=<version> -> { ver, docs: { path: data | null } } for every doc changed after `since`.
const { redis, KEYS, requireAuth, fail } = require("./_lib");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (!requireAuth(req, res)) return;
  try {
    const since = Math.max(0, parseInt(req.query.since, 10) || 0);
    const flat = (await redis(["HGETALL", KEYS.vers])) || [];
    let ver = since;
    const changed = [];
    for (let i = 0; i < flat.length; i += 2) {
      const v = Number(flat[i + 1]);
      if (v > since) changed.push(flat[i]);
      if (v > ver) ver = v;
    }
    const docs = {};
    for (let i = 0; i < changed.length; i += 200) {
      const chunk = changed.slice(i, i + 200);
      const vals = await redis(["MGET", ...chunk.map(KEYS.doc)]);
      chunk.forEach((p, j) => { docs[p] = vals[j] == null ? null : JSON.parse(vals[j]); });
    }
    res.status(200).json({ ver, docs });
  } catch (e) {
    fail(res, e);
  }
};

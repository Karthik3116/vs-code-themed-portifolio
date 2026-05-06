import crypto from 'crypto';

const R_URL = process.env.UPSTASH_REDIS_REST_URL;
const R_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const PW = process.env.DETAILS_PASSWORD;

async function redis(...args) {
  const res = await fetch(R_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${R_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json.result;
}

function verifyAuth(req) {
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  if (!token || !PW) return false;
  const bucket = Math.floor(Date.now() / 3_600_000);
  return [bucket, bucket - 1].some(b =>
    crypto.createHmac('sha256', PW).update(String(b)).digest('hex') === token
  );
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!verifyAuth(req)) return res.status(401).json({ error: 'Unauthorized' });
  if (!R_URL || !R_TOKEN) return res.status(500).json({ error: 'Upstash not configured' });

  // ── GET: all KV pairs ─────────────────────────────────────────────────────
  if (req.method === 'GET') {
    const flat = await redis('HGETALL', 'custom:data');
    if (!flat || flat.length === 0) return res.json({ items: [] });
    const items = [];
    for (let i = 0; i < flat.length; i += 2) {
      try {
        const parsed = JSON.parse(flat[i + 1]);
        items.push({ key: flat[i], ...parsed });
      } catch {
        items.push({ key: flat[i], value: flat[i + 1], updatedAt: null });
      }
    }
    items.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
    return res.json({ items });
  }

  // ── POST: set a KV pair ───────────────────────────────────────────────────
  if (req.method === 'POST') {
    const { key, value } = req.body ?? {};
    if (!key) return res.status(400).json({ error: 'key required' });
    let parsed = value;
    if (typeof value === 'string') {
      try { parsed = JSON.parse(value); } catch { /* keep as string */ }
    }
    await redis('HSET', 'custom:data', String(key), JSON.stringify({ value: parsed, updatedAt: new Date().toISOString() }));
    return res.json({ ok: true });
  }

  // ── DELETE: remove a key ──────────────────────────────────────────────────
  if (req.method === 'DELETE') {
    const { key } = req.body ?? {};
    if (!key) return res.status(400).json({ error: 'key required' });
    await redis('HDEL', 'custom:data', String(key));
    return res.json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

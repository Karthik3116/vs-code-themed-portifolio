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

  if (!R_URL || !R_TOKEN) return res.status(500).json({ error: 'Upstash not configured' });

  // ── GET: list entries ─────────────────────────────────────────────────────
  if (req.method === 'GET') {
    const uuids = await redis('ZREVRANGE', 'status:index', '0', '199');
    if (!uuids || uuids.length === 0) return res.json({ entries: [], count: 0 });
    const values = await redis('HMGET', 'status:items', ...uuids);
    const entries = values.map(v => { try { return JSON.parse(v); } catch { return null; } }).filter(Boolean);
    return res.json({ entries, count: entries.length });
  }

  // ── POST: create entry (public — any IP allowed) ──────────────────────────
  if (req.method === 'POST') {
    const id = crypto.randomUUID();
    const entry = {
      id,
      data: req.body ?? {},
      timestamp: new Date().toISOString(),
      ip: ((req.headers['x-forwarded-for'] || '') + '').split(',')[0].trim() || 'unknown',
      ua: req.headers['user-agent'] || 'unknown',
    };
    const ts = Date.now();
    await redis('HSET', 'status:items', id, JSON.stringify(entry));
    await redis('ZADD', 'status:index', String(ts), id);
    await redis('ZREMRANGEBYRANK', 'status:index', '0', '-501'); // keep newest 500
    return res.json({ ok: true, id, timestamp: entry.timestamp });
  }

  // ── DELETE: remove entry/all (auth required) ──────────────────────────────
  if (req.method === 'DELETE') {
    if (!verifyAuth(req)) return res.status(401).json({ error: 'Unauthorized' });
    const { id, all } = req.body ?? {};
    if (all) {
      await redis('DEL', 'status:items');
      await redis('DEL', 'status:index');
      return res.json({ ok: true });
    }
    if (id) {
      await redis('HDEL', 'status:items', id);
      await redis('ZREM', 'status:index', id);
      return res.json({ ok: true });
    }
    return res.status(400).json({ error: 'Provide id or all:true' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

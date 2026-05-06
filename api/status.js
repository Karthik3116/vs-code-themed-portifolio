import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const body = req.body ?? {};
    const entry = {
      data: body,
      timestamp: new Date().toISOString(),
      ip: ((req.headers['x-forwarded-for'] || '') + '').split(',')[0].trim() || 'unknown',
      ua: req.headers['user-agent'] || 'unknown',
    };

    await kv.lpush('status:entries', entry);
    await kv.ltrim('status:entries', 0, 499); // keep last 500

    return res.status(200).json({ ok: true, timestamp: entry.timestamp });
  }

  if (req.method === 'GET') {
    const entries = await kv.lrange('status:entries', 0, 99);
    return res.status(200).json({ entries: entries ?? [], count: entries?.length ?? 0 });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

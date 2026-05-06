const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(command) {
  const res = await fetch(`${UPSTASH_URL}/${command.map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json.result;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    return res.status(500).json({
      error: 'Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN env vars. See setup instructions.',
    });
  }

  if (req.method === 'POST') {
    const body = req.body ?? {};
    const entry = JSON.stringify({
      data: body,
      timestamp: new Date().toISOString(),
      ip: ((req.headers['x-forwarded-for'] || '') + '').split(',')[0].trim() || 'unknown',
      ua: req.headers['user-agent'] || 'unknown',
    });

    await redis(['lpush', 'status:entries', entry]);
    await redis(['ltrim', 'status:entries', '0', '499']);

    return res.status(200).json({ ok: true });
  }

  if (req.method === 'GET') {
    const raw = await redis(['lrange', 'status:entries', '0', '99']);
    const entries = (raw || []).map((r) => {
      try { return JSON.parse(r); } catch { return null; }
    }).filter(Boolean);
    return res.status(200).json({ entries, count: entries.length });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

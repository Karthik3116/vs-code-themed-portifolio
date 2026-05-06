import crypto from 'crypto';

function makeToken(secret) {
  const bucket = Math.floor(Date.now() / 3_600_000);
  return crypto.createHmac('sha256', secret).update(String(bucket)).digest('hex');
}

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false });

  const { password } = req.body ?? {};
  const secret = process.env.DETAILS_PASSWORD;

  if (!secret) return res.status(500).json({ ok: false, error: 'DETAILS_PASSWORD not set' });
  if (!password || password !== secret) return res.status(401).json({ ok: false });

  return res.status(200).json({ ok: true, token: makeToken(secret) });
}

import React, { useState, useEffect, useRef } from 'react';
import Details from './Details';

export const SESSION_KEY = 'details_access';
const SESSION_TTL = 2 * 60 * 60 * 1000; // 2 hours

export function getSession() {
  try {
    const raw = JSON.parse(sessionStorage.getItem(SESSION_KEY) || '{}');
    if (!raw.token || !raw.ts) return null;
    if (Date.now() - raw.ts > SESSION_TTL) { sessionStorage.removeItem(SESSION_KEY); return null; }
    return raw;
  } catch { return null; }
}

const TerminalGate = ({ onAuth }) => {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const boot = [
      { text: '$ ssh status@karthik.top', color: 'text-green-400' },
      { text: 'Connecting to karthik.top:443...', color: 'text-gray-400' },
      { text: 'Connected. Authentication required.', color: 'text-yellow-400' },
      { text: '', color: '' },
    ];
    let i = 0;
    const t = setInterval(() => {
      if (i < boot.length) setLines(prev => [...prev, boot[i++]]);
      else { clearInterval(t); inputRef.current?.focus(); }
    }, 380);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    setLoading(true);
    setError(false);
    setLines(prev => [...prev, { text: `$ password: ${'*'.repeat(input.length)}`, color: 'text-green-400' }]);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: input }),
      });
      const json = await res.json();
      if (json.ok) {
        setLines(prev => [...prev, { text: 'Access granted. Loading dashboard...', color: 'text-emerald-400' }]);
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ts: Date.now(), token: json.token }));
        setDone(true);
        setTimeout(() => onAuth(json.token), 700);
      } else {
        setLines(prev => [...prev, { text: 'Access denied. Wrong password.', color: 'text-red-400' }]);
        setError(true);
        setLoading(false);
        setInput('');
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    } catch {
      setLines(prev => [...prev, { text: 'Error: could not reach auth server.', color: 'text-red-400' }]);
      setError(true);
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center font-mono px-4">
      <div className="w-full max-w-lg">
        <div className="border border-[#3c3c3c] rounded-lg overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#2d2d2d] border-b border-[#3c3c3c]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-[#858585]">bash — status@karthik.top</span>
          </div>
          <div className="bg-[#1e1e1e] p-5 min-h-[230px]">
            {lines.map((line, i) => (
              <p key={i} className={`text-sm leading-6 ${line.color || 'text-[#cccccc]'}`}>{line.text || ' '}</p>
            ))}
            {!done && (
              <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
                <span className="text-green-400 text-sm">$</span>
                <input
                  ref={inputRef}
                  type="password"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  disabled={loading}
                  placeholder="enter password"
                  autoComplete="off"
                  className="flex-1 bg-transparent border-none outline-none text-sm text-[#cccccc] placeholder-[#555] caret-green-400"
                />
              </form>
            )}
            {error && <p className="text-[#858585] text-xs mt-2">↑ try again</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const Access = () => {
  const [session, setSession] = useState(() => getSession());

  if (session) return <Details token={session.token} />;
  return <TerminalGate onAuth={(token) => setSession({ token, ts: Date.now() })} />;
};

export default Access;

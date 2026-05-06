import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Copy, Check, Wifi, WifiOff, Clock, Globe, Terminal } from 'lucide-react';

const ENDPOINT = '/api/status';
const REFRESH_INTERVAL = 15000;

const copyToClipboard = (text, setCopied) => {
  navigator.clipboard.writeText(text).then(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  });
};

const formatJson = (obj) => {
  try {
    return JSON.stringify(obj, null, 2);
  } catch {
    return String(obj);
  }
};

const timeAgo = (iso) => {
  const diff = Date.now() - new Date(iso).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

const StatusBadge = ({ data }) => {
  const status = data?.status || data?.state || data?.health;
  if (!status) return null;
  const color =
    ['alive', 'ok', 'up', 'healthy', 'running', 'online'].includes(String(status).toLowerCase())
      ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30'
      : ['dead', 'down', 'error', 'offline', 'failed'].includes(String(status).toLowerCase())
      ? 'text-red-400 bg-red-400/10 border-red-400/30'
      : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-mono ${color}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {String(status)}
    </span>
  );
};

const EntryCard = ({ entry, index }) => {
  const [expanded, setExpanded] = useState(index === 0);
  const [copied, setCopied] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="border border-[#3c3c3c] rounded bg-[#252526] overflow-hidden"
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#2d2d2d] transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[#858585] text-xs font-mono shrink-0">#{index + 1}</span>
          <StatusBadge data={entry.data} />
          <span className="text-[#9cdcfe] text-sm font-mono truncate">
            {Object.keys(entry.data || {}).join(', ') || 'empty'}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-3">
          <span className="text-[#858585] text-xs font-mono flex items-center gap-1">
            <Clock size={11} />
            {timeAgo(entry.timestamp)}
          </span>
          <span className="text-[#858585] text-xs font-mono flex items-center gap-1">
            <Globe size={11} />
            {entry.ip}
          </span>
          <span className={`text-[#858585] text-xs transition-transform ${expanded ? 'rotate-90' : ''}`}>›</span>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#3c3c3c] px-4 py-3 bg-[#1e1e1e]">
              <div className="flex justify-between items-start gap-2 mb-2">
                <span className="text-[#858585] text-xs font-mono">{entry.timestamp}</span>
                <button
                  onClick={() => copyToClipboard(formatJson(entry.data), setCopied)}
                  className="flex items-center gap-1 text-xs text-[#858585] hover:text-[#cccccc] transition-colors"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  {copied ? 'copied' : 'copy'}
                </button>
              </div>
              <pre className="text-sm font-mono text-[#ce9178] overflow-x-auto">
                {formatJson(entry.data)}
              </pre>
              {entry.ua && entry.ua !== 'unknown' && (
                <p className="text-[#858585] text-xs font-mono mt-2 truncate">ua: {entry.ua}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CurlBlock = () => {
  const [copied, setCopied] = useState(false);
  const cmd = `curl -X POST https://karthik.top/api/status \\
  -H "Content-Type: application/json" \\
  -d '{"status":"alive","service":"my-service"}'`;

  return (
    <div className="border border-[#3c3c3c] rounded bg-[#252526] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#3c3c3c] bg-[#2d2d2d]">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-[#858585]" />
          <span className="text-[#858585] text-xs font-mono">POST endpoint</span>
        </div>
        <button
          onClick={() => copyToClipboard(cmd, setCopied)}
          className="flex items-center gap-1 text-xs text-[#858585] hover:text-[#cccccc] transition-colors"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre className="px-4 py-3 text-xs font-mono text-[#9cdcfe] overflow-x-auto whitespace-pre-wrap">{cmd}</pre>
    </div>
  );
};

const Details = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetched, setLastFetched] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchEntries = useCallback(async () => {
    try {
      const res = await fetch(ENDPOINT);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setEntries(json.entries || []);
      setLastFetched(new Date());
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(fetchEntries, REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, [autoRefresh, fetchEntries]);

  return (
    <div className="h-full overflow-y-auto bg-[#1e1e1e] text-[#cccccc] font-mono">
      <div className="max-w-3xl mx-auto px-6 py-6">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#858585] text-sm">// Status.log</span>
          </div>
          <h1 className="text-xl font-semibold text-[#4fc1ff] mb-1">Remote Status Feed</h1>
          <p className="text-[#858585] text-sm">
            Any service can POST JSON to{' '}
            <span className="text-[#9cdcfe]">karthik.top/api/status</span>. Entries appear here, newest first.
          </p>
        </div>

        {/* cURL example */}
        <div className="mb-5">
          <CurlBlock />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-[#858585] text-sm">
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            </span>
            {lastFetched && (
              <span className="text-[#858585] text-xs">
                updated {timeAgo(lastFetched.toISOString())}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutoRefresh((v) => !v)}
              className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded border transition-colors ${
                autoRefresh
                  ? 'border-emerald-400/40 text-emerald-400 bg-emerald-400/10'
                  : 'border-[#3c3c3c] text-[#858585]'
              }`}
            >
              {autoRefresh ? <Wifi size={12} /> : <WifiOff size={12} />}
              {autoRefresh ? 'live' : 'paused'}
            </button>
            <button
              onClick={fetchEntries}
              className="flex items-center gap-1.5 text-xs text-[#858585] hover:text-[#cccccc] transition-colors px-2 py-1 rounded border border-[#3c3c3c] hover:border-[#555]"
            >
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              refresh
            </button>
          </div>
        </div>

        {/* Content */}
        {error && (
          <div className="border border-red-500/30 bg-red-500/10 rounded px-4 py-3 text-red-400 text-sm mb-4">
            Error: {error}
            {error.includes('500') || error.includes('KV') ? (
              <p className="text-xs mt-1 text-red-300/70">
                Make sure Vercel KV is configured — see setup instructions.
              </p>
            ) : null}
          </div>
        )}

        {loading && entries.length === 0 && (
          <div className="flex items-center gap-2 text-[#858585] text-sm py-8 justify-center">
            <RefreshCw size={14} className="animate-spin" />
            loading...
          </div>
        )}

        {!loading && !error && entries.length === 0 && (
          <div className="border border-[#3c3c3c] rounded bg-[#252526] px-6 py-10 text-center">
            <p className="text-[#858585] text-sm mb-2">No entries yet.</p>
            <p className="text-[#858585] text-xs">
              POST JSON to <span className="text-[#9cdcfe]">/api/status</span> from any service to see data here.
            </p>
          </div>
        )}

        <div className="space-y-2">
          {entries.map((entry, i) => (
            <EntryCard key={`${entry.timestamp}-${i}`} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;

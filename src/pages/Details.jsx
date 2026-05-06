import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  RefreshCw, Trash2, Plus, Copy, Check, Download, Search,
  Wifi, WifiOff, Globe, Clock, Terminal, LogOut, Send,
  ChevronRight, Activity, Database, Eye, EyeOff, X,
} from 'lucide-react';
import { SESSION_KEY } from './Access';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getToken() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || '{}').token || ''; }
  catch { return ''; }
}

function timeAgo(iso) {
  if (!iso) return '—';
  const s = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function prettyJson(v) {
  try { return JSON.stringify(v, null, 2); } catch { return String(v); }
}

const CHART_COLORS = ['#4fc1ff', '#4ec9b0', '#c586c0', '#dcdcaa', '#f44747', '#ce9178', '#6a9955'];

const tooltipStyle = {
  backgroundColor: '#252526', border: '1px solid #3c3c3c',
  color: '#cccccc', fontFamily: 'monospace', fontSize: 11, borderRadius: 4,
};

// ─── Toast system ─────────────────────────────────────────────────────────────

function useToasts() {
  const [toasts, setToasts] = useState([]);
  const add = useCallback((msg, type = 'ok') => {
    const id = Date.now() + Math.random();
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3200);
  }, []);
  return { toasts, add };
}

const Toasts = ({ toasts }) => (
  <div className="fixed bottom-5 right-5 flex flex-col gap-2 z-50 pointer-events-none">
    <AnimatePresence>
      {toasts.map(t => (
        <motion.div key={t.id}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
          className={`px-4 py-2 rounded border text-xs font-mono shadow-xl ${
            t.type === 'err' ? 'bg-red-950 border-red-500/40 text-red-300'
            : t.type === 'warn' ? 'bg-yellow-950 border-yellow-500/40 text-yellow-300'
            : 'bg-[#1e2a1e] border-emerald-500/40 text-emerald-300'
          }`}>
          {t.msg}
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({ label, value, sub, icon: Icon, accent = '#4fc1ff' }) => (
  <div className="bg-[#252526] border border-[#3c3c3c] rounded-lg p-4 flex flex-col gap-1">
    <div className="flex items-center justify-between">
      <span className="text-[#858585] text-xs font-mono">{label}</span>
      {Icon && <Icon size={13} style={{ color: accent }} className="opacity-60" />}
    </div>
    <p className="text-2xl font-bold font-mono" style={{ color: accent }}>{value}</p>
    {sub && <p className="text-[#555] text-xs">{sub}</p>}
  </div>
);

// ─── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ data }) => {
  const raw = data?.status ?? data?.state ?? data?.health ?? data?.alive ?? data?.ok;
  if (raw == null) return null;
  const s = String(raw).toLowerCase();
  const isGreen = ['alive', 'ok', 'up', 'healthy', 'running', 'online', 'true', '1', 'active', 'pass'].includes(s);
  const isRed = ['dead', 'down', 'error', 'offline', 'failed', 'false', '0', 'crash', 'fail'].includes(s);
  const cls = isGreen ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    : isRed ? 'text-red-400 border-red-500/30 bg-red-500/10'
    : 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-xs font-mono shrink-0 ${cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {String(raw)}
    </span>
  );
};

// ─── Entry Card ───────────────────────────────────────────────────────────────

const EntryCard = ({ entry, index, onDelete, toast }) => {
  const [open, setOpen] = useState(index === 0);
  const [copied, setCopied] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const confirmTimer = useRef(null);

  const copy = () => {
    navigator.clipboard.writeText(prettyJson(entry.data));
    setCopied(true); setTimeout(() => setCopied(false), 2000);
    toast('Copied to clipboard');
  };

  const startDelete = () => {
    if (!confirm) {
      setConfirm(true);
      confirmTimer.current = setTimeout(() => setConfirm(false), 3000);
    } else {
      clearTimeout(confirmTimer.current);
      onDelete(entry.id);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16 }} transition={{ delay: Math.min(index * 0.015, 0.25) }}
      className="border border-[#3c3c3c] rounded bg-[#252526] overflow-hidden">

      <div onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer hover:bg-[#2a2a2a] transition-colors select-none">
        <span className="text-[#444] text-xs w-6 shrink-0 text-right">#{index + 1}</span>
        <StatusBadge data={entry.data} />
        <span className="text-[#9cdcfe] text-xs font-mono flex-1 truncate min-w-0">
          {Object.keys(entry.data || {}).join(' · ') || '(empty)'}
        </span>
        <span className="text-[#555] text-xs hidden md:flex items-center gap-1 shrink-0">
          <Globe size={10} />{entry.ip}
        </span>
        <span className="text-[#555] text-xs flex items-center gap-1 shrink-0">
          <Clock size={10} />{timeAgo(entry.timestamp)}
        </span>
        <ChevronRight size={11} className={`text-[#444] shrink-0 transition-transform ${open ? 'rotate-90' : ''}`} />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="border-t border-[#3c3c3c] bg-[#1a1a1a] px-4 py-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[#555] text-xs">{entry.timestamp}</span>
                <div className="flex items-center gap-3">
                  <button onClick={copy}
                    className="flex items-center gap-1 text-xs text-[#858585] hover:text-white transition-colors">
                    {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                    {copied ? 'copied' : 'copy'}
                  </button>
                  <button onClick={startDelete}
                    className={`flex items-center gap-1 text-xs transition-colors ${confirm ? 'text-red-400 font-semibold' : 'text-[#858585] hover:text-red-400'}`}>
                    <Trash2 size={11} />
                    {confirm ? 'confirm?' : 'delete'}
                  </button>
                </div>
              </div>
              <pre className="text-sm font-mono text-[#ce9178] overflow-x-auto whitespace-pre-wrap break-all leading-5">
                {prettyJson(entry.data)}
              </pre>
              {entry.ua && entry.ua !== 'unknown' && (
                <p className="text-[#444] text-xs mt-2 truncate">ua: {entry.ua}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Feed Tab ─────────────────────────────────────────────────────────────────

const FeedTab = ({ entries, onDelete, onDeleteAll, onRefresh, toast }) => {
  const [search, setSearch] = useState('');
  const [filterIp, setFilterIp] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [addJson, setAddJson] = useState('{\n  "status": "alive"\n}');
  const [addErr, setAddErr] = useState('');
  const [adding, setAdding] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const clearTimer = useRef(null);

  const ips = useMemo(() => ['all', ...new Set(entries.map(e => e.ip).filter(Boolean))], [entries]);

  const filtered = useMemo(() => entries.filter(e => {
    if (filterIp !== 'all' && e.ip !== filterIp) return false;
    if (search) {
      const hay = (JSON.stringify(e.data) + e.ip + e.timestamp).toLowerCase();
      if (!hay.includes(search.toLowerCase())) return false;
    }
    return true;
  }), [entries, search, filterIp]);

  const handleAdd = async () => {
    setAddErr('');
    let parsed;
    try { parsed = JSON.parse(addJson); } catch { setAddErr('Invalid JSON'); return; }
    setAdding(true);
    try {
      const r = await fetch('/api/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      });
      if (!r.ok) throw new Error();
      toast('Entry added');
      setShowAdd(false);
      onRefresh();
    } catch { setAddErr('Failed to add entry'); }
    finally { setAdding(false); }
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' });
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: `status-${Date.now()}.json`,
    });
    a.click(); URL.revokeObjectURL(a.href);
    toast('Exported JSON');
  };

  const handleClearClick = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      clearTimer.current = setTimeout(() => setConfirmClear(false), 3000);
    } else {
      clearTimeout(clearTimer.current);
      setConfirmClear(false);
      onDeleteAll();
    }
  };

  return (
    <div className="space-y-3">
      {/* toolbar */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 bg-[#252526] border border-[#3c3c3c] rounded px-3 py-1.5 flex-1 min-w-[160px]">
          <Search size={12} className="text-[#555] shrink-0" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="search entries..."
            className="bg-transparent text-sm text-[#cccccc] placeholder-[#444] outline-none w-full font-mono" />
          {search && <button onClick={() => setSearch('')}><X size={11} className="text-[#555] hover:text-white" /></button>}
        </div>
        <select value={filterIp} onChange={e => setFilterIp(e.target.value)}
          className="bg-[#252526] border border-[#3c3c3c] rounded px-3 py-1.5 text-xs text-[#cccccc] font-mono outline-none cursor-pointer">
          {ips.map(ip => <option key={ip} value={ip}>{ip === 'all' ? 'all IPs' : ip}</option>)}
        </select>
        <button onClick={() => setShowAdd(v => !v)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-[#4fc1ff]/40 text-[#4fc1ff] hover:bg-[#4fc1ff]/10 transition-colors">
          <Plus size={12} />{showAdd ? 'cancel' : 'add manual'}
        </button>
        <button onClick={exportJson}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border border-[#3c3c3c] text-[#858585] hover:text-white transition-colors">
          <Download size={12} />export
        </button>
        <button onClick={handleClearClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border transition-colors ${confirmClear ? 'border-red-500/50 text-red-400 bg-red-500/10' : 'border-[#3c3c3c] text-[#858585] hover:text-red-400'}`}>
          <Trash2 size={12} />{confirmClear ? 'confirm?' : 'clear all'}
        </button>
      </div>

      {/* add form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="border border-[#3c3c3c] rounded bg-[#252526] p-4 space-y-2">
              <p className="text-[#858585] text-xs font-mono">manual entry — JSON body</p>
              <textarea value={addJson} onChange={e => setAddJson(e.target.value)} rows={5}
                className="w-full bg-[#1a1a1a] border border-[#3c3c3c] rounded px-3 py-2 text-sm font-mono text-[#ce9178] outline-none resize-y focus:border-[#555]" />
              {addErr && <p className="text-red-400 text-xs">{addErr}</p>}
              <button onClick={handleAdd} disabled={adding}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono rounded border border-emerald-500/40 text-emerald-400 hover:bg-emerald-400/10 transition-colors disabled:opacity-40">
                <Send size={11} />{adding ? 'posting...' : 'post entry'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 text-[#444] text-xs font-mono">
        <span>{filtered.length}/{entries.length} entries</span>
        {(search || filterIp !== 'all') && (
          <button onClick={() => { setSearch(''); setFilterIp('all'); }} className="text-[#4fc1ff] hover:underline">clear filters</button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-[#3c3c3c] rounded bg-[#252526] py-12 text-center">
          <p className="text-[#858585] text-sm">
            {entries.length === 0 ? 'No entries yet — POST to /api/status to begin.' : 'No entries match filters.'}
          </p>
        </div>
      ) : (
        <div className="space-y-1.5">
          <AnimatePresence>
            {filtered.map((e, i) => (
              <EntryCard key={e.id || i} entry={e} index={i} onDelete={onDelete} toast={toast} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

// ─── Store Tab ────────────────────────────────────────────────────────────────

const StoreTab = ({ items, onAdd, onDelete, toast }) => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [adding, setAdding] = useState(false);
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState(null);
  const [showValues, setShowValues] = useState({});

  const handleAdd = async () => {
    if (!key.trim()) { setErr('Key is required'); return; }
    setAdding(true); setErr('');
    try {
      await onAdd(key.trim(), value);
      setKey(''); setValue('');
    } catch (e) { setErr(e.message); }
    finally { setAdding(false); }
  };

  const copyVal = (k, v) => {
    navigator.clipboard.writeText(typeof v === 'object' ? JSON.stringify(v, null, 2) : String(v ?? ''));
    setCopied(k); setTimeout(() => setCopied(null), 2000);
    toast('Copied');
  };

  const toggleShow = (k) => setShowValues(p => ({ ...p, [k]: !p[k] }));

  const displayVal = (v) => {
    if (v == null) return '—';
    if (typeof v === 'object') return JSON.stringify(v);
    return String(v);
  };

  return (
    <div className="space-y-4">
      {/* add form */}
      <div className="border border-[#3c3c3c] rounded bg-[#252526] p-4 space-y-3">
        <p className="text-[#858585] text-xs font-mono">add / update key-value pair</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input value={key} onChange={e => setKey(e.target.value)} placeholder="key"
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            className="bg-[#1a1a1a] border border-[#3c3c3c] rounded px-3 py-1.5 text-sm font-mono text-[#9cdcfe] placeholder-[#444] outline-none sm:w-44 focus:border-[#555]" />
          <input value={value} onChange={e => setValue(e.target.value)} placeholder="value (any string or JSON)"
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            className="bg-[#1a1a1a] border border-[#3c3c3c] rounded px-3 py-1.5 text-sm font-mono text-[#ce9178] placeholder-[#444] outline-none flex-1 focus:border-[#555]" />
          <button onClick={handleAdd} disabled={adding}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono rounded border border-emerald-500/40 text-emerald-400 hover:bg-emerald-400/10 transition-colors disabled:opacity-40 shrink-0">
            <Plus size={12} />{adding ? 'saving...' : 'save'}
          </button>
        </div>
        {err && <p className="text-red-400 text-xs">{err}</p>}
      </div>

      {items.length === 0 ? (
        <div className="border border-[#3c3c3c] rounded bg-[#252526] py-12 text-center">
          <Database size={20} className="text-[#444] mx-auto mb-2" />
          <p className="text-[#858585] text-sm">No stored data yet.</p>
          <p className="text-[#555] text-xs mt-1">Add key-value pairs above.</p>
        </div>
      ) : (
        <div className="border border-[#3c3c3c] rounded overflow-hidden">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="bg-[#2d2d2d] border-b border-[#3c3c3c] text-[#858585]">
                <th className="text-left px-4 py-2 w-1/4">key</th>
                <th className="text-left px-4 py-2">value</th>
                <th className="text-left px-4 py-2 w-24 hidden sm:table-cell">updated</th>
                <th className="px-4 py-2 w-24" />
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {items.map((item, i) => (
                  <motion.tr key={item.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className={`border-b border-[#3c3c3c] last:border-0 transition-colors ${i % 2 ? 'bg-[#252526]' : 'bg-[#1e1e1e]'} hover:bg-[#2a2a2a]`}>
                    <td className="px-4 py-2.5 text-[#9cdcfe] break-all">{item.key}</td>
                    <td className="px-4 py-2.5 text-[#ce9178] max-w-xs">
                      {showValues[item.key]
                        ? <span className="break-all">{displayVal(item.value)}</span>
                        : <span className="truncate block max-w-[200px]">{displayVal(item.value)}</span>
                      }
                    </td>
                    <td className="px-4 py-2.5 text-[#555] hidden sm:table-cell">{timeAgo(item.updatedAt)}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => toggleShow(item.key)} className="text-[#555] hover:text-[#858585] transition-colors">
                          {showValues[item.key] ? <EyeOff size={12} /> : <Eye size={12} />}
                        </button>
                        <button onClick={() => copyVal(item.key, item.value)} className="text-[#555] hover:text-white transition-colors">
                          {copied === item.key ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        </button>
                        <button onClick={() => onDelete(item.key)} className="text-[#555] hover:text-red-400 transition-colors">
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ─── Analytics Tab ────────────────────────────────────────────────────────────

const AnalyticsTab = ({ entries }) => {
  const now = Date.now();

  const hourly = useMemo(() => {
    const arr = Array.from({ length: 24 }, (_, i) => {
      const ts = now - (23 - i) * 3_600_000;
      return { h: new Date(ts).getHours() + ':00', n: 0 };
    });
    entries.forEach(e => {
      const age = now - new Date(e.timestamp).getTime();
      if (age < 86_400_000) {
        const idx = 23 - Math.floor(age / 3_600_000);
        if (arr[idx]) arr[idx].n++;
      }
    });
    return arr;
  }, [entries]);

  const daily = useMemo(() => Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now - (6 - i) * 86_400_000);
    return {
      d: d.toLocaleDateString('en', { weekday: 'short' }),
      n: entries.filter(e => new Date(e.timestamp).toDateString() === d.toDateString()).length,
    };
  }), [entries]);

  const ipData = useMemo(() => {
    const c = {};
    entries.forEach(e => { if (e.ip && e.ip !== 'unknown') c[e.ip] = (c[e.ip] || 0) + 1; });
    return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([ip, n]) => ({ ip, n }));
  }, [entries]);

  const statusDist = useMemo(() => {
    const c = {};
    entries.forEach(e => {
      const s = e.data?.status ?? e.data?.state ?? e.data?.health;
      if (s != null) { const k = String(s); c[k] = (c[k] || 0) + 1; }
    });
    return Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, value]) => ({ name, value }));
  }, [entries]);

  const total24h = hourly.reduce((s, h) => s + h.n, 0);
  const total7d = daily.reduce((s, d) => s + d.n, 0);

  if (entries.length === 0) {
    return (
      <div className="border border-[#3c3c3c] rounded bg-[#252526] py-16 text-center">
        <Activity size={24} className="text-[#444] mx-auto mb-2" />
        <p className="text-[#858585] text-sm">No data to chart yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* summary row */}
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3">
          <p className="text-[#858585] text-xs font-mono">last 24 hours</p>
          <p className="text-xl font-bold text-[#4fc1ff] font-mono">{total24h}</p>
        </div>
        <div className="bg-[#252526] border border-[#3c3c3c] rounded p-3">
          <p className="text-[#858585] text-xs font-mono">last 7 days</p>
          <p className="text-xl font-bold text-[#4ec9b0] font-mono">{total7d}</p>
        </div>
      </div>

      {/* entries per hour */}
      <div className="border border-[#3c3c3c] rounded bg-[#252526] p-4">
        <p className="text-[#858585] text-xs font-mono mb-3">entries per hour — last 24h</p>
        <ResponsiveContainer width="100%" height={170}>
          <AreaChart data={hourly}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4fc1ff" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#4fc1ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey="h" stroke="#333" tick={{ fill: '#555', fontSize: 9 }} interval={3} />
            <YAxis stroke="#333" tick={{ fill: '#555', fontSize: 9 }} allowDecimals={false} width={24} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="n" name="entries" stroke="#4fc1ff" fill="url(#g1)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* entries per day */}
        <div className="border border-[#3c3c3c] rounded bg-[#252526] p-4">
          <p className="text-[#858585] text-xs font-mono mb-3">entries per day — last 7d</p>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={daily}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="d" stroke="#333" tick={{ fill: '#555', fontSize: 9 }} />
              <YAxis stroke="#333" tick={{ fill: '#555', fontSize: 9 }} allowDecimals={false} width={24} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="n" name="entries" fill="#4ec9b0" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* status distribution */}
        {statusDist.length > 0 ? (
          <div className="border border-[#3c3c3c] rounded bg-[#252526] p-4">
            <p className="text-[#858585] text-xs font-mono mb-3">status values</p>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie data={statusDist} dataKey="value" nameKey="name" innerRadius={38} outerRadius={58} paddingAngle={3}>
                  {statusDist.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend formatter={v => <span style={{ color: '#858585', fontSize: 10, fontFamily: 'monospace' }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="border border-[#3c3c3c] rounded bg-[#252526] p-4 flex items-center justify-center">
            <p className="text-[#444] text-xs font-mono">no status/state/health field in entries</p>
          </div>
        )}
      </div>

      {/* top IPs */}
      {ipData.length > 0 && (
        <div className="border border-[#3c3c3c] rounded bg-[#252526] p-4">
          <p className="text-[#858585] text-xs font-mono mb-3">top source IPs</p>
          <ResponsiveContainer width="100%" height={Math.max(100, ipData.length * 30)}>
            <BarChart data={ipData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis type="number" stroke="#333" tick={{ fill: '#555', fontSize: 9 }} allowDecimals={false} />
              <YAxis dataKey="ip" type="category" stroke="#333" tick={{ fill: '#9cdcfe', fontSize: 9 }} width={120} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="n" name="requests" fill="#c586c0" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const Details = ({ token: tokenProp }) => {
  const token = tokenProp || getToken();
  const authH = useMemo(() => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }), [token]);

  const [entries, setEntries] = useState([]);
  const [kvItems, setKvItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState('feed');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastAt, setLastAt] = useState(null);
  const { toasts, add: toast } = useToasts();

  const fetchAll = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const [sr, dr] = await Promise.all([
        fetch('/api/status'),
        fetch('/api/data', { headers: authH }),
      ]);
      if (sr.status === 401 || dr.status === 401) {
        sessionStorage.removeItem(SESSION_KEY);
        window.location.reload();
        return;
      }
      const [sj, dj] = await Promise.all([sr.json(), dr.json()]);
      setEntries(sj.entries || []);
      setKvItems(dj.items || []);
      setLastAt(new Date());
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [authH]);

  useEffect(() => { fetchAll(); }, [fetchAll]);
  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(() => fetchAll(true), 15_000);
    return () => clearInterval(id);
  }, [autoRefresh, fetchAll]);

  const stats = useMemo(() => {
    const now = Date.now();
    return {
      total: entries.length,
      today: entries.filter(e => now - new Date(e.timestamp) < 86_400_000).length,
      ips: new Set(entries.map(e => e.ip).filter(ip => ip && ip !== 'unknown')).size,
      last: entries[0]?.timestamp,
    };
  }, [entries]);

  const deleteEntry = useCallback(async (id) => {
    try {
      const r = await fetch('/api/status', { method: 'DELETE', headers: authH, body: JSON.stringify({ id }) });
      if (!r.ok) throw new Error();
      setEntries(p => p.filter(e => e.id !== id));
      toast('Entry deleted');
    } catch { toast('Delete failed', 'err'); }
  }, [authH, toast]);

  const deleteAll = useCallback(async () => {
    try {
      const r = await fetch('/api/status', { method: 'DELETE', headers: authH, body: JSON.stringify({ all: true }) });
      if (!r.ok) throw new Error();
      setEntries([]);
      toast('All entries cleared');
    } catch { toast('Failed to clear', 'err'); }
  }, [authH, toast]);

  const addKv = useCallback(async (key, value) => {
    const r = await fetch('/api/data', { method: 'POST', headers: authH, body: JSON.stringify({ key, value }) });
    if (!r.ok) throw new Error('Failed to save');
    await fetchAll(true);
    toast('Saved');
  }, [authH, fetchAll, toast]);

  const deleteKv = useCallback(async (key) => {
    try {
      const r = await fetch('/api/data', { method: 'DELETE', headers: authH, body: JSON.stringify({ key }) });
      if (!r.ok) throw new Error();
      setKvItems(p => p.filter(i => i.key !== key));
      toast('Key deleted');
    } catch { toast('Delete failed', 'err'); }
  }, [authH, toast]);

  const logout = () => { sessionStorage.removeItem(SESSION_KEY); window.location.reload(); };

  const TABS = [
    { id: 'feed', label: 'Feed', badge: entries.length },
    { id: 'store', label: 'Store', badge: kvItems.length },
    { id: 'analytics', label: 'Analytics', badge: null },
  ];

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#cccccc] font-mono flex flex-col">

      {/* ── Top bar ── */}
      <div className="border-b border-[#3c3c3c] bg-[#252526] px-5 py-2.5 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <Terminal size={15} className="text-[#4fc1ff] shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#cccccc] leading-tight">Status Dashboard</p>
            <p className="text-[#555] text-xs">www.karthik.top/api/status</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {lastAt && <span className="text-[#444] text-xs hidden lg:block">{timeAgo(lastAt.toISOString())}</span>}
          <button onClick={() => setAutoRefresh(v => !v)}
            className={`flex items-center gap-1 text-xs px-2 py-1 rounded border transition-colors ${autoRefresh ? 'border-emerald-500/30 text-emerald-400' : 'border-[#3c3c3c] text-[#555]'}`}>
            {autoRefresh ? <Wifi size={10} /> : <WifiOff size={10} />}
            <span className="hidden sm:inline">{autoRefresh ? 'live' : 'paused'}</span>
          </button>
          <button onClick={() => fetchAll()} className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-[#3c3c3c] text-[#858585] hover:text-white transition-colors">
            <RefreshCw size={10} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={logout} title="Logout" className="flex items-center gap-1 text-xs px-2 py-1 rounded border border-[#3c3c3c] text-[#858585] hover:text-red-400 transition-colors">
            <LogOut size={10} />
          </button>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="px-5 pt-4 pb-3 grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
        <StatCard label="total entries" value={stats.total} icon={Database} />
        <StatCard label="last 24 h" value={stats.today} accent="#4ec9b0" icon={Clock} />
        <StatCard label="unique IPs" value={stats.ips} accent="#c586c0" icon={Globe} />
        <StatCard
          label="last seen"
          value={stats.last ? timeAgo(stats.last) : '—'}
          sub={stats.last ? new Date(stats.last).toLocaleString() : ''}
          accent="#dcdcaa" icon={Activity}
        />
      </div>

      {/* ── Tabs ── */}
      <div className="px-5 flex gap-0 border-b border-[#3c3c3c] shrink-0">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-mono border-b-2 transition-colors flex items-center gap-1.5 ${tab === t.id ? 'border-[#4fc1ff] text-[#cccccc]' : 'border-transparent text-[#555] hover:text-[#858585]'}`}>
            {t.label}
            {t.badge != null && (
              <span className={`text-xs px-1.5 rounded-full ${tab === t.id ? 'bg-[#4fc1ff]/20 text-[#4fc1ff]' : 'bg-[#2a2a2a] text-[#444]'}`}>
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {error && (
          <div className="mb-4 border border-red-500/30 bg-red-500/10 rounded px-4 py-3 text-red-400 text-xs">
            Error: {error}
          </div>
        )}

        {loading && entries.length === 0 ? (
          <div className="flex items-center justify-center gap-2 text-[#555] py-20">
            <RefreshCw size={13} className="animate-spin" /> loading...
          </div>
        ) : (
          <>
            {tab === 'feed' && (
              <FeedTab entries={entries} onDelete={deleteEntry} onDeleteAll={deleteAll} onRefresh={fetchAll} toast={toast} />
            )}
            {tab === 'store' && (
              <StoreTab items={kvItems} onAdd={addKv} onDelete={deleteKv} toast={toast} />
            )}
            {tab === 'analytics' && <AnalyticsTab entries={entries} />}
          </>
        )}
      </div>

      <Toasts toasts={toasts} />
    </div>
  );
};

export default Details;

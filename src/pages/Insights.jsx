import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, Legend,
  RadialBarChart, RadialBar,
} from "recharts";
import {
  Lock, Activity, Clock, HardDrive, Wifi, Globe, Monitor,
  TrendingUp, Eye, Zap, Database, RefreshCw, ChevronRight,
  Cpu, Layers, Timer, ArrowUpRight, ArrowDownRight, Minus,
  FileCode, Image, FileText as FileTextIcon, Type, Box,
  LogOut, Shield,
} from "lucide-react";
import { getVisitHistory } from "../utils/routeConfig";

const AUTH_DURATION = 5 * 60 * 1000; // 5 minutes

/* ─────────────────────────── Password Gate ─────────────────────────── */
const PasswordGate = ({ onAuth }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [lines, setLines] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const initial = [
      { text: "$ ssh admin@karthik.top", color: "text-green-400" },
      { text: "Connected to karthik.top (443)", color: "text-gray-400" },
      { text: "Authentication required.", color: "text-yellow-400" },
      { text: "", color: "" },
    ];
    let i = 0;
    const timer = setInterval(() => {
      if (i < initial.length) {
        const item = initial[i];
        i++;
        setLines((prev) => [...prev, item]);
      } else {
        clearInterval(timer);
      }
    }, 400);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.toLowerCase().trim() === "open") {
      setLines((prev) => [
        ...prev,
        { text: `$ access-code: ${"*".repeat(code.length)}`, color: "text-green-400" },
        { text: "Access granted. Loading dashboard...", color: "text-emerald-400" },
      ]);
      localStorage.setItem("insights_auth_ts", Date.now().toString());
      setTimeout(() => onAuth(), 800);
    } else {
      setError(true);
      setLines((prev) => [
        ...prev,
        { text: `$ access-code: ${"*".repeat(code.length)}`, color: "text-red-400" },
        { text: "Error: Invalid access code. Try again.", color: "text-red-400" },
      ]);
      setCode("");
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center p-4" onClick={() => inputRef.current?.focus()}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
        <div className="rounded-xl overflow-hidden shadow-2xl border border-base-300 bg-base-200">
          <div className="flex items-center justify-between px-4 py-2 bg-base-300 border-b border-base-content/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="text-xs text-base-content/60 flex items-center gap-2">
              <Lock size={12} /> insights — authentication
            </div>
            <div className="w-12" />
          </div>
          <div className="p-6 font-mono text-sm min-h-[300px]">
            {lines.map((line, i) => (
              <div key={i} className={`${line.color} leading-relaxed`}>{line.text || "\u00A0"}</div>
            ))}
            <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
              <span className="text-green-400">$</span>
              <span className="text-gray-400">access-code:</span>
              <input
                ref={inputRef}
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`flex-1 bg-transparent outline-none text-base-content font-mono ${error ? "text-red-400" : ""}`}
                placeholder="enter code..."
                autoFocus
              />
              <span className="inline-block w-2 h-5 bg-green-400 animate-pulse" />
            </form>
          </div>
        </div>
        <p className="text-center text-base-content/40 text-xs mt-4">Authorized access only &middot; Session expires in 5 minutes</p>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────── Helpers ─────────────────────────── */
const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(2)} MB`;
};

const COLORS = ["#007acc", "#4ec9b0", "#ce9178", "#569cd6", "#b5cea8", "#f44747", "#dcdcaa", "#9cdcfe"];

const tooltipStyle = { backgroundColor: "#1e1e1e", border: "1px solid #333", borderRadius: 8, fontSize: 12 };

const InfoRow = ({ label, value, icon: Icon }) => (
  <div className="flex justify-between items-center py-1">
    <span className="text-base-content/60 flex items-center gap-1.5">
      {Icon && <Icon size={13} className="text-base-content/40" />}
      {label}
    </span>
    <span className="text-base-content font-mono text-xs">{value}</span>
  </div>
);

/* ─────────────────────────── Live Stat Card ─────────────────────────── */
const StatCard = ({ icon: Icon, label, value, sub, color = "text-primary", trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-base-200 rounded-xl p-3 md:p-4 border border-base-300 hover:border-primary/30 transition-all group"
  >
    <div className="flex items-center justify-between mb-1">
      <span className="text-base-content/50 text-xs">{label}</span>
      <div className={`p-1.5 rounded-lg bg-base-300 group-hover:bg-primary/10 transition-colors`}>
        <Icon size={14} className={color} />
      </div>
    </div>
    <div className="flex items-end gap-2">
      <div className={`text-xl md:text-2xl font-bold ${color}`}>{value}</div>
      {trend !== undefined && (
        <span className={`text-xs flex items-center gap-0.5 mb-1 ${trend > 0 ? "text-success" : trend < 0 ? "text-error" : "text-base-content/40"}`}>
          {trend > 0 ? <ArrowUpRight size={12} /> : trend < 0 ? <ArrowDownRight size={12} /> : <Minus size={12} />}
          {trend !== 0 ? `${Math.abs(trend)}%` : "—"}
        </span>
      )}
    </div>
    {sub && <div className="text-[11px] text-base-content/40 mt-0.5">{sub}</div>}
  </motion.div>
);

/* ─────────────────────────── Section wrapper ─────────────────────────── */
const Section = ({ children, title, icon: Icon, iconColor = "text-primary", delay = 0, badge, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className={`bg-base-200 rounded-xl border border-base-300 overflow-hidden ${className}`}
  >
    <div className="flex items-center justify-between px-4 pt-3 pb-2">
      <h3 className="text-sm font-semibold flex items-center gap-2">
        <Icon size={15} className={iconColor} />
        {title}
      </h3>
      {badge}
    </div>
    <div className="px-4 pb-4">{children}</div>
  </motion.div>
);

const LiveBadge = () => (
  <span className="flex items-center gap-1 text-[10px] text-base-content/40 bg-base-300 px-2 py-0.5 rounded-full">
    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> LIVE
  </span>
);

/* ─────────────────────────── useLiveMetrics hook ─────────────────────────── */
const useLiveMetrics = () => {
  const [fps, setFps] = useState(0);
  const [domNodes, setDomNodes] = useState(0);
  const [heap, setHeap] = useState(null);
  const [uptime, setUptime] = useState(0);
  const [liveHistory, setLiveHistory] = useState([]);
  const mountTime = useRef(Date.now());
  const frameRef = useRef({ count: 0, lastTime: performance.now() });

  // FPS via requestAnimationFrame
  useEffect(() => {
    let raf;
    const tick = (now) => {
      frameRef.current.count++;
      const delta = now - frameRef.current.lastTime;
      if (delta >= 1000) {
        const currentFps = Math.round((frameRef.current.count * 1000) / delta);
        setFps(currentFps);
        frameRef.current = { count: 0, lastTime: now };
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // DOM nodes + heap + uptime + history — every 1.5s
  useEffect(() => {
    const poll = () => {
      const nodes = document.querySelectorAll("*").length;
      setDomNodes(nodes);
      setUptime(Math.floor((Date.now() - mountTime.current) / 1000));

      const mem = performance.memory;
      const usedMB = mem ? Math.round(mem.usedJSHeapSize / 1048576) : null;
      const totalMB = mem ? Math.round(mem.totalJSHeapSize / 1048576) : null;
      setHeap(mem ? { used: usedMB, total: totalMB, limit: Math.round(mem.jsHeapSizeLimit / 1048576) } : null);

      const ts = new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setLiveHistory((prev) => {
        const next = [...prev, { time: ts, fps: frameRef.current.count > 0 ? fps : 0, heap: usedMB || 0, dom: nodes }];
        return next.slice(-40);
      });
    };
    poll();
    const id = setInterval(poll, 1500);
    return () => clearInterval(id);
  }, [fps]);

  return { fps, domNodes, heap, uptime, liveHistory };
};

/* ─────────────────────────── Dashboard ─────────────────────────── */
const Dashboard = ({ onLogout, expiresAt }) => {
  const [metrics, setMetrics] = useState(null);
  const { fps, domNodes, heap, uptime, liveHistory } = useLiveMetrics();
  const [remaining, setRemaining] = useState(Math.max(0, Math.floor((expiresAt - Date.now()) / 1000)));

  // Countdown
  useEffect(() => {
    const id = setInterval(() => {
      const secs = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
      setRemaining(secs);
      if (secs <= 0) onLogout();
    }, 1000);
    return () => clearInterval(id);
  }, [expiresAt, onLogout]);

  const collectMetrics = useCallback(() => {
    const nav = performance.getEntriesByType?.("navigation")?.[0] || {};
    const paint = performance.getEntriesByType?.("paint") || [];
    const resources = performance.getEntriesByType?.("resource") || [];
    const fcp = paint.find((p) => p.name === "first-contentful-paint");
    const fp = paint.find((p) => p.name === "first-paint");

    // Resource breakdown
    const resourceBreakdown = {};
    let totalTransfer = 0;
    resources.forEach((r) => {
      const ext = r.name.split(".").pop()?.split("?")[0]?.toLowerCase() || "other";
      let type = "Other";
      if (["js", "mjs"].includes(ext)) type = "JavaScript";
      else if (ext === "css") type = "CSS";
      else if (["png", "jpg", "jpeg", "gif", "svg", "webp", "ico", "avif"].includes(ext)) type = "Images";
      else if (["woff", "woff2", "ttf", "otf", "eot"].includes(ext)) type = "Fonts";
      else if (["json", "xml"].includes(ext)) type = "Data";
      else if (ext === "html") type = "HTML";
      resourceBreakdown[type] = (resourceBreakdown[type] || 0) + (r.transferSize || 0);
      totalTransfer += r.transferSize || 0;
    });

    const resourcePie = Object.entries(resourceBreakdown)
      .map(([name, value]) => ({ name, value: Math.round(value / 1024) }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value);

    // Resource type count
    const typeCount = {};
    resources.forEach((r) => {
      const t = r.initiatorType || "other";
      typeCount[t] = (typeCount[t] || 0) + 1;
    });
    const typeCountPie = Object.entries(typeCount)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Vitals
    const ttfb = nav.responseStart ? Math.round(nav.responseStart - nav.requestStart) : 0;
    const domLoad = nav.domContentLoadedEventEnd ? Math.round(nav.domContentLoadedEventEnd - nav.startTime) : 0;
    const fullLoad = nav.loadEventEnd ? Math.round(nav.loadEventEnd - nav.startTime) : 0;
    const fcpTime = fcp ? Math.round(fcp.startTime) : 0;
    const fpTime = fp ? Math.round(fp.startTime) : 0;
    const dnsTime = nav.domainLookupEnd ? Math.round(nav.domainLookupEnd - nav.domainLookupStart) : 0;
    const connectTime = nav.connectEnd ? Math.round(nav.connectEnd - nav.connectStart) : 0;
    const tlsTime = nav.secureConnectionStart > 0 ? Math.round(nav.connectEnd - nav.secureConnectionStart) : 0;
    const downloadTime = nav.responseEnd ? Math.round(nav.responseEnd - nav.responseStart) : 0;
    const domProcessing = nav.domComplete ? Math.round(nav.domComplete - nav.responseEnd) : 0;

    const vitals = [
      { name: "DNS", value: dnsTime, unit: "ms", good: 50, poor: 200 },
      { name: "TCP", value: connectTime, unit: "ms", good: 100, poor: 300 },
      { name: "TLS", value: tlsTime, unit: "ms", good: 100, poor: 300 },
      { name: "TTFB", value: ttfb, unit: "ms", good: 200, poor: 600 },
      { name: "Download", value: downloadTime, unit: "ms", good: 200, poor: 600 },
      { name: "DOM Proc.", value: domProcessing, unit: "ms", good: 500, poor: 1500 },
      { name: "FCP", value: fcpTime, unit: "ms", good: 1800, poor: 3000 },
      { name: "Full Load", value: fullLoad, unit: "ms", good: 3000, poor: 6000 },
    ];

    // Visit history
    const visits = getVisitHistory();
    const today = new Date().setHours(0, 0, 0, 0);
    const todayVisits = visits.filter((v) => v.timestamp >= today);
    const yesterday = today - 86400000;
    const yesterdayVisits = visits.filter((v) => v.timestamp >= yesterday && v.timestamp < today);
    const trend = yesterdayVisits.length > 0 ? Math.round(((todayVisits.length - yesterdayVisits.length) / yesterdayVisits.length) * 100) : 0;

    // Visits per hour (last 24h)
    const now = Date.now();
    const hourlyVisits = [];
    for (let h = 23; h >= 0; h--) {
      const hourStart = now - h * 3600000;
      const hourEnd = hourStart + 3600000;
      const count = visits.filter((v) => v.timestamp >= hourStart && v.timestamp < hourEnd).length;
      hourlyVisits.push({ hour: `${new Date(hourStart).getHours().toString().padStart(2, "0")}:00`, views: count });
    }

    // Page distribution
    const pageDist = {};
    visits.forEach((v) => { pageDist[v.path === "/" ? "/home" : v.path] = (pageDist[v.path === "/" ? "/home" : v.path] || 0) + 1; });
    const pageDistPie = Object.entries(pageDist).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

    // Daily visits (last 7 days)
    const dailyVisits = [];
    for (let d = 6; d >= 0; d--) {
      const dayStart = new Date(); dayStart.setDate(dayStart.getDate() - d); dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(dayStart); dayEnd.setDate(dayEnd.getDate() + 1);
      dailyVisits.push({
        day: dayStart.toLocaleDateString("en-US", { weekday: "short" }),
        views: visits.filter((v) => v.timestamp >= dayStart.getTime() && v.timestamp < dayEnd.getTime()).length,
      });
    }

    // Top resources
    const topResources = resources
      .map((r) => ({
        name: r.name.split("/").pop()?.split("?")[0] || r.name,
        fullUrl: r.name,
        size: r.transferSize || 0,
        duration: Math.round(r.duration),
        type: r.initiatorType,
        start: Math.round(r.startTime),
      }))
      .sort((a, b) => b.size - a.size)
      .slice(0, 12);

    // Resource waterfall (top 20 by start time)
    const waterfall = resources
      .map((r) => ({
        name: r.name.split("/").pop()?.split("?")[0]?.slice(0, 25) || "unknown",
        start: Math.round(r.startTime),
        duration: Math.round(r.duration),
        size: r.transferSize || 0,
        type: r.initiatorType,
      }))
      .sort((a, b) => a.start - b.start)
      .slice(0, 20);

    // Network
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    // Navigation history (last 15 visits)
    const recentVisits = visits.slice(-15).reverse().map((v) => ({
      path: v.path,
      time: new Date(v.timestamp).toLocaleTimeString("en-US", { hour12: true, hour: "numeric", minute: "2-digit", second: "2-digit" }),
      date: new Date(v.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    }));

    // Performance score (0-100, based on real vitals)
    let score = 100;
    if (ttfb > 600) score -= 20; else if (ttfb > 200) score -= 10;
    if (fcpTime > 3000) score -= 25; else if (fcpTime > 1800) score -= 12;
    if (fullLoad > 6000) score -= 25; else if (fullLoad > 3000) score -= 12;
    if (domProcessing > 1500) score -= 15; else if (domProcessing > 500) score -= 7;
    score = Math.max(0, Math.min(100, score));

    return {
      totalVisits: visits.length, todayVisits: todayVisits.length, trend,
      loadTime: fullLoad || domLoad || 0, totalTransfer, resourceCount: resources.length,
      vitals, resourcePie, typeCountPie, hourlyVisits, pageDistPie, topResources,
      dailyVisits, waterfall, recentVisits, score,
      network: conn ? { effectiveType: conn.effectiveType || "N/A", downlink: conn.downlink || 0, rtt: conn.rtt || 0, saveData: conn.saveData || false } : null,
      browser: {
        language: navigator.language, platform: navigator.platform,
        cores: navigator.hardwareConcurrency || "N/A", screen: `${screen.width}x${screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`, devicePixelRatio: window.devicePixelRatio,
        cookiesEnabled: navigator.cookieEnabled, online: navigator.onLine,
        userAgent: navigator.userAgent,
      },
      fpTime, fcpTime, ttfb, domLoad, fullLoad, dnsTime, connectTime, tlsTime, downloadTime, domProcessing,
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMetrics(collectMetrics()), 300);
    return () => clearTimeout(timer);
  }, [collectMetrics]);

  const handleRefresh = () => setMetrics(collectMetrics());

  if (!metrics) {
    return (
      <div className="flex items-center justify-center min-h-full py-20">
        <div className="flex flex-col items-center gap-3 text-base-content/60">
          <RefreshCw size={24} className="animate-spin" />
          <span className="text-sm">Collecting real-time metrics...</span>
        </div>
      </div>
    );
  }

  const getVitalColor = (v) => (v.value <= v.good ? "#22c55e" : v.value <= v.poor ? "#eab308" : "#ef4444");

  const formatUptime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
  };

  const scoreColor = metrics.score >= 80 ? "text-success" : metrics.score >= 50 ? "text-warning" : "text-error";
  const scoreRadial = [{ name: "score", value: metrics.score, fill: metrics.score >= 80 ? "#22c55e" : metrics.score >= 50 ? "#eab308" : "#ef4444" }];

  const remainMin = Math.floor(remaining / 60);
  const remainSec = remaining % 60;

  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-5 max-w-[1440px] mx-auto">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-2xl font-bold flex items-center gap-2">
            <Activity size={22} className="text-primary" /> Performance Insights
          </h1>
          <p className="text-base-content/40 text-xs mt-0.5">Real-time browser performance &middot; All data from live APIs</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-base-content/40 font-mono bg-base-200 border border-base-300 px-2 py-1 rounded-lg flex items-center gap-1.5">
            <Shield size={12} className={remaining < 60 ? "text-error" : "text-success"} />
            {remainMin}:{remainSec.toString().padStart(2, "0")}
          </span>
          <button onClick={handleRefresh} className="btn btn-primary btn-sm btn-outline gap-1.5">
            <RefreshCw size={13} /> Refresh
          </button>
          <button onClick={onLogout} className="btn btn-ghost btn-sm gap-1.5 text-base-content/60">
            <LogOut size={13} /> Lock
          </button>
        </div>
      </div>

      {/* ── Stat Cards (6) ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
        <StatCard icon={Eye} label="Page Views" value={metrics.totalVisits.toLocaleString()} sub={`${metrics.todayVisits} today`} color="text-primary" trend={metrics.trend} />
        <StatCard icon={Zap} label="Load Time" value={`${(metrics.loadTime / 1000).toFixed(2)}s`} sub={`TTFB ${metrics.ttfb}ms`} color="text-success" />
        <StatCard icon={Database} label="Transferred" value={formatBytes(metrics.totalTransfer)} sub={`${metrics.resourceCount} resources`} color="text-warning" />
        <StatCard icon={Cpu} label="FPS" value={fps} sub="requestAnimationFrame" color="text-info" />
        <StatCard icon={Layers} label="DOM Nodes" value={domNodes.toLocaleString()} sub="document.querySelectorAll" color="text-secondary" />
        <StatCard icon={Timer} label="Session" value={formatUptime(uptime)} sub="time on dashboard" color="text-accent" />
      </div>

      {/* ── Row: Performance Score + Live Monitor ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Performance Score */}
        <Section title="Performance Score" icon={Activity} iconColor={scoreColor} delay={0.05}>
          <div className="flex items-center justify-center">
            <div className="relative">
              <ResponsiveContainer width={180} height={180}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="90%" startAngle={90} endAngle={-270} data={scoreRadial} barSize={14}>
                  <RadialBar background={{ fill: "rgba(255,255,255,0.05)" }} dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className={`text-3xl font-bold ${scoreColor}`}>{metrics.score}</span>
                <span className="text-[10px] text-base-content/40">/ 100</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
            <div className="flex justify-between"><span className="text-base-content/50">FP</span><span className="font-mono">{metrics.fpTime}ms</span></div>
            <div className="flex justify-between"><span className="text-base-content/50">FCP</span><span className="font-mono">{metrics.fcpTime}ms</span></div>
            <div className="flex justify-between"><span className="text-base-content/50">DOM</span><span className="font-mono">{metrics.domLoad}ms</span></div>
            <div className="flex justify-between"><span className="text-base-content/50">Load</span><span className="font-mono">{metrics.fullLoad}ms</span></div>
          </div>
        </Section>

        {/* Live Performance Monitor */}
        <Section title="Live Performance Monitor" icon={Activity} iconColor="text-error" delay={0.1} badge={<LiveBadge />} className="lg:col-span-2">
          {liveHistory.length > 3 ? (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={liveHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="time" tick={{ fill: "#666", fontSize: 10 }} interval="preserveStartEnd" />
                <YAxis yAxisId="fps" tick={{ fill: "#666", fontSize: 10 }} orientation="left" domain={[0, "auto"]} />
                <YAxis yAxisId="heap" tick={{ fill: "#666", fontSize: 10 }} orientation="right" domain={[0, "auto"]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line yAxisId="fps" type="monotone" dataKey="fps" stroke="#22c55e" strokeWidth={2} dot={false} name="FPS" />
                <Line yAxisId="heap" type="monotone" dataKey="heap" stroke="#f44747" strokeWidth={2} dot={false} name="Heap (MB)" />
                <Line yAxisId="fps" type="monotone" dataKey="dom" stroke="#007acc" strokeWidth={1.5} dot={false} name="DOM Nodes" strokeDasharray="4 2" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-base-content/40 text-sm">
              <RefreshCw size={16} className="animate-spin mr-2" /> Collecting live data...
            </div>
          )}
        </Section>
      </div>

      {/* ── Row: Hourly Views + Web Vitals ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Page Views (Last 24h)" icon={TrendingUp} iconColor="text-primary" delay={0.12}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={metrics.hourlyVisits}>
              <defs>
                <linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#007acc" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#007acc" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="hour" tick={{ fill: "#666", fontSize: 10 }} interval={3} />
              <YAxis tick={{ fill: "#666", fontSize: 10 }} allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="views" stroke="#007acc" fill="url(#viewGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Section>

        <Section title="Connection Breakdown" icon={Zap} iconColor="text-warning" delay={0.14}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={metrics.vitals} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis type="number" tick={{ fill: "#666", fontSize: 10 }} unit="ms" />
              <YAxis type="category" dataKey="name" tick={{ fill: "#888", fontSize: 11 }} width={65} />
              <Tooltip contentStyle={tooltipStyle} formatter={(val) => [`${val}ms`]} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={16}>
                {metrics.vitals.map((v, i) => <Cell key={i} fill={getVitalColor(v)} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-1 text-[10px] text-base-content/40">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Good</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /> Needs Work</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Poor</span>
          </div>
        </Section>
      </div>

      {/* ── Row: Resource Breakdown + Resource Type Count + Page Distribution ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Section title="Transfer Size by Type" icon={HardDrive} iconColor="text-info" delay={0.16}>
          {metrics.resourcePie.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={metrics.resourcePie} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                  {metrics.resourcePie.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(val) => [`${val} KB`]} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : <div className="h-[200px] flex items-center justify-center text-base-content/30 text-sm">No data</div>}
        </Section>

        <Section title="Request Count by Type" icon={Box} iconColor="text-secondary" delay={0.18}>
          {metrics.typeCountPie.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={metrics.typeCountPie} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                  {metrics.typeCountPie.map((_, i) => <Cell key={i} fill={COLORS[(i + 3) % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : <div className="h-[200px] flex items-center justify-center text-base-content/30 text-sm">No data</div>}
        </Section>

        <Section title="Page Distribution" icon={Globe} iconColor="text-accent" delay={0.2}>
          {metrics.pageDistPie.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={metrics.pageDistPie} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                  {metrics.pageDistPie.map((_, i) => <Cell key={i} fill={COLORS[(i + 1) % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          ) : <div className="h-[200px] flex items-center justify-center text-base-content/30 text-sm">No visits yet</div>}
        </Section>
      </div>

      {/* ── Row: Daily Views + Resource Waterfall ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Section title="Daily Views (Last 7 Days)" icon={TrendingUp} iconColor="text-success" delay={0.22}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={metrics.dailyVisits}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: "#888", fontSize: 11 }} />
              <YAxis tick={{ fill: "#666", fontSize: 10 }} allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="views" fill="#4ec9b0" radius={[6, 6, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </Section>

        <Section title="Resource Waterfall" icon={Clock} iconColor="text-warning" delay={0.24}>
          {metrics.waterfall.length > 0 ? (
            <div className="overflow-x-auto max-h-[220px] overflow-y-auto text-[11px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-base-200">
                  <tr className="text-base-content/40 border-b border-base-300">
                    <th className="text-left py-1 font-medium">Resource</th>
                    <th className="text-right py-1 font-medium">Start</th>
                    <th className="text-right py-1 font-medium">Duration</th>
                    <th className="text-right py-1 font-medium">Size</th>
                    <th className="py-1 font-medium w-24">Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.waterfall.map((r, i) => {
                    const maxEnd = metrics.waterfall.reduce((m, w) => Math.max(m, w.start + w.duration), 0) || 1;
                    const left = (r.start / maxEnd) * 100;
                    const width = Math.max(1, (r.duration / maxEnd) * 100);
                    return (
                      <tr key={i} className="border-b border-base-300/30 hover:bg-base-300/20">
                        <td className="py-1 truncate max-w-[120px]" title={r.name}>{r.name}</td>
                        <td className="py-1 text-right text-base-content/50 font-mono">{r.start}ms</td>
                        <td className="py-1 text-right text-base-content/50 font-mono">{r.duration}ms</td>
                        <td className="py-1 text-right text-base-content/50 font-mono">{formatBytes(r.size)}</td>
                        <td className="py-1 px-1">
                          <div className="w-full h-3 bg-base-300/50 rounded-sm relative overflow-hidden">
                            <div
                              className="h-full rounded-sm absolute"
                              style={{ left: `${left}%`, width: `${width}%`, backgroundColor: COLORS[i % COLORS.length] }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : <div className="h-[200px] flex items-center justify-center text-base-content/30 text-sm">No resource data</div>}
        </Section>
      </div>

      {/* ── Page Load Timeline ── */}
      <Section title="Page Load Timeline" icon={Clock} iconColor="text-secondary" delay={0.26}>
        <div className="space-y-3">
          <div className="w-full h-10 bg-base-300/50 rounded-lg overflow-hidden relative">
            {metrics.fullLoad > 0 && (
              <>
                {[
                  { label: "DNS", value: metrics.dnsTime, color: "bg-cyan-500/70", start: 0 },
                  { label: "TCP", value: metrics.connectTime, color: "bg-blue-400/70", start: metrics.dnsTime },
                  { label: "TLS", value: metrics.tlsTime, color: "bg-indigo-500/70", start: metrics.dnsTime + metrics.connectTime },
                  { label: "TTFB", value: metrics.ttfb, color: "bg-blue-600/70", start: metrics.dnsTime + metrics.connectTime + metrics.tlsTime },
                  { label: "Download", value: metrics.downloadTime, color: "bg-green-500/70", start: metrics.dnsTime + metrics.connectTime + metrics.tlsTime + metrics.ttfb },
                  { label: "DOM", value: metrics.domProcessing, color: "bg-yellow-500/70", start: metrics.dnsTime + metrics.connectTime + metrics.tlsTime + metrics.ttfb + metrics.downloadTime },
                ].map((seg) => {
                  const pct = (seg.value / metrics.fullLoad) * 100;
                  const leftPct = (seg.start / metrics.fullLoad) * 100;
                  if (pct < 0.5) return null;
                  return (
                    <div
                      key={seg.label}
                      className={`h-full ${seg.color} absolute top-0 flex items-center justify-center text-[9px] font-medium text-white/80 overflow-hidden`}
                      style={{ left: `${leftPct}%`, width: `${pct}%` }}
                      title={`${seg.label}: ${seg.value}ms`}
                    >
                      {pct > 6 && seg.label}
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px]">
            {[
              { label: "DNS", color: "bg-cyan-500/70", value: metrics.dnsTime },
              { label: "TCP", color: "bg-blue-400/70", value: metrics.connectTime },
              { label: "TLS", color: "bg-indigo-500/70", value: metrics.tlsTime },
              { label: "TTFB", color: "bg-blue-600/70", value: metrics.ttfb },
              { label: "Download", color: "bg-green-500/70", value: metrics.downloadTime },
              { label: "DOM Processing", color: "bg-yellow-500/70", value: metrics.domProcessing },
            ].map((s) => (
              <span key={s.label} className="flex items-center gap-1 text-base-content/50">
                <span className={`w-2.5 h-2.5 rounded-sm ${s.color}`} /> {s.label} ({s.value}ms)
              </span>
            ))}
            <span className="text-base-content/30 ml-auto">Total: {metrics.fullLoad}ms</span>
          </div>
        </div>
      </Section>

      {/* ── Bottom Row: Network/Browser + Navigation History + Top Resources ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Network & Browser Info */}
        <Section title="Network & Browser" icon={Wifi} iconColor="text-primary" delay={0.28}>
          <div className="space-y-1 text-sm">
            {metrics.network ? (
              <>
                <InfoRow label="Connection" value={metrics.network.effectiveType.toUpperCase()} icon={Wifi} />
                <InfoRow label="Bandwidth" value={`${metrics.network.downlink} Mbps`} icon={ArrowDownRight} />
                <InfoRow label="Latency (RTT)" value={`${metrics.network.rtt}ms`} icon={Clock} />
                <InfoRow label="Data Saver" value={metrics.network.saveData ? "On" : "Off"} icon={Shield} />
              </>
            ) : <div className="text-xs text-base-content/40 py-1">Network API unavailable</div>}
            <div className="border-t border-base-300 my-1.5" />
            <InfoRow label="Screen" value={metrics.browser.screen} icon={Monitor} />
            <InfoRow label="Viewport" value={metrics.browser.viewport} icon={Layers} />
            <InfoRow label="DPR" value={`${metrics.browser.devicePixelRatio}x`} icon={Eye} />
            <InfoRow label="CPU Cores" value={metrics.browser.cores} icon={Cpu} />
            <InfoRow label="Language" value={metrics.browser.language} icon={Globe} />
            <InfoRow label="Status" value={metrics.browser.online ? "Online" : "Offline"} icon={Wifi} />
            {heap && (
              <>
                <div className="border-t border-base-300 my-1.5" />
                <InfoRow label="JS Heap Used" value={`${heap.used} MB`} icon={Database} />
                <InfoRow label="JS Heap Total" value={`${heap.total} MB`} icon={Database} />
                <InfoRow label="Heap Limit" value={`${heap.limit} MB`} icon={HardDrive} />
                <div className="mt-2">
                  <div className="w-full h-2 bg-base-300 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(heap.used / heap.limit) * 100}%` }} />
                  </div>
                  <div className="text-[10px] text-base-content/30 mt-0.5 text-right">{((heap.used / heap.limit) * 100).toFixed(1)}% of limit</div>
                </div>
              </>
            )}
          </div>
        </Section>

        {/* Navigation History */}
        <Section title="Navigation History" icon={Clock} iconColor="text-accent" delay={0.3}>
          <div className="max-h-[280px] overflow-y-auto space-y-1">
            {metrics.recentVisits.length > 0 ? metrics.recentVisits.map((v, i) => (
              <div key={i} className="flex items-center gap-2 py-1 px-2 rounded hover:bg-base-300/30 text-xs">
                <ChevronRight size={11} className="text-base-content/20 shrink-0" />
                <span className="font-mono text-primary flex-1 truncate">{v.path}</span>
                <span className="text-base-content/30 whitespace-nowrap">{v.date} {v.time}</span>
              </div>
            )) : <div className="text-base-content/30 text-sm py-4 text-center">No navigation history</div>}
          </div>
        </Section>

        {/* Top Resources */}
        <Section title="Top Resources by Size" icon={Database} iconColor="text-warning" delay={0.32}>
          <div className="overflow-x-auto max-h-[280px] overflow-y-auto">
            <table className="w-full text-[11px]">
              <thead className="sticky top-0 bg-base-200">
                <tr className="text-base-content/40 border-b border-base-300">
                  <th className="text-left pb-1 font-medium">Name</th>
                  <th className="text-right pb-1 font-medium">Size</th>
                  <th className="text-right pb-1 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {metrics.topResources.map((r, i) => (
                  <tr key={i} className="border-b border-base-300/30 hover:bg-base-300/20">
                    <td className="py-1 pr-2 truncate max-w-[140px]" title={r.fullUrl}>
                      <span className="flex items-center gap-1">
                        {r.type === "script" ? <FileCode size={10} className="shrink-0 text-yellow-400/60" /> :
                         r.type === "img" ? <Image size={10} className="shrink-0 text-green-400/60" /> :
                         r.type === "css" ? <Type size={10} className="shrink-0 text-blue-400/60" /> :
                         <FileTextIcon size={10} className="shrink-0 text-base-content/30" />}
                        {r.name}
                      </span>
                    </td>
                    <td className="py-1 text-right text-base-content/50 font-mono">{formatBytes(r.size)}</td>
                    <td className="py-1 text-right text-base-content/50 font-mono">{r.duration}ms</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>

      {/* ── Footer ── */}
      <div className="text-center text-[11px] text-base-content/20 pb-4 space-y-0.5">
        <p>All metrics sourced from Performance API, Navigation Timing, Resource Timing &amp; requestAnimationFrame</p>
        <p>Visit tracking uses localStorage (this browser only) &middot; Cross-visitor analytics available in Vercel Dashboard</p>
      </div>
    </div>
  );
};

/* ─────────────────────────── Main Insights Component ─────────────────────────── */
const Insights = () => {
  const checkAuth = () => {
    try {
      const ts = parseInt(localStorage.getItem("insights_auth_ts") || "0", 10);
      return Date.now() - ts < AUTH_DURATION;
    } catch {
      return false;
    }
  };

  const [isAuthed, setIsAuthed] = useState(checkAuth);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("insights_auth_ts");
    setIsAuthed(false);
  }, []);

  const expiresAt = parseInt(localStorage.getItem("insights_auth_ts") || "0", 10) + AUTH_DURATION;

  return (
    <AnimatePresence mode="wait">
      {isAuthed ? (
        <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="min-h-full">
          <Dashboard onLogout={handleLogout} expiresAt={expiresAt} />
        </motion.div>
      ) : (
        <motion.div key="gate" exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.25 }} className="min-h-full">
          <PasswordGate onAuth={() => setIsAuthed(true)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Insights;

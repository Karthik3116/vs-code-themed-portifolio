
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Loader2,
  AlertCircle,
} from "lucide-react";

/**
 * Single-file component showing GitHub + LeetCode stats.
 * - Requires: tailwindcss + daisyUI, lucide-react, recharts, framer-motion
 * - This component uses a more detailed, but unofficial, LeetCode API to get full stats.
 * - Replace GITHUB_USERNAME / LEETCODE_USERNAME constants as needed.
 */

const GITHUB_USERNAME = "karthik3116";
const LEETCODE_USERNAME = "professor3116";
// Reverting to the Heroku API as it provides more detailed data including contest history.
const LEET_API = (u) => `https://leetcode-stats-api.herokuapp.com/${u}`;

// Fallback totals for LeetCode problem counts (used if API doesn't provide totals).
const FALLBACK_TOTALS = {
  easy: 905,
  medium: 1927,
  hard: 874,
  total: 3706,
};

const fmt = (n) => (n == null ? "—" : n.toLocaleString?.() ?? n);

export default function GitHubLeetWithLeetCode() {
  // Theme (light/dark) read from <html data-theme="...">
  const [theme, setTheme] = useState("dark");

  // GitHub State
  const [profile, setProfile] = useState(null);
  const [langData, setLangData] = useState([]);
  const [loadingGH, setLoadingGH] = useState(true);
  const [errorGH, setErrorGH] = useState(null);

  // LeetCode State
  const [leet, setLeet] = useState(null);
  const [loadingLeet, setLoadingLeet] = useState(true);
  const [errorLeet, setErrorLeet] = useState(null);

  // Observe theme changes on the root HTML element
  useEffect(() => {
    const updateTheme = () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      setTheme(current === "light" ? "light" : "dark");
    };
    updateTheme();
    const obs = new MutationObserver(updateTheme);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  // Fetch data from GitHub and LeetCode APIs
  useEffect(() => {
    // GitHub data fetching
    const fetchGH = async () => {
      setLoadingGH(true);
      setErrorGH(null);
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
        ]);
        if (!profileRes.ok) throw new Error(`GitHub profile load failed (${profileRes.status})`);
        if (!reposRes.ok) throw new Error(`GitHub repos load failed (${reposRes.status})`);
        
        const profileJson = await profileRes.json();
        const reposJson = await reposRes.json();
        
        const langCount = reposJson.reduce((acc, r) => {
          if (r.language) {
            acc[r.language] = (acc[r.language] || 0) + 1;
          }
          return acc;
        }, {});
        
        setProfile(profileJson);
        setLangData(Object.entries(langCount).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count));
      } catch (e) {
        console.error("GitHub API Error:", e);
        setErrorGH(e.message || "An unknown error occurred while fetching GitHub data.");
      } finally {
        setLoadingGH(false);
      }
    };

    // LeetCode data fetching
    const fetchLeet = async () => {
      setLoadingLeet(true);
      setErrorLeet(null);
      try {
        const res = await fetch(LEET_API(LEETCODE_USERNAME));
        if (!res.ok) {
          const txt = await res.text().catch(() => "Could not read error response.");
          throw new Error(`LeetCode stats load failed (${res.status}) - ${txt}`);
        }
        const json = await res.json();
        if (json.status === "error") {
             throw new Error(json.message || "The LeetCode API returned an error.");
        }
        setLeet(json);
      } catch (e) {
        console.error("LeetCode API Error:", e);
        setErrorLeet(e.message || "An unknown error occurred while fetching LeetCode data.");
      } finally {
        setLoadingLeet(false);
      }
    };

    fetchGH();
    fetchLeet();
  }, []);

  const anyLoading = loadingGH || loadingLeet;
  const anyError = errorGH || errorLeet;

  // --- Data Parsing with Fallbacks ---
  const totalSolved = leet?.totalSolved ?? 0;
  const easySolved = leet?.easySolved ?? 0;
  const mediumSolved = leet?.mediumSolved ?? 0;
  const hardSolved = leet?.hardSolved ?? 0;

  const easyTotal = leet?.totalEasy ?? FALLBACK_TOTALS.easy;
  const mediumTotal = leet?.totalMedium ?? FALLBACK_TOTALS.medium;
  const hardTotal = leet?.totalHard ?? FALLBACK_TOTALS.hard;
  const overallTotal = leet?.totalQuestions ?? FALLBACK_TOTALS.total;

  const acceptanceRate = leet?.acceptanceRate ?? null;
  const contestsAttended = 27;
  const contestRating = 1695;
  const globalRank = leet?.ranking > 0 ? leet.ranking.toLocaleString() : null;
  const topPercent = "13.28%";

  const contestHistory = Array.isArray(leet?.contestHistory) ? leet.contestHistory : [];

  const pct = (num, denom) => {
    if (denom == null || denom === 0) return 0;
    return Math.min(100, Math.max(0, (Number(num) / Number(denom)) * 100));
  };

  const chartColors = theme === "light" 
    ? { bg: "#ffffff", text: "#1f2937", grid: "#e5e7eb", line: "#4f46e5" } 
    : { bg: "#1d232a", text: "#a6adbb", grid: "#2a323c", line: "#8b5cf6" };

  if (anyLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 p-4">
        <Loader2 className="animate-spin w-16 h-16 text-primary" />
        <p className="mt-4 text-xl text-primary-content">Loading Profile Stats...</p>
      </div>
    );

  if (anyError)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 p-4 text-error">
        <AlertCircle className="w-16 h-16 mb-4" />
        <p className="text-xl font-semibold">Something Went Wrong</p>
        {errorGH && <p className="mt-2 text-center">GitHub Error: {errorGH}</p>}
        {errorLeet && <p className="mt-2 text-center">LeetCode Error: {errorLeet}</p>}
        <button onClick={() => window.location.reload()} className="mt-6 btn btn-error text-white">
          Try Again
        </button>
      </div>
    );
      
  const overallPercent = pct(totalSolved, overallTotal).toFixed(1);
  const easyPct = pct(easySolved, easyTotal).toFixed(1);
  const mediumPct = pct(mediumSolved, mediumTotal).toFixed(1);
  const hardPct = pct(hardSolved, hardTotal).toFixed(1);
  
  return (
    <div className={`theme-${theme} w-full bg-base-100 text-base-content font-sans p-4 sm:p-6`}>
      <div className="max-w-5xl mx-auto space-y-8">

        {/* --- Main Problems Solved Card --- */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-base-200 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="w-28 h-20 rounded-lg flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg, #33ccff, #3366ff)" }}>
                <div className="text-4xl font-extrabold tracking-tight">{fmt(totalSolved)}</div>
              </div>
              <div>
                <div className="text-xl font-bold">Problems Solved</div>
                <div className="text-sm text-base-content/70">Out of {fmt(overallTotal)} total</div>
              </div>
            </div>
            <div className="w-full sm:w-auto sm:ml-auto text-center sm:text-right space-y-2 mt-4 sm:mt-0">
              <div>
                <div className="text-sm text-base-content/70">Acceptance Rate</div>
                <div className="text-lg font-semibold text-primary">{acceptanceRate != null ? `${acceptanceRate.toFixed(2)}%` : "—"}</div>
              </div>
              <div>
                <div className="text-sm text-base-content/70">Global Ranking</div>
                <div className="text-lg font-semibold text-accent">{globalRank ? `#${globalRank}` : "—"}</div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium text-base-content/80">Overall Completion</span>
              <span className="font-semibold text-primary">{overallPercent}%</span>
            </div>
            <div className="w-full h-3 bg-base-300 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${overallPercent}%`, background: "linear-gradient(90deg, #33ccff, #3366ff)" }} />
            </div>
          </div>
        </motion.div>

        {/* --- Difficulty Breakdown Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Easy */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-base-200 rounded-xl p-6 shadow-md">
            <div className="text-4xl font-bold text-green-400">{fmt(easySolved)}</div>
            <div className="mt-2 text-base font-medium text-base-content/80">Easy Problems</div>
            <div className="mt-6">
              <div className="w-full h-2 bg-base-300 rounded-full"><div className="h-full rounded-full bg-green-400" style={{ width: `${easyPct}%` }} /></div>
              <div className="flex justify-between text-xs mt-2 text-base-content/70"><span>{fmt(easySolved)} / {fmt(easyTotal)}</span><span>{easyPct}%</span></div>
            </div>
          </motion.div>
          {/* Medium */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-base-200 rounded-xl p-6 shadow-md">
            <div className="text-4xl font-bold text-yellow-400">{fmt(mediumSolved)}</div>
            <div className="mt-2 text-base font-medium text-base-content/80">Medium Problems</div>
            <div className="mt-6">
              <div className="w-full h-2 bg-base-300 rounded-full"><div className="h-full rounded-full bg-yellow-400" style={{ width: `${mediumPct}%` }} /></div>
              <div className="flex justify-between text-xs mt-2 text-base-content/70"><span>{fmt(mediumSolved)} / {fmt(mediumTotal)}</span><span>{mediumPct}%</span></div>
            </div>
          </motion.div>
          {/* Hard */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-base-200 rounded-xl p-6 shadow-md">
            <div className="text-4xl font-bold text-red-400">{fmt(hardSolved)}</div>
            <div className="mt-2 text-base font-medium text-base-content/80">Hard Problems</div>
            <div className="mt-6">
              <div className="w-full h-2 bg-base-300 rounded-full"><div className="h-full rounded-full bg-red-400" style={{ width: `${hardPct}%` }} /></div>
              <div className="flex justify-between text-xs mt-2 text-base-content/70"><span>{fmt(hardSolved)} / {fmt(hardTotal)}</span><span>{hardPct}%</span></div>
            </div>
          </motion.div>
        </div>

        {/* --- Contest Performance --- */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="bg-base-200 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Contest Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-base-300 rounded-lg text-center">
              <div className="text-sm text-base-content/70">Contest Rating</div>
              <div className="text-4xl font-bold text-primary mt-2">{contestRating ? fmt(Math.round(contestRating)) : "—"}</div>
              <div className="text-sm text-base-content/60 mt-1">{topPercent}</div>
            </div>
            <div className="p-6 bg-base-300 rounded-lg text-center">
              <div className="text-sm text-base-content/70">Contests Attended</div>
              <div className="text-4xl font-bold text-green-400 mt-2">{fmt(contestsAttended)}</div>
              <div className="text-sm text-base-content/60 mt-1">{globalRank ? `Global Rank: ${globalRank}` : "Not Ranked"}</div>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-base font-semibold text-base-content/80 mb-3">Recent Contests</h4>
            {contestHistory.length > 0 ? (
              <ul className="space-y-3">
                {contestHistory.slice(0, 4).map((c, idx) => (
                  <li key={idx} className="flex justify-between items-center bg-base-300 hover:bg-base-100 p-3 rounded-md transition-colors duration-200">
                    <div>
                      <div className="font-semibold">{c.contest.title}</div>
                      <div className="text-xs text-base-content/60">Problems Solved: {c.problemsSolved} • Rank: {fmt(c.ranking)}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-primary">{fmt(Math.round(c.rating))}</div>
                      <div className="text-xs text-base-content/60">Rating</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-center text-base-content/70 p-4 bg-base-300 rounded-md">No recent contest history available.</div>
            )}
          </div>
        </motion.div>

        {/* --- Top Languages Chart (GitHub) --- */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
          <h3 className="text-xl font-bold mb-4">Top Languages on GitHub</h3>
          {langData.length > 0 ? (
            <div className="w-full h-72 bg-base-200 p-4 rounded-xl shadow-lg">
              <ResponsiveContainer>
                <LineChart data={langData.slice(0, 6)} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                  <XAxis dataKey="name" tick={{ fill: chartColors.text }} />
                  <YAxis tick={{ fill: chartColors.text }} allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: chartColors.bg, borderColor: chartColors.grid, borderRadius: '0.5rem' }} />
                  <Legend />
                  <Line type="monotone" dataKey="count" name="Repositories" stroke={chartColors.line} strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
             <div className="text-sm text-center text-base-content/70 p-4 bg-base-200 rounded-md">No language data to display.</div>
          )}
        </motion.section>
      </div>
    </div>
  );
}

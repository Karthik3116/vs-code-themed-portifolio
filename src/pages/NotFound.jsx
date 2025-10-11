// src/pages/NotFound.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * VSCode-themed, animated 404 page (trimmed per request).
 * Drop into your routes as the catch-all: path="*"
 *
 * Dependencies: framer-motion, react-router-dom, tailwindcss
 */

const terminalLines = [
  { text: "C:\\workspace\\karthik.top> cd /non-existent-path", color: "text-green-400" },
  { text: "C:\\workspace\\karthik.top> ls", color: "text-green-400" },
  { text: "Error: ENOENT: no such file or directory, stat '/non-existent-path'", color: "text-red-400" },
  { text: "Tip: Try opening an existing page from the left activity bar.", color: "text-gray-400" },
];

const TypingTerminal = ({ lines = terminalLines, speed = 28 }) => {
  const [output, setOutput] = useState([]);
  const cursorRef = useRef(null);

  useEffect(() => {
    let timers = [];

    const typeLine = (line, idx) => {
      return new Promise((resolve) => {
        let i = 0;
        const charTimer = setInterval(() => {
          i++;
          setOutput((prev) => {
            const copy = [...prev];
            copy[idx] = line.slice(0, i);
            return copy;
          });
          if (i >= line.length) {
            clearInterval(charTimer);
            timers.push(setTimeout(resolve, 350));
          }
        }, speed);
        timers.push(charTimer);
      });
    };

    (async () => {
      setOutput(Array(lines.length).fill(""));
      for (const [i, lObj] of lines.entries()) {
        await typeLine(lObj.text, i);
      }
      // small pause after finishing
      await new Promise((res) => timers.push(setTimeout(res, 300)));
    })();

    return () => timers.forEach((t) => clearTimeout(t));
  }, [lines, speed]);

  return (
    <div className="font-mono text-sm">
      {lines.map((l, i) => (
        <div key={i} className={`whitespace-pre-wrap ${l.color}`}>
          {output[i] ?? ""}
          {i === output.length - 1 || (output[i] && output[i].length < (lines[i].text?.length ?? 0)) ? (
            <span ref={cursorRef} className="inline-block ml-0 w-[8px] align-bottom animate-blink bg-current" />
          ) : null}
        </div>
      ))}
    </div>
  );
};

const NotFound = () => {
  const navigate = useNavigate();
  const path = typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1724] text-white p-6">
      <style>{`
        @keyframes glitch {
          0% { transform: translate(0, 0); }
          20% { transform: translate(-2px, 0); }
          40% { transform: translate(2px, -1px); }
          60% { transform: translate(-1px, 1px); }
          80% { transform: translate(1px, -1px); }
          100% { transform: translate(0, 0); }
        }
        .glitch {
          position: relative;
          display: inline-block;
        }
        .glitch::after,
        .glitch::before {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          overflow: hidden;
          clip: rect(0, 900px, 0, 0);
          opacity: .8;
        }
        .glitch::before {
          color: #00ffea;
          z-index: -2;
          transform: translate(-2px, 0);
          animation: glitch 2.1s infinite linear;
          mix-blend-mode: screen;
        }
        .glitch::after {
          color: #ff3cac;
          z-index: -1;
          transform: translate(2px, 0);
          animation: glitch 2.7s infinite linear;
          mix-blend-mode: screen;
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s step-end infinite; width: 8px; height: 1.2em; display:inline-block; vertical-align: middle; background: currentColor; margin-left: 6px; }
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255,255,255,0.06);
          border-radius: 50%;
          animation: float 6s infinite linear;
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0.7; }
          50% { transform: translateY(-40px) translateX(20px); opacity: 0.2; }
          100% { transform: translateY(0) translateX(-10px); opacity: 0.7; }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="relative max-w-5xl w-full"
      >
        <div className="pointer-events-none">
          <div className="particle" style={{ left: "8%", top: "10%", animationDelay: "0s" }} />
          <div className="particle" style={{ left: "85%", top: "20%", animationDelay: "1.6s", width: 8, height: 8 }} />
          <div className="particle" style={{ left: "60%", top: "70%", animationDelay: "3s", width: 10, height: 10 }} />
        </div>

        <div className="rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(2,6,23,0.8)] border border-gray-800 bg-gradient-to-b from-[#071025] to-[#07121a]">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-[#061321]">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm" aria-hidden />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm" aria-hidden />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm" aria-hidden />
              </div>
              <div className="text-xs text-gray-300 font-semibold select-none">{path === "/" ? "Home" : path.replace(/^\//, "") || "root"}</div>
            </div>

            <div className="flex items-center gap-2">
              
              <button onClick={() => navigate("/")} aria-label="Go home" className="text-xs px-2 py-1 rounded bg-sky-600 hover:bg-sky-700 transition">
                Home
              </button>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 flex flex-col items-start gap-4">
              <div className="text-6xl font-extrabold leading-none select-none">
                <span className="glitch" data-text="404">404</span>
              </div>
              <div className="text-xl text-gray-300">Oops — this page doesn't exist.</div>

              {/* Removed descriptive sentence, action buttons, and suggested pages (per request) */}
            </div>

            <div className="col-span-1 lg:col-span-2 bg-[#071224] border border-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs text-gray-400 font-mono">editor — {path}</div>
                <div className="text-xs text-gray-500">Read-only</div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-3 bg-[#071725] rounded text-sm text-gray-200 min-h-[180px]">
                  <div className="font-semibold text-sm mb-2 text-gray-100">What happened?</div>
                  <div className="text-gray-300 text-sm leading-relaxed">
                    The route you tried to reach is not part of this app. If you typed the URL manually, double-check for typos. If you followed a link, it might be outdated.
                  </div>

                  <div className="mt-3 text-xs text-gray-400">
                    Pro tip: use the <span className="font-mono">/projects</span> page to browse live work, or head back home.
                  </div>
                </div>

                <div className="p-3 bg-[#000814] rounded min-h-[180px]">
                  <div className="text-xs text-gray-400 mb-2 font-mono">terminal</div>
                  <div className="bg-[#020617] p-3 rounded text-sm">
                    <TypingTerminal />
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-800 pt-3 text-xs text-gray-400 flex items-center justify-between">
                <div>Status: <span className="text-amber-300">404 — Not Found</span></div>
                <div>Last checked: <span className="text-gray-300">Oct 11, 2025</span></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;

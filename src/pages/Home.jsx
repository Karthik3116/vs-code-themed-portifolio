// src/pages/Home.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, RefreshCw } from "lucide-react";

/* -------------------
   Typewriter: types raw source then renders line as HTML
   ------------------- */
const Typewriter = ({ lines = [], speed = 10, lineDelay = 200, startDelay = 500, onDone }) => {
  const [renderedLines, setRenderedLines] = useState([]);
  const [currentChars, setCurrentChars] = useState("");
  const [isDone, setIsDone] = useState(false);

  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const mountedRef = useRef(true);

  const escapeHtml = (unsafe) =>
    unsafe
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  useEffect(() => {
    mountedRef.current = true;
    if (!lines || lines.length === 0) {
      setIsDone(true);
      onDone?.();
      return;
    }
    timeoutRef.current = setTimeout(() => typeLineAt(0), startDelay);
    return () => {
      mountedRef.current = false;
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines]);

  const typeLineAt = (index) => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);

    const rawHtml = lines[index] ?? "";
    let charIndex = 0;
    setCurrentChars("");

    intervalRef.current = setInterval(() => {
      if (!mountedRef.current) {
        clearInterval(intervalRef.current);
        return;
      }

      charIndex++;
      const partial = rawHtml.slice(0, charIndex);
      setCurrentChars(partial);

      if (charIndex >= rawHtml.length) {
        clearInterval(intervalRef.current);
        timeoutRef.current = setTimeout(() => {
          setRenderedLines((prev) => [...prev, rawHtml]);
          const next = index + 1;
          if (next < lines.length) {
            setCurrentChars("");
            timeoutRef.current = setTimeout(() => typeLineAt(next), lineDelay);
          } else {
            setCurrentChars("");
            setIsDone(true);
            onDone?.();
          }
        }, lineDelay);
      }
    }, speed);
  };

  return (
    <pre className="whitespace-pre-wrap break-words text-sm font-mono min-h-[320px] max-h-[64vh] overflow-y-auto pb-4" aria-live="polite">
      {renderedLines.map((htmlLn, i) => (
        <div key={`rendered-${i}`} dangerouslySetInnerHTML={{ __html: htmlLn }} />
      ))}

      {!isDone && (
        <div
          dangerouslySetInnerHTML={{
            __html: (currentChars ? escapeHtml(currentChars) : "&nbsp;") + '<span class="inline-block animate-blink ml-1">|</span>',
          }}
        />
      )}

      <style>{`
        .animate-blink { animation: blink 1s steps(1) infinite; }
        @keyframes blink { 50% { opacity: 0 } }
      `}</style>
    </pre>
  );
};

/* -------------------
   Responsive PDF modal
   ------------------- */
const ResumeModal = ({ open, onClose, src = "/resume.pdf" }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4" onClick={onClose}>
      <motion.div 
        className="w-full max-w-4xl h-full max-h-[95vh] bg-base-100 rounded-lg shadow-2xl flex flex-col overflow-hidden" 
        onClick={(e) => e.stopPropagation()} 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="flex items-center justify-between px-2 sm:px-4 py-2 border-b border-neutral/20 shrink-0">
          <div className="flex items-center gap-2">
            <FileText size={16} />
            <div className="font-medium text-sm sm:text-base">Resume</div>
          </div>

          <div className="flex items-center gap-1">
            <a href={src} download="resume.pdf" className="btn btn-ghost btn-sm text-xs sm:text-sm">
              Download
            </a>
            <button onClick={onClose} className="btn btn-ghost btn-sm text-xs sm:text-sm">
              Close
            </button>
          </div>
        </div>


        <div className="flex-grow bg-base-300">
          <iframe src={src} title="Resume" className="w-full h-full border-none" />
        </div>
      </motion.div>
    </div>
  );
};

// **FIX:** All constant data is moved outside the component.
// This prevents it from being recreated on every render, which was causing the typewriter to restart.
const profileData = {
  name: "Kartheek Kethavath",
  role: "AI/ML Enthusiast",
  bio: "I specialize in crafting elegant and responsive web applications using modern technologies. My focus is on writing clean, maintainable code and designing intuitive user interfaces.",
};

const skillsData = ["AI/ML", "JavaScript ", "React", "Node.js & Express", "Databases (SQL, NoSQL)", "Python & Flask"];
const socialLinks = [
  { icon: <Github size={18} />, href: "https://github.com/Karthik3116", label: "GitHub" },
  { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/kethavathkartheek", label: "LinkedIn" },
  { icon: <Mail size={18} />, href: "mailto:karthik3116k@gmail.com", label: "Email" },
];

const codeLines = [
  `<span class="text-[#569cd6]">const</span> <span class="text-[#4ec9b0]">developer</span> = {`,
  `  <span class="text-[#9cdcfe]">name</span>: <span class="text-[#ce9178]">'Kartheek Kethavath'</span>,`,
  `  <span class="text-[#9cdcfe]">role</span>: <span class="text-[#ce9178]">'Full Stack Developer'</span>,`,
  `  <span class="text-[#9cdcfe]">bio</span>: <span class="text-[#ce9178]">'Building modern, user-centric web experiences.'</span>,`,
  `  <span class="text-[#9cdcfe]">skills</span>: [`,
  `    <span class="text-[#ce9178]">'AI-ML'</span>,`,
  `    <span class="text-[#ce9178]">'JavaScript (ES6+)'</span>,`,
  `    <span class="text-[#ce9178]">'React & Next.js'</span>,`,
  `    <span class="text-[#ce9178]">'Node.js & Express'</span>,`,
  `    <span class="text-[#ce9178]">'Databases (SQL,MONGO)'</span>,`,
  `  ],`,
  `  <span class="text-[#9cdcfe]">links</span>: {`,
  `    <span class="text-[#9cdcfe]">github</span>: <span class="text-[#ce9178]">'https://github.com/Karthik3116'</span>,`,
  `    <span class="text-[#9cdcfe]">linkedin</span>: <span class="text-[#ce9178]">'https://linkedin.com/in/kethavathkartheek'</span>,`,
  `  }`,
  `};`,
];

const terminalLines = [
  `<span class="text-green-400">$</span> npm run build`,
  ` `,
  `> portfolio@0.0.0 build`,
  `> vite build`,
  ` `,
  `vite v5.1.0 building for production...`,
  `✓ 35 modules transformed.`,
  `rendering chunks...`,
  `computing gzip size...`,
  ` `,
  `dist/index.html                  0.46 kB`,
  `dist/assets/index.css   5.33 kB │ gzip: 1.44 kB`,
  `dist/assets/index.js   81.27 kB │ gzip: 26.59 kB`,
  ` `,
  `<span class="text-green-400">✓</span> built in 782ms`
];

/* -------------------
   Home main component
   ------------------- */
const Home = () => {
  // replayKey still allows manual replay on demand
  const [replayKey, setReplayKey] = useState(0);

  // whether the code typing is finished (controls terminal reveal)
  const [isCodeFinished, setIsCodeFinished] = useState(false);

  // resume modal
  const [resumeOpen, setResumeOpen] = useState(false);

  // Check sessionStorage to see if typing ran already in this tab session
  // sessionStorage clears when tab/window is closed -> meets your requirement
  const [hasPlayedSession, setHasPlayedSession] = useState(() => {
    try {
      return typeof window !== "undefined" && sessionStorage.getItem("home_typing_done") === "true";
    } catch {
      return false;
    }
  });

  // When component mounts, if it already played in this session, immediately show final code/terminal
  useEffect(() => {
    if (hasPlayedSession) {
      setIsCodeFinished(true);
    }
  }, [hasPlayedSession]);

  // Replay handler: allows manual replay even if session flag says it already ran
  const handleReplay = () => {
    // ensure terminal hidden until typing completes
    setIsCodeFinished(false);
    // increment key to remount Typewriter(s)
    setReplayKey((k) => k + 1);
  };

  // Called when the code typewriter finishes (either auto-first-play or replay)
  const onCodeTypingDone = () => {
    // mark sessionStorage so we don't auto-play again within this tab
    try {
      sessionStorage.setItem("home_typing_done", "true");
    } catch {}
    setHasPlayedSession(true);
    setIsCodeFinished(true);
  };

  const handleViewResume = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    if (isMobile) {
      window.open("/resume.pdf", "_blank");
    } else {
      setResumeOpen(true);
    }
  };

  // Helper to render the final code instantly (no animation) when session flag present
  const renderFinalCode = () => (
    <pre className="whitespace-pre-wrap break-words text-sm font-mono min-h-[320px] max-h-[64vh] overflow-y-auto pb-4">
      {codeLines.map((ln, i) => (
        <div key={`final-${i}`} dangerouslySetInnerHTML={{ __html: ln }} />
      ))}
    </pre>
  );

  // Helper to render final terminal instantly
  const renderFinalTerminal = () => (
    <div className="font-mono text-sm">
      {terminalLines.map((l, i) => (
        <div key={`t-final-${i}`} dangerouslySetInnerHTML={{ __html: l }} />
      ))}
    </div>
  );

  // open resume modal
  const openResume = () => setResumeOpen(true);

  return (
    <div className="flex flex-col lg:flex-row items-stretch justify-center w-full min-h-full p-4 md:p-8 gap-8">
      <motion.div className="w-full lg:w-1/2 bg-base-300/50 rounded-xl shadow-2xl border border-base-content/10 font-mono text-sm flex flex-col overflow-hidden" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex items-center justify-between px-4 py-2 bg-base-200 border-b border-base-content/10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="text-xs text-base-content/60">
            src/components/Profile.jsx
          </div>
          <button onClick={handleReplay} className="btn btn-ghost btn-xs gap-1">
            <RefreshCw size={12} /> Replay
          </button>
        </div>
        <div className="flex-grow p-4 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50 animate-gradient-shift"></div>
          <style>{`@keyframes gradient-shift { 0%, 100% { background-position: 0% 50% } 50% { background-position: 100% 50% } } .animate-gradient-shift { background-size: 200% 200%; animation: gradient-shift 12s ease infinite; }`}</style>
          <div className="relative flex gap-4">
            <div className="select-none text-right text-base-content/30">
              {Array.from({ length: codeLines.length }, (_, i) => <div key={i}>{i + 1}</div>)}
            </div>
            <div className="flex-grow">
              {/* Show Typewriter if it hasn't run this session OR user manually replayed (replayKey > 0) */}
              {(!hasPlayedSession || replayKey > 0) ? (
                // Use replayKey as React key so manual replay forces remount & retype
                <Typewriter
                  key={`type-${replayKey}`}
                  lines={codeLines}
                  onDone={onCodeTypingDone}
                />
              ) : (
                // Already played during this tab session -> show final code instantly
                renderFinalCode()
              )}
            </div>
          </div>
        </div>

        {/* Terminal / build section: show after code finishes */}
        {isCodeFinished && (
          <motion.div className="bg-base-100/70 border-t border-base-content/10 p-4" initial={{ height: 0 }} animate={{ height: 'auto' }} transition={{ duration: 0.5 }}>
            <div className="text-xs text-green-400 mb-2">TERMINAL</div>

            {/* If user replayed (replayKey>0) then show animated terminal keyed to replayKey,
                otherwise if session already played show final terminal instantly */}
            {replayKey > 0 ? (
              <Typewriter key={`term-${replayKey}`} lines={terminalLines} speed={5} lineDelay={50} startDelay={100} />
            ) : hasPlayedSession ? (
              renderFinalTerminal()
            ) : (
              // first time auto-play (replayKey === 0 and not hasPlayedSession) -> animated terminal
              <Typewriter key={`term-auto`} lines={terminalLines} speed={5} lineDelay={50} startDelay={100} />
            )}
          </motion.div>
        )}
      </motion.div>

      <motion.div className="w-full lg:w-1/2 flex flex-col justify-center" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 text-center sm:text-left">
          <img src="/profile.png" alt={profileData.name} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-primary object-cover shadow-lg shrink-0" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">{profileData.name}</h1>
            <h2 className="text-lg sm:text-xl font-medium text-primary mt-1">{profileData.role}</h2>
          </div>
        </div>

        <p className="text-base-content/80 mb-6 text-base leading-relaxed text-center sm:text-left">{profileData.bio}</p>

        <h3 className="text-lg font-semibold mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2 mb-6 justify-center sm:justify-start">
          {skillsData.map((skill) => (
            <span key={skill} className="badge badge-secondary badge-outline py-3">{skill}</span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto justify-center sm:justify-start">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" title={link.label} className="p-3 bg-base-200 rounded-full hover:bg-primary hover:text-primary-content transition-colors duration-300">
              {link.icon}
            </a>
          ))}
          <button onClick={handleViewResume} className="btn btn-primary btn-outline flex items-center gap-2">
            <FileText size={18} /> View Resume
          </button>
        </div>
      </motion.div>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} src="/resume.pdf" />
    </div>
  );
};

export default Home;

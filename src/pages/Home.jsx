
// export default Home;
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, RefreshCw } from "lucide-react";

/* -------------------
   Typewriter: types raw source then renders line as HTML
   ------------------- */
const Typewriter = ({ lines = [], speed = 16, lineDelay = 200, startDelay = 500, onDone }) => {
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
  }, []);

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
   Minimal PDF modal (old-school viewer)
   ------------------- */
const ResumeModal = ({ open, onClose, src = "/resume.pdf" }) => {
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);
  const [zoom, setZoom] = useState(1);
  const controllerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError(null);
    setPdfUrl(null);
    setZoom(1);

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    (async () => {
      try {
        const res = await fetch(src, { method: "GET", signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ctype = res.headers.get("content-type") || "";
        if (!ctype.includes("pdf")) throw new Error("Server did not return a PDF.");
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message || "Failed to load resume.");
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      controllerRef.current?.abort();
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [open, src]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const zoomIn = () => setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(0.5, +(z - 0.25).toFixed(2)));
  const fit = () => setZoom(1);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onMouseDown={onClose}>
      <motion.div className="w-full max-w-4xl bg-base-100 rounded-lg shadow-2xl overflow-hidden" onMouseDown={(e) => e.stopPropagation()} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between px-3 py-2 border-b border-neutral/20">
          <div className="flex items-center gap-3">
            <FileText size={16} />
            <div className="font-medium">Resume — Kartheek Kethavath</div>
          </div>

          <div className="flex items-center gap-2">
            {pdfUrl && (
              <a href={pdfUrl} download="resume.pdf" className="btn btn-ghost btn-sm">
                Download
              </a>
            )}
            <button onClick={zoomOut} className="btn btn-ghost btn-sm" title="Zoom out">
              <svg width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13H5V11H19V13Z" /></svg>
            </button>
            <button onClick={zoomIn} className="btn btn-ghost btn-sm" title="Zoom in">
              <svg width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" /></svg>
            </button>
            <button onClick={fit} className="btn btn-ghost btn-sm" title="Fit">
              Fit
            </button>
            <button onClick={onClose} className="btn btn-ghost btn-sm">
              Close
            </button>
          </div>
        </div>

        <div className="h-[72vh] bg-[#0b0f12] flex items-stretch">
          {loading && <div className="m-auto text-neutral/60">Loading resume…</div>}

          {error && !loading && (
            <div className="m-auto text-center p-6">
              <div className="text-lg font-semibold mb-2">Cannot load resume</div>
              <div className="text-sm text-neutral/60 mb-4">{error}</div>
              <div className="flex justify-center gap-2">
                <a href={src} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">Open / Download</a>
                <button onClick={onClose} className="btn btn-ghost btn-sm">Close</button>
              </div>
            </div>
          )}

          {pdfUrl && (
            <div className="w-full h-full overflow-auto bg-[#0b0f12] flex justify-center items-start p-4">
              <div style={{ transform: `scale(${zoom})`, transformOrigin: "top left", width: `${100 / zoom}%` }}>
                <iframe src={pdfUrl} title="Resume" style={{ width: "100%", height: "72vh", border: "none" }} />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

/* -------------------
   Home main component
   ------------------- */
const Home = () => {
  const profileData = {
    name: "Kartheek Kethavath",
    role: "AI/ML Enthusiast",
    bio:
      "I specialize in crafting elegant and responsive web applications using modern technologies. My focus is on writing clean, maintainable code and designing intuitive user interfaces.",
  };

  const skillsData = ["AI/ML", "JavaScript (ES6+)", "React & Next.js", "Node.js & Express", "Databases (SQL, NoSQL)", "Python & Flask"];
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

  const [replayKey, setReplayKey] = useState(0);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row items-stretch justify-center w-full min-h-screen p-4 md:p-8 gap-8 bg-gradient-to-b from-[#081018] to-[#0b0f12] text-base-content">
      <motion.div className="w-full lg:w-1/2 bg-[#0d1114]/60 p-4 md:p-6 rounded-xl shadow-2xl border border-neutral/20 font-mono text-sm relative overflow-hidden" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <div className="ml-4 text-xs text-neutral/60 hidden sm:block">Home.jsx</div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setReplayKey((k) => k + 1)} className="btn btn-ghost btn-sm gap-2">
              <RefreshCw size={14} /> Replay
            </button>

            <button onClick={() => setResumeOpen(true)} className="btn btn-primary btn-sm gap-2">
              <FileText size={14} /> View Resume
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="select-none pr-2 border-r border-neutral/20 hidden sm:block">
            <ul className="text-xs text-neutral/50 leading-6">
              {codeLines.map((_, i) => (
                <li key={i} className="h-6 px-2">{i + 1}</li>
              ))}
            </ul>
          </div>

          <div className="flex-1">
            <div className="rounded-md p-3 bg-gradient-to-b from-[#061019] to-[#071018] shadow-inner" style={{ minHeight: 420 }}>
              <Typewriter key={replayKey} lines={codeLines} speed={16} lineDelay={200} startDelay={500} />
            </div>

            <div className="mt-2 text-xs text-neutral/50 flex items-center gap-3">
              <div className="px-2 py-1 rounded-md bg-neutral/10">UTF-8</div>
              <div className="px-2 py-1 rounded-md bg-neutral/10">JSX</div>
              <div className="ml-auto px-2 py-1 rounded-md bg-neutral/10">Ln 22, Col 18</div>
            </div>
          </div>
        </div>

        <div className="absolute right-4 bottom-4 opacity-70 flex gap-3">
          {socialLinks.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-neutral/10" aria-label={s.label}>
              {s.icon}
            </a>
          ))}
        </div>
      </motion.div>

      <motion.div className="w-full lg:w-1/2 flex flex-col justify-center" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 text-center sm:text-left">
          <img src="/profile.png" alt={profileData.name} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-primary object-cover shadow-lg shrink-0" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide">{profileData.name}</h1>
            <h2 className="text-lg sm:text-xl font-medium text-primary mt-1">{profileData.role}</h2>
          </div>
        </div>

        <p className="text-muted mb-6 text-base leading-relaxed text-center sm:text-left">{profileData.bio}</p>

        <h3 className="text-lg font-semibold mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {skillsData.map((skill) => (
            <span key={skill} className="badge badge-outline py-2">{skill}</span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto justify-center sm:justify-start">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" title={link.label} className="p-3 bg-neutral/10 rounded-full hover:bg-primary hover:text-primary-content transition-colors duration-300">
              {link.icon}
            </a>
          ))}
        </div>
      </motion.div>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} src="/resume.pdf" />
    </div>
  );
};

export default Home;

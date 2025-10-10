
import React, { useState } from "react";
import {
  Download,
  Mail,
  Calendar,
  Star,
  Briefcase,
  Code,
  BookOpen,
  GraduationCap,
  Trophy,
  GitBranch,
  Rocket,
} from "lucide-react";

/**
 * About.jsx
 * Polished, human-tone About page for Kartheek
 * - Replaced Milestones with an interactive Achievements carousel.
 * - All other sections remain intact.
 */

// --- New Achievements Components ---

const LeetCodeStats = () => (
    <div className="p-4 bg-base-100 rounded-lg text-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column: Profile & Stats */}
            <div className="md:col-span-1 space-y-4">
                <div className="p-4 bg-base-300 rounded-lg">
                    <h4 className="font-bold text-base-content mb-2">Community Stats</h4>
                    <ul className="space-y-1 text-base-content/70">
                        <li className="flex justify-between"><span>Views:</span> <span className="font-mono">253</span></li>
                        <li className="flex justify-between"><span>Solutions:</span> <span className="font-mono">22</span></li>
                        <li className="flex justify-between"><span>Reputation:</span> <span className="font-mono">90</span></li>
                    </ul>
                </div>
                <div className="p-4 bg-base-300 rounded-lg">
                    <h4 className="font-bold text-base-content mb-2">Contest Rating</h4>
                    <p className="text-3xl font-bold text-primary font-mono">1,695</p>
                    <p className="text-xs text-base-content/60">Top 13.28%</p>
                </div>
                 <div className="p-4 bg-base-300 rounded-lg">
                    <h4 className="font-bold text-base-content mb-2">Problems Solved</h4>
                     <div className="flex justify-between items-center">
                        <span className="text-green-400">Easy</span>
                        <span className="font-mono font-semibold">261<span className="text-xs text-base-content/50">/905</span></span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-yellow-400">Medium</span>
                        <span className="font-mono font-semibold">265<span className="text-xs text-base-content/50">/1927</span></span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-red-400">Hard</span>
                        <span className="font-mono font-semibold">24<span className="text-xs text-base-content/50">/874</span></span>
                     </div>
                </div>
            </div>

            {/* Right Column: Skills */}
            <div className="md:col-span-2 p-4 bg-base-300 rounded-lg">
                <h4 className="font-bold text-base-content mb-3">Top Skills</h4>
                <div className="space-y-3">
                    <div>
                        <h5 className="text-xs font-semibold text-primary mb-1">ADVANCED</h5>
                        <div className="flex flex-wrap gap-2">
                            <span className="badge badge-outline">Dynamic Programming</span>
                            <span className="badge badge-outline">Backtracking</span>
                            <span className="badge badge-outline">Union Find</span>
                        </div>
                    </div>
                     <div>
                        <h5 className="text-xs font-semibold text-primary mb-1">INTERMEDIATE</h5>
                        <div className="flex flex-wrap gap-2">
                            <span className="badge badge-outline">Hash Table</span>
                            <span className="badge badge-outline">Math</span>
                            <span className="badge badge-outline">Depth-First Search</span>
                        </div>
                    </div>
                     <div>
                        <h5 className="text-xs font-semibold text-primary mb-1">FUNDAMENTAL</h5>
                        <div className="flex flex-wrap gap-2">
                            <span className="badge badge-outline">Array</span>
                            <span className="badge badge-outline">String</span>
                            <span className="badge badge-outline">Sorting</span>
                        </div>
                    </div>
                </div>
                 <div className="mt-4 pt-4 border-t border-base-content/10">
                    <h4 className="font-bold text-base-content mb-2">Languages</h4>
                    <div className="flex items-center gap-4 text-base-content/70">
                        <span>Java: <span className="font-mono">508</span></span>
                        <span>C++: <span className="font-mono">23</span></span>
                        <span>MySQL: <span className="font-mono">19</span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ProjectsShowcase = () => {
    const projects = [
        { title: "Bio Vault", tag: "Full Stack", tech: ["React", "Node.js", "MongoDB"] },
        { title: "ai X interview", tag: "AI", tech: ["Python", "TensorFlow", "WebRTC"] },
        { title: "Smart PDF Chat", tag: "AI/ML", tech: ["LangChain", "FAISS", "Gemini"] },
    ];
    return (
        <div className="p-4 bg-base-100 rounded-lg text-sm">
           <div className="bg-base-300 p-4 rounded-lg shadow-inner max-h-[300px] overflow-y-auto">
                <h4 className="text-lg font-bold text-primary mb-4">🚀 My Projects</h4>
                <div className="space-y-4">
                    {projects.map(p => (
                        <div key={p.title} className="p-3 bg-base-100 rounded-md border border-base-content/10">
                            <div className="flex justify-between items-center mb-1">
                                <h5 className="font-bold text-base-content">{p.title}</h5>
                                <span className="badge badge-primary badge-sm">{p.tag}</span>
                            </div>
                             <div className="flex flex-wrap gap-1">
                                {p.tech.map(t => <span key={t} className="badge badge-secondary badge-outline badge-xs">{t}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
           </div>
        </div>
    );
};

const HackathonAchievement = () => (
     <div className="p-4 bg-base-100 rounded-lg text-sm h-full flex items-center justify-center">
        <div className="text-center bg-base-300 p-8 rounded-lg shadow-inner">
            <Trophy className="mx-auto w-12 h-12 text-yellow-400 mb-4" />
            <h4 className="font-bold text-lg text-primary">Hackathon Finalist</h4>
            <p className="text-base-content/80 mt-2 max-w-md mx-auto">
                Finalist at <span className="font-semibold">HASCKAVVY Hackathon</span>, where I built and pitched a brain tumor classification model for MRI scans.
            </p>
        </div>
    </div>
);


const AchievementsCarousel = () => {
    const [activeTab, setActiveTab] = useState('leetcode');

    const tabs = {
        leetcode: { label: 'Competitive Programming', component: <LeetCodeStats />, icon: <Code/> },
        
        hackathon: { label: 'Hackathons', component: <HackathonAchievement />, icon: <Trophy/> },
    };

    return (
        <div className="bg-base-200 border border-base-content/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-base-content mb-6 flex items-center gap-3">
                <Star className="w-5 h-5 text-primary" /> Achievements
            </h2>
            
            <div className="flex flex-wrap items-center border-b border-base-content/10 mb-4">
                {Object.entries(tabs).map(([key, {label, icon}]) => (
                    <button 
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === key 
                            ? 'border-primary text-primary' 
                            : 'border-transparent text-base-content/60 hover:text-base-content'
                        }`}
                    >
                        {React.cloneElement(icon, { size: 16 })}
                        {label}
                    </button>
                ))}
            </div>

            <div>
                {tabs[activeTab].component}
            </div>
        </div>
    );
}

// --- Main About Component ---

const About = () => {
  const skills = [
    { name: "React & Next.js", level: 90 },
    { name: "TypeScript / JavaScript", level: 88 },
    { name: "Python (Flask)", level: 76 },
    { name: "Node.js & Express", level: 80 },
    { name: "AI / ML (projects)", level: 70 },
    { name: "Databases (Postgres, Mongo)", level: 72 },
  ];

  return (
    <div
      className="bg-base-100 text-base-content min-h-full font-sans py-12 px-4 sm:px-6 lg:px-8"
      style={{ scrollBehavior: "smooth" }}
    >
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero Section */}
        <header className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-base-content leading-tight">
              Hi — I’m Kartheek. I build thoughtful web apps.
            </h1>

            <p className="text-base sm:text-lg text-base-content/70 max-w-2xl">
              I focus on making interfaces that feel quick, clear and useful. I enjoy building
              production-ready frontends with clean code, and applying machine learning where it
              genuinely helps people. Outside of work I tinker with small ML projects and enjoy
              competitive programming.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 btn btn-primary"
                download
              >
                <Download size={16} /> Download Resume
              </a>

              <a href="mailto:karthik3116k@gmail.com" className="inline-flex items-center gap-2 btn btn-ghost">
                <Mail size={16} /> Contact Me
              </a>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center justify-center p-6 rounded-2xl border border-base-content/10 bg-base-200 shadow-lg">
            <img
              src="/profile.png"
              alt="Kartheek Kethavath"
              className="w-28 h-28 rounded-full object-cover border-2 border-primary shadow-md"
            />
            <div className="text-center mt-4">
              <div className="font-bold text-lg text-base-content">Kartheek K.</div>
              <div className="text-sm text-base-content/60">AI/ML • Frontend</div>
            </div>
          </div>
        </header>

        {/* Highlight Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card icon={<Code />} title="Development" text="4+ years building web apps with React and modern tooling." />
          <Card icon={<BookOpen />} title="Learning" text="I keep a steady learning rhythm — new libs, patterns and contests." />
          <Card icon={<GraduationCap />} title="Education" text="B.Tech in Computer Science — AI & ML specialization." />
          <Card icon={<Star />} title="Focus" text="Clean UI, fast UX, and pragmatic ML." />
        </section>

        {/* --- NEW Achievements Carousel replaces Timeline --- */}
        <AchievementsCarousel />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3"> {/* Made skills section full width */}
                <aside className="bg-base-200 border border-base-content/10 rounded-2xl p-6 h-full">
                  <h3 className="text-xl font-bold text-base-content mb-6 flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-primary" /> Skills
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between text-base-content/80 text-sm mb-1">
                          <span>{skill.name}</span>
                          <span className="font-semibold">{skill.level}%</span>
                        </div>
                        <progress className="progress progress-primary w-full" value={skill.level} max="100"></progress>
                      </div>
                    ))}
                  </div>
                </aside>
            </div>
        </div>

        {/* Education Section */}
        <section className="bg-base-200 border border-base-content/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-base-content mb-6 flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-primary" /> Education & Certificates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-base-content">B.Tech — Computer Science (AI/ML)</h4>
              <p className="text-sm text-base-content/70 mt-1">Keshav Memorial Institute of Technology, Hyderabad — 2022-26</p>
            </div>

             
          </div>
        </section>
      </div>
    </div>
  );
};

/* Reusable Card Component */
const Card = ({ icon, title, text }) => (
  <div className="bg-base-200 border border-base-content/10 rounded-2xl p-4 flex items-start gap-4 transition-transform hover:-translate-y-1">
    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
      {React.cloneElement(icon, { className: "w-6 h-6" })}
    </div>
    <div>
      <h3 className="font-bold text-base-content">{title}</h3>
      <p className="text-sm text-base-content/70 mt-1">{text}</p>
    </div>
  </div>
);

export default About;


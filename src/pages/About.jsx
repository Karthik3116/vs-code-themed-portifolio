
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



import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { useApplySavedTheme } from "../utils/useTheme";
import { AnimatePresence } from "framer-motion";
// --- Developer Profile ---

const typingSequence = [
  'Full Stack Developer',
  2000,
  'AI/ML Enthusiast',
  2000,
  'Open Source Contributor',
  2000,
  'Tech Blogger',
  2000,
];

const roles = [
  "Full Stack Developer",
  "AI/ML Enthusiast",
  "Open Source Contributor",
  "Remote Engineer @ Remotico",
  "Lifelong Learner"
];


const developerProfile = {
  name: "Nitin Ranganath",
  role: "Full Stack Developer",
  bio: "Building modern, user-centric web experiences.",
  description:
    "I specialize in crafting elegant and responsive web applications using modern technologies. My focus is on writing clean, maintainable code and designing intuitive user interfaces.",
  skills: [
    "JavaScript (ES6+)",
    "React & Next.js",
    "Node.js & Express",
    "TypeScript",
    "HTML5 & CSS3/SCSS",
    "Databases (SQL/NoSQL)",
    "Git & CI/CD",
  ],
  links: {
    github: "https://github.com/nitinr",
    linkedin: "https://linkedin.com/in/nitinr",
    email: "nitin.ranganath.dev@example.com",
  },
  projectsUrl: "/projects",
};

// --- Code Line Generator ---
const generateCodeLines = (profile) => {
  return [
    <span key="open" className="text-base-content/60">const <span className="text-accent">developer</span> = {'{'}</span>,
    <span key="name">  <span className="text-accent">name</span>: <span className="text-success">"{profile.name}"</span>,</span>,
    <span key="role">  <span className="text-accent">role</span>: <span className="text-success">"{profile.role}"</span>,</span>,
    <span key="bio">  <span className="text-accent">bio</span>: <span className="text-success">"{profile.bio}"</span>,</span>,
    <span key="skills-head">  <span className="text-accent">skills</span>: [</span>,
    ...profile.skills.map((skill, i) => (
      <span key={`skill-${i}`}>    <span className="text-success">"{skill}"</span>,</span>
    )),
    <span key="skills-tail">  ],</span>,
    <span key="links-head">  <span className="text-accent">links</span>: {'{'}</span>,
    <span key="github">    <span className="text-accent">github</span>: <span className="text-success">"{profile.links.github}"</span>,</span>,
    <span key="linkedin">    <span className="text-accent">linkedin</span>: <span className="text-success">"{profile.links.linkedin}"</span>,</span>,
    <span key="email">    <span className="text-accent">email</span>: <span className="text-success">"{profile.links.email}"</span></span>,
    <span key="links-tail">  {'}'}</span>,
    <span key="close">{'}'}</span>,
  ];
};


// --- Animation Variants ---
const lineVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  }),
};

const Home = () => {
  useApplySavedTheme();
  const codeLines = generateCodeLines(developerProfile);
  const [highlightedIndex, setHighlightedIndex] = useState(null);


  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);


  // Trigger highlighting after animation is done
  useEffect(() => {
    let currentIndex = 0;

    const totalAnimationTime = codeLines.length * 50; // ms
    const highlightDelay = totalAnimationTime + 500; // small buffer

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setHighlightedIndex(currentIndex);
        currentIndex++;

        if (currentIndex >= codeLines.length) {
          clearInterval(interval);
        }
      }, 1000); // Delay between each highlight
    }, highlightDelay);

    return () => clearTimeout(timer);
  }, [codeLines]);

  const handleViewProjects = () => {
    console.log("Navigate to projects:", developerProfile.projectsUrl);
    // Implement navigation using react-router if needed
  };

  return (
    <div className="flex flex-col h-full bg-base-100">
      <main className="flex flex-1 p-4 md:p-6 lg:p-8 items-center">
        <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-6 md:gap-8">

          {/* --- Code Snippet --- */}
          <motion.section
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-base-content bg-base-300 p-4 sm:p-6 rounded-lg shadow-lg overflow-hidden h-full">
              <pre className="font-mono text-xs sm:text-sm whitespace-pre-wrap overflow-y-auto max-h-[60vh] md:max-h-full custom-scrollbar">
                {codeLines.map((line, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={lineVariants}
                    className={`block px-1 py-0.5 transition-all duration-300 ${highlightedIndex === index ? "bg-primary/20 rounded" : ""
                      }`}
                  >
                    {line}
                  </motion.div>
                ))}
              </pre>
            </div>
          </motion.section>

          {/* --- Profile Info --- */}
          <motion.section
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-base-200 rounded-lg shadow-lg p-6 md:p-8 h-full flex flex-col justify-between">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-base-content mb-1">
                  {developerProfile.name}
                </h1>
                {/* <h2 className="text-xl lg:text-2xl text-primary mb-4 font-medium">
                  <TypeAnimation
                    sequence={typingSequence}
                    wrapper="span"
                    speed={50}
                    repeat={Infinity}
                    cursor={true}
                  />
                </h2> */}


                <h2 className="text-xl lg:text-2xl text-primary mb-4 font-medium h-[2.5rem] overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={roles[currentRoleIndex]}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -30, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute"
                    >
                      {roles[currentRoleIndex]}
                    </motion.div>
                  </AnimatePresence>
                </h2>

                <p className="text-base-content/80 mb-6 leading-relaxed">
                  {developerProfile.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-base-content/60 uppercase mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {developerProfile.skills.slice(0, 5).map((skill) => (
                      <span key={skill} className="badge badge-neutral text-xs">
                        {skill}
                      </span>
                    ))}
                    {developerProfile.skills.length > 5 && (
                      <span className="badge badge-ghost text-xs">...</span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-3 mb-6">
                  <button
                    onClick={handleViewProjects}
                    className="btn btn-primary btn-sm sm:btn-md"
                  >
                    <FileText size={16} className="mr-1" />
                    View Projects
                  </button>
                  <a
                    href={`mailto:${developerProfile.links.email}`}
                    className="btn btn-outline btn-sm sm:btn-md"
                  >
                    <Mail size={16} className="mr-1" />
                    Contact Me
                  </a>
                </div>

                <div className="flex gap-5 items-center">
                  <a
                    href={developerProfile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="text-base-content/70 hover:text-primary transition-colors duration-200"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href={developerProfile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="text-base-content/70 hover:text-primary transition-colors duration-200"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href={`mailto:${developerProfile.links.email}`}
                    aria-label="Send Email"
                    className="text-base-content/70 hover:text-primary transition-colors duration-200"
                  >
                    <Mail size={24} />
                  </a>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default Home;

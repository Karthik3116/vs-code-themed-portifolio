
import React from "react";
import { motion } from "framer-motion";
import { Code, Github, Linkedin, Mail, FileText } from "lucide-react";

// --- Single Source of Truth for Profile Data ---
const developerProfile = {
  name: "Nitin Ranganath",
  role: "Full Stack Developer",
  bio: "Building modern, user-centric web experiences.", // Slightly refined bio
  description:
    "I specialize in crafting elegant and responsive web applications using modern technologies. My focus is on writing clean, maintainable code and designing intuitive user interfaces.", // Slightly expanded description
  skills: [
    "JavaScript (ES6+)",
    "React & Next.js",
    "Node.js & Express",
    "TypeScript",
    "HTML5 & CSS3/SCSS",
    "Databases (SQL/NoSQL)",
    "Git & CI/CD",
  ], // Added a few more common skills
  links: {
    github: "https://github.com/nitinr",
    linkedin: "https://linkedin.com/in/nitinr",
    email: "nitin.ranganath.dev@example.com", // Use a more descriptive placeholder email
    // Add other links if needed, e.g., portfolio, twitter
  },
  // Optional: Add project link or reference
  projectsUrl: "/projects", // Example path for projects page/section
};

// --- Function to Generate Code Lines Dynamically ---
const generateCodeLines = (profile) => {
  const lines = [
    'const developer = {',
    `  name: "${profile.name}",`,
    `  role: "${profile.role}",`,
    `  bio: "${profile.bio}",`,
    '  skills: [',
    ...profile.skills.map(skill => `    "${skill}",`),
    '  ],',
    '  links: {',
    `    github: "${profile.links.github}",`,
    `    linkedin: "${profile.links.linkedin}",`,
    `    email: "${profile.links.email}"`,
    '  }',
    '};',
  ];
  return lines;
};

// --- Animation Variants ---
const lineVariants = {
  hidden: { opacity: 0, x: -15 }, // Slightly increased offset
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08, // Keep the nice staggered delay
      type: "spring", // Add a subtle spring effect
      stiffness: 100,
      damping: 12,
    },
  }),
};

const Home = () => {
  const codeLines = generateCodeLines(developerProfile);

  const handleViewProjects = () => {
    console.log("Navigate to projects:", developerProfile.projectsUrl);
    // Add navigation logic here, e.g., using react-router-dom:
    // navigate(developerProfile.projectsUrl);
  };

  return (
    // Use min-h-screen to ensure it takes at least the full viewport height
    <div className="flex flex-col h-full bg-base-100">
      {/* Header Bar */}
      <header className="flex items-center bg-base-300 text-base-content p-2 text-sm border-b border-base-200 sticky top-0 z-10">
        <Code size={16} className="mr-2 flex-shrink-0" />
        <span>{developerProfile.name.toLowerCase().replace(" ", ".")}.profile.js</span> {/* Dynamic filename */}
      </header>

      {/* Main Content Area */}
      {/* Added items-center to vertically center content if page is short */}
      <main className="flex flex-1 p-4 md:p-6 lg:p-8 items-center">
        <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto gap-6 md:gap-8"> {/* Added max-width and centering */}

          {/* Animated Code Snippet Card */}
          <motion.section
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-base-content bg-base-300 p-4 sm:p-6 rounded-lg shadow-lg overflow-hidden h-full"> {/* Adjusted padding */}
              {/* Added max-height and overflow-y-auto for very long code snippets */}
              <pre className="font-mono text-xs sm:text-sm whitespace-pre-wrap overflow-y-auto max-h-[60vh] md:max-h-full custom-scrollbar"> {/* Added custom-scrollbar class possibility */}
                {codeLines.map((line, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={lineVariants}
                    className="block" // Use block instead of relying on whitespace-pre-wrap alone for layout
                  >
                    {/* Render line numbers (optional) */}
                    {/* <span className="text-base-content/30 select-none pr-4">{index + 1}</span> */}
                    {line}
                  </motion.div>
                ))}
              </pre>
            </div>
          </motion.section>

          {/* Profile Information Card */}
          <motion.section
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Flex column and justify-between to push buttons/links down */}
            <div className="bg-base-200 rounded-lg shadow-lg p-6 md:p-8 h-full flex flex-col justify-between"> {/* Slightly different bg for contrast */}
              {/* Top Profile Info */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-base-content mb-1">
                  {developerProfile.name}
                </h1>
                <h2 className="text-xl lg:text-2xl text-primary mb-4 font-medium">
                  {developerProfile.role}
                </h2>
                <p className="text-base-content/80 mb-6 leading-relaxed">
                  {developerProfile.description}
                </p>
                 {/* Displaying Skills (Optional Enhancement) */}
                 <div className="mb-6">
                    <h3 className="text-sm font-semibold text-base-content/60 uppercase mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {developerProfile.skills.slice(0, 5).map(skill => ( // Show first 5 skills for brevity
                            <span key={skill} className="badge badge-neutral text-xs">
                                {skill}
                            </span>
                        ))}
                        {developerProfile.skills.length > 5 && <span className="badge badge-ghost text-xs">...</span>}
                    </div>
                 </div>
              </div>

              {/* Bottom Actions & Links */}
              <div>
                <div className="flex flex-wrap gap-3 mb-6"> {/* Slightly smaller gap */}
                  <button
                    onClick={handleViewProjects}
                    className="btn btn-primary btn-sm sm:btn-md" // Use DaisyUI button classes
                  >
                    <FileText size={16} className="mr-1" />
                    View Projects
                  </button>
                  {/* Changed to an anchor tag for mailto link */}
                  <a
                    href={`mailto:${developerProfile.links.email}`}
                    className="btn btn-outline btn-sm sm:btn-md" // DaisyUI outline button
                  >
                    <Mail size={16} className="mr-1" />
                    Contact Me
                  </a>
                </div>

                <div className="flex gap-5 items-center"> {/* Increased gap for social icons */}
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

      {/* Optional Footer */}
      {/* <footer className="p-4 bg-base-300 text-base-content/60 text-center text-xs">
        © {new Date().getFullYear()} {developerProfile.name}. All rights reserved.
      </footer> */}
    </div>
  );
};

export default Home;

// Add this to your tailwind.config.js or global CSS if you want custom scrollbars
/*
@layer utilities {
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
*/
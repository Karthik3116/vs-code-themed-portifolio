

import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "Bio Vault",
    image: "./bio.png",
    description: "A secure health data management system with encryption and privacy controls.",
    github: "https://github.com/Karthik3116/BioVault",
    live: "https://bio-vault.karthik.top/",
    tag: "Full Stack",
    tech: ["React", "Node.js", "MongoDB"]
  },
  {
    title: "ai X interview",
    image: "./aix.png",
    description: "AI-powered mock interview platform simulating real-time technical interviews.",
    github: "https://github.com/Karthik3116/aiXinterview",
    live: "https://interview.karthik.top/",
    tag: "AI",
    tech: ["Python", "TensorFlow", "WebRTC"]
  },
  {
    title: "Smart PDF Chat",
    image: "./rag.png",
    description: "RAG-powered chatbot for querying PDFs using natural language.",
    github: "https://github.com/Karthik3116/RAG_BOT",
    live: "https://grokbot.streamlit.app/",
    tag: "AI/ML",
    tech: ["LangChain", "FAISS", "Gemini"]
  },
  {
    title: "CheXNet Report Generator",
    image: "./chex.png",
    description: "Deep learning model for generating medical reports from chest X-rays.",
    github: "https://github.com/Karthik3116/Medical-Report-Generator",
    live: "https://github.com/Karthik3116/Medical-Report-Generator",
    tag: "Medical AI",
    tech: ["CNN", "GRU", "Attention"]
  },
  {
    title: "EAMCET College Predictor",
    image: "./colleg.png",
    description: "Flask-based web app for predicting colleges based on EAMCET rank.",
    github: "https://github.com/Karthik3116/eamcet-college-predictor",
    live: "https://collegify.pythonanywhere.com/",
    tag: "Data Science",
    tech: ["Flask", "Pandas", "Scikit-learn"]
  },
  {
    title: "LawBot AI",
    image: "./law.png",
    description: "Legal chatbot providing information based on Indian law.",
    github: "https://github.com/Karthik3116/legal_assistant",
    tag: "AI",
    tech: ["Flask", "MongoDB", "Gemini API"]
  },
  {
    title: "YouTube Summarizer",
    image: "./yt_summ.png",
    description: "Transcribe and summarize YouTube videos with conversational Q&A.",
    github: "https://github.com/Karthik3116/HTF24-Team-163",
    tag: "MERN + AI",
    tech: ["MERN", "Whisper", "OpenAI"]
  },
  {
    title: "Portfolio",
    image: "/portf.png",
    description: "Interactive portfolio website built with React and Tailwind CSS.",
    github: "https://github.com/Karthik3116/portfolio",
    tag: "Frontend",
    tech: ["React", "Tailwind CSS", "Framer Motion"]
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content p-4 sm:p-6"
      style={{ minHeight: "calc(100vh - 8rem)" }}
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-10 text-center">
        <span className="text-primary">🚀 My Projects</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative bg-base-200 rounded-xl shadow-lg overflow-hidden group hover:ring-2 hover:ring-primary transition duration-300 h-full flex flex-col"
          >
            {/* Image Preview */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4 sm:p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-lg sm:text-xl font-semibold text-base-content">
                  {project.title}
                </h2>
                <span className="badge badge-primary text-xs">
                  {project.tag}
                </span>
              </div>
              
              <p className="text-base-content/80 text-sm sm:text-base mb-4 flex-1">
                {project.description}
              </p>
              
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i} 
                      className="badge badge-outline text-xs py-1.5 px-2"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-focus flex items-center gap-1 text-sm"
                  >
                    <FaGithub className="text-base" />
                    <span>Code</span>
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-focus flex items-center gap-1 text-sm"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

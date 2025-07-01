
import React from "react";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "Bio Vault",
    image: "./bio.png",
    description: "A real-time chat app using Socket.io and Node.js.",
    github: "https://github.com/Karthik3116/BioVault",
    live: "https://bio-vault.karthik.top/",
    tag: "Full Stack",
  },
  {
    title: "ai X interview",
    image: "./aix.png",
    description: "An AI-powered mock interview platform simulating real-time technical interviews.",
    github: "https://github.com/Karthik3116/aiXinterview",
    live: "https://interview.karthik.top/",
    tag: "AI",
  },
  {
    title: "Chat App",
    image: "./chat.png",
    description: "A real-time chat app using Socket.io and Node.js.",
    github: "https://github.com/Karthik3116/fullstack-chat-app",
    live: "https://chat.karthik.top",
    tag: "Frontend",
  },
  {
    title: "Smart PDF Chat",
    image: "./rag.png",
    description: "A RAG-powered chatbot that allows users to query PDFs using natural language, leveraging LangChain, FAISS, and Gemini 1.5 Flash for real-time semantic search.",
    github: "https://github.com/Karthik3116/RAG_BOT",
    live: "https://grokbot.streamlit.app/",
    tag: "AI/ML",
  },
  {
    title: "CheXNet Report Generator",
    image: "./chex.png",
    description: "A deep learning model combining CNNs, GRUs, and Bahdanau Attention for generating medical reports from chest X-rays, evaluated with BLEU scores.",
    github: "https://github.com/Karthik3116/Medical-Report-Generator",
    live: "https://github.com/Karthik3116/Medical-Report-Generator",
    tag: "Deep Learning, Transformer, Medical AI",
  },
  {
    title: "EAMCET College Predictor",
    image: "./colleg.png",
    description: "A Flask-based web app that predicts colleges based on EAMCET rank and category, using Pandas for CSV data processing and dynamic filtering.",
    github: "https://github.com/Karthik3116/eamcet-college-predictor",
    live: "https://collegify.pythonanywhere.com/",
    tag: "Data Science",
  },
  {
    title: "LawBot AI",
    image: "./law.png",
    description: "A legal chatbot web app using Flask, MongoDB, and Gemini API to provide general legal information based on Indian law. Includes user authentication, chat history, and dynamic response generation with Gemini 1.5 Flash.",
    github: "https://github.com/Karthik3116/legal_assistant",
    tag: "AI",
  },
  {
    title: "YouTube Summarizer & Chatbot",
    image: "./yt_summ.png", // Replace with your actual screenshot or thumbnail
    description: "A full-stack application using Whisper and MERN stack to transcribe and summarize YouTube videos, then enable conversational Q&A with the summary using a context-aware chatbot.",
    github: "https://github.com/Karthik3116/HTF24-Team-163", // Replace with actual repo link
    tag: "MERN + AI",
  },
  {
    title: "portfolio",
    image: "/portf.png",
    description: "portfolio website built using React and Tailwind CSS.",
    github: "https://github.com/yourusername/chat-app",
    tag: "Real-time",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content p-6"
          style={{ minHeight: "calc(100vh - 8rem)" }}
    >
      <h1 className="text-4xl font-bold mb-12 text-center">
        <span className="text-primary">🚀 My Projects</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative bg-base-300 rounded-2xl shadow-xl overflow-hidden group hover:ring-2 hover:ring-primary hover:scale-[1.015] transition duration-300"
          >
            {/* Badge */}
            <span className="absolute top-2 right-2 bg-primary text-primary-content text-xs px-2 py-1 rounded-full z-10">
              {project.tag}
            </span>

            {/* Project Image */}
            <figure className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-base-100/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center p-5 text-center space-y-4">
                <p className="text-base-content/80 text-sm">{project.description}</p>
                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-focus text-2xl"
                    title="GitHub"
                  >
                    <FaGithub />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline bg-primary/10 px-3 py-1 rounded-lg"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </figure>

            {/* Card Footer */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-base-content">{project.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

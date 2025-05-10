
import React from "react";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "Chat App",
    image: "./chat.png",
    description: "A real-time chat app using Socket.io and Node.js.",
    github: "https://github.com/Karthik3116/fullstack-chat-app",
    live: "https://chat.karthik.top",
    tag: "Frontend",
  },
  {
    title: "LawBot AI",
    image: "./law.png",
    description: "A legal chatbot web app using Flask, MongoDB, and Gemini API to provide general legal information based on Indian law. Includes user authentication, chat history, and dynamic response generation with Gemini 1.5 Flash.",
    github: "https://github.com/Karthik3116/legal_assistant",
    tag: "Flask",
  },
  {
    title: "YouTube Summarizer & Chatbot",
    image: "./yt_summ.png", // Replace with your actual screenshot or thumbnail
    description: "A full-stack application using Whisper and MERN stack to transcribe and summarize YouTube videos, then enable conversational Q&A with the summary using a context-aware chatbot.",
    github: "https://github.com/Karthik3116/HTF24-Team-163", // Replace with actual repo link
    tag: "MERN + AI",
  },
  {
    title: "Blog Platform",
    image: "/images/blog-platform.png",
    description: "A markdown-based blog platform with authentication.",
    github: "https://github.com/yourusername/blog-platform",
    tag: "Fullstack",
  },
  {
    title: "E-commerce Store",
    image: "/images/ecommerce-store.png",
    description: "An online store built with React, Redux, and Stripe.",
    github: "https://github.com/yourusername/ecommerce-store",
    tag: "E-commerce",
  },
  {
    title: "portfolio",
    image: "/images/chat-app.png",
    description: "portfolio website built using React and Tailwind CSS.",
    github: "https://github.com/yourusername/chat-app",
    tag: "Real-time",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-base-100 text-base-content p-6">
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

//   import React from "react";

// const projects = [
//   {
//     title: "Portfolio Website",
//     image: "./chat.png",
//     description: "A developer portfolio built using React and Tailwind CSS.",
//     github: "https://github.com/yourusername/portfolio-site",
//   },
//   {
//     title: "Weather App",
//     image: "/images/weather-app.png",
//     description: "A weather forecast app using OpenWeather API and React.",
//     github: "https://github.com/yourusername/weather-app",
//   },
//   {
//     title: "Task Manager",
//     image: "/images/task-manager.png",
//     description: "A simple task manager with drag-and-drop functionality.",
//     github: "https://github.com/yourusername/task-manager",
//   },
//   {
//     title: "Blog Platform",
//     image: "/images/blog-platform.png",
//     description: "A markdown-based blog platform with authentication.",
//     github: "https://github.com/yourusername/blog-platform",
//   },
//   {
//     title: "E-commerce Store",
//     image: "/images/ecommerce-store.png",
//     description: "An online store built with React, Redux, and Stripe.",
//     github: "https://github.com/yourusername/ecommerce-store",
//   },
//   {
//     title: "Chat App",
//     image: "/images/chat-app.png",
//     description: "A real-time chat app using Socket.io and Node.js.",
//     github: "https://github.com/yourusername/chat-app",
//   },
// ];

// const Projects = () => {
//   return (
//     <div className="min-h-screen bg-base-100 text-base-content p-6">
//       <h1 className="text-4xl font-bold mb-12 text-center">
//         <span className="text-primary">🚀 My Projects</span>
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {projects.map((project, index) => (
//           <div
//             key={index}
//             className="bg-base-300 rounded-lg shadow-lg overflow-hidden group transition-transform duration-300 hover:-translate-y-1"
//           >
//             <figure className="relative">
//               <img
//                 src={project.image}
//                 alt={project.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="absolute inset-0 bg-base-100 bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
//                 <p className="text-base-content/80 text-sm mb-4">{project.description}</p>
//                 <a
//                   href={project.github}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="btn btn-sm btn-outline text-primary hover:bg-primary hover:text-primary-content"
//                 >
//                   View on GitHub
//                 </a>
//               </div>
//             </figure>

//             <div className="p-4">
//               <h2 className="text-xl font-semibold text-base-content">{project.title}</h2>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Projects;

import React from "react";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "Portfolio Website",
    image: "./chat.png",
    description: "A developer portfolio built using React and Tailwind CSS.",
    github: "https://github.com/yourusername/portfolio-site",
    tag: "Frontend",
  },
  {
    title: "Weather App",
    image: "/images/weather-app.png",
    description: "A weather forecast app using OpenWeather API and React.",
    github: "https://github.com/yourusername/weather-app",
    tag: "API",
  },
  {
    title: "Task Manager",
    image: "/images/task-manager.png",
    description: "A simple task manager with drag-and-drop functionality.",
    github: "https://github.com/yourusername/task-manager",
    tag: "Productivity",
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
    title: "Chat App",
    image: "/images/chat-app.png",
    description: "A real-time chat app using Socket.io and Node.js.",
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
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-focus text-2xl"
                >
                  <FaGithub />
                </a>
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

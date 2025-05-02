
// import React from "react";

// const projects = [
//   {
//     title: "Portfolio Website",
//     image: "/images/portfolio-preview.png",
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
//     <div className="p-8 min-h-screen bg-base-100 text-white">
//       <h1 className="text-3xl font-bold mb-8 text-center">🚀 My Projects</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {projects.map((project, index) => (
//           <div
//             key={index}
//             className="card bg-base-200 text-white border border-gray-700 shadow-lg group transition-transform duration-300 hover:-translate-y-1 rounded-lg"
//           >
//             <figure className="relative overflow-hidden">
//               <img
//                 src={project.image}
//                 alt={project.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-4">
//                 <p className="text-sm mb-3">{project.description}</p>
//                 <a
//                   href={project.github}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-black"
//                 >
//                   GitHub
//                 </a>
//               </div>
//             </figure>
//             <div className="card-body p-4 bg-[#007ACC] rounded-b-md">
//               <h2 className="card-title">{project.title}</h2>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Projects;


import React from "react";

const projects = [
  {
    title: "Portfolio Website",
    image: "/images/portfolio-preview.png",
    description: "A developer portfolio built using React and Tailwind CSS.",
    github: "https://github.com/yourusername/portfolio-site",
  },
  {
    title: "Weather App",
    image: "/images/weather-app.png",
    description: "A weather forecast app using OpenWeather API and React.",
    github: "https://github.com/yourusername/weather-app",
  },
  {
    title: "Task Manager",
    image: "/images/task-manager.png",
    description: "A simple task manager with drag-and-drop functionality.",
    github: "https://github.com/yourusername/task-manager",
  },
  {
    title: "Blog Platform",
    image: "/images/blog-platform.png",
    description: "A markdown-based blog platform with authentication.",
    github: "https://github.com/yourusername/blog-platform",
  },
  {
    title: "E-commerce Store",
    image: "/images/ecommerce-store.png",
    description: "An online store built with React, Redux, and Stripe.",
    github: "https://github.com/yourusername/ecommerce-store",
  },
  {
    title: "Chat App",
    image: "/images/chat-app.png",
    description: "A real-time chat app using Socket.io and Node.js.",
    github: "https://github.com/yourusername/chat-app",
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
            className="bg-base-300 rounded-lg shadow-lg overflow-hidden group transition-transform duration-300 hover:-translate-y-1"
          >
            <figure className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-base-100 bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center">
                <p className="text-base-content/80 text-sm mb-4">{project.description}</p>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline text-primary hover:bg-primary hover:text-primary-content"
                >
                  View on GitHub
                </a>
              </div>
            </figure>

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

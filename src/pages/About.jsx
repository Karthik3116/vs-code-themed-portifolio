
import React from "react";
import { ArrowRight, User } from "lucide-react";

// Reusable Themed Button
const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`bg-primary text-primary-content px-6 py-2 rounded-md shadow hover:bg-primary-focus transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const About = () => {
  return (
    <div
      className="bg-base-100 text-base-content px-4 py-10 font-sans overflow-y-auto"
      style={{
        height: "calc(100vh - 7.8rem)", // Adjust to bottom bar height if needed
      }}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">
            About Me
          </h1>
          <p className="text-base-content/70 mt-4 text-lg sm:text-xl">
            A creative developer passionate about building engaging and
            user-friendly experiences.
          </p>
          
        </div>

        {/* Journey Section */}
        <section className="bg-base-200 border border-base-300 rounded-xl p-6 sm:p-8 shadow">
          <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
            <User className="w-6 h-6" />
            My Journey
          </h2>
          <p className="leading-relaxed">
            Hi, I'm Kartheek, a computer science student from Hyderabad. I have a strong interest in frontend development, especially with React and JavaScript. Through competitive programming, I’ve developed problem-solving skills and gained an interest in AI and ML technologies. Currently, I'm pursuing a B.Tech in Computer Science and Engineering (AI-ML) and enjoy working on real-world projects to improve my skills. My goal is to build user-friendly and intuitive web experiences.
          </p>
          <p className="leading-relaxed mt-4">
            This keeps it concise and to the point while highlighting your key interests and skills. Let me know if you'd like to tweak it further!
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;

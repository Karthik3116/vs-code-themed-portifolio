import React from "react";
import { GitBranch, AlertCircle, XCircle, Bell, Share2 } from "lucide-react";

const StatusBar = () => {
  return (
    <div className="bg-primary text-primary-content flex justify-between items-center text-xs px-3 h-6 shrink-0">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <a 
          href="https://github.com/Karthik3116/portfolio" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-1 hover:bg-white/20 px-2 rounded transition-colors"
        >
          <GitBranch size={14} />
          <span>main</span>
        </a>
        <div className="hidden sm:flex items-center gap-2">
          <span className="flex items-center gap-1"><XCircle size={14} /> 0</span>
          <span className="flex items-center gap-1"><AlertCircle size={14} /> 0</span>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <span className="hidden lg:inline">Ln 23, Col 18</span>
        <span className="hidden md:inline">Spaces: 2</span>
        <span className="hidden md:inline">UTF-8</span>
        <span className="hidden sm:inline">CRLF</span>
        <span>{`{ } JavaScript`}</span>
        <Bell size={14} className="cursor-pointer" title="Notifications"/>
      </div>
    </div>
  );
};

export default StatusBar;
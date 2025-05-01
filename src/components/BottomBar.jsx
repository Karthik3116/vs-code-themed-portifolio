import React from "react";
import { AlertCircle, XCircle, Triangle, Share2, Bell } from "lucide-react";

const BottomBar = () => {
  return (
    <div className="flex justify-between items-center h-8 bg-[#0d1117] text-[#8b949e] border-t border-[#30363d] px-3 text-xs font-mono">
      {/* Left Icons */}
      <div className="flex items-center space-x-3">
        {/* Open a remote window (can use placeholder for now) */}
        <img src="/remotico.png" alt="remotico" />

        {/* "No Problems" styled icons */}
        <div className="flex items-center space-x-2">
          <XCircle size={14} className="text-gray-500" />
          <Triangle size={14} className="text-yellow-400" />
          <AlertCircle size={14} className="text-red-500" />
        </div>

        {/* Live Share icon */}
        <Share2 size={14} className="text-blue-400 cursor-pointer" />
      </div>

      {/* Right info */}
      <div className="flex items-center space-x-3">
        <span>Ln 22, Col 18</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>CRLF</span>
        <span>{`{}`}</span>
        <span>JavaScript JSX</span>
        <Bell size={14} className="text-gray-400 cursor-pointer" />
      </div>
    </div>
  );
};

export default BottomBar;

import React from "react";
import {
  FaFileAlt,
  FaSearch,
  FaBug,
  FaPuzzlePiece,
  FaDocker,
  FaBolt,
  FaUserCircle,
  FaCog,
} from "react-icons/fa";

const LeftActivityBar = ({ setActivePage }) => {
  return (
    <div className="w-12 bg-[#202324] flex flex-col justify-between items-center py-4 border-r border-[#30363d] text-[#8b949e]">
      {/* Top Icons */}
      <div className="space-y-6 text-lg">
        <FaFileAlt className="cursor-pointer hover:text-white" title="Explorer" />
        <FaSearch className="cursor-pointer hover:text-white" title="Search" />
        <FaBug className="cursor-pointer hover:text-white" title="Debug" />
        <FaPuzzlePiece className="cursor-pointer hover:text-white" title="Extensions" />
        <FaDocker className="cursor-pointer hover:text-white" title="Docker" />
        <FaBolt className="cursor-pointer hover:text-white" title="Thunder Client" />
      </div>

      {/* Bottom Icons */}
      <div className="space-y-4 text-xl">
        <FaUserCircle className="cursor-pointer hover:text-white" title="Profile" />
        <FaCog
            className="cursor-pointer hover:text-white"
            title="Settings"
            onClick={() => setActivePage("Settings.jsx")}
        />

      </div>
    </div>
  );
};

export default LeftActivityBar;

// import React from "react";
// import {
//   FaFileAlt,
//   FaSearch,
//   FaBug,
//   FaPuzzlePiece,
//   FaDocker,
//   FaBolt,
//   FaUserCircle,
//   FaCog,
// } from "react-icons/fa";

// const LeftActivityBar = ({ setActivePage }) => {
//   return (
//     <div className="w-12 bg-[#202324] flex flex-col justify-between items-center py-4 border-r border-[#30363d] text-[#8b949e]">
//       {/* Top Icons */}
//       <div className="space-y-6 text-lg">
//         <FaFileAlt className="cursor-pointer hover:text-white" title="Explorer" />
//         <FaSearch className="cursor-pointer hover:text-white" title="Search" />
//         <FaBug className="cursor-pointer hover:text-white" title="Debug" />
//         <FaPuzzlePiece className="cursor-pointer hover:text-white" title="Extensions" />
//         <FaDocker className="cursor-pointer hover:text-white" title="Docker" />
//         <FaBolt className="cursor-pointer hover:text-white" title="Thunder Client" />
//       </div>

//       {/* Bottom Icons */}
//       <div className="space-y-4 text-xl">
//         <FaUserCircle className="cursor-pointer hover:text-white" title="Profile" />
//         <FaCog
//             className="cursor-pointer hover:text-white"
//             title="Settings"
//             onClick={() => setActivePage("Settings.jsx")}
//         />

//       </div>
//     </div>
//   );
// };

// export default LeftActivityBar;
import React from "react";
import { useState } from "react";

import {
  FaFileAlt,
  FaSearch,
  FaBug,
  FaPuzzlePiece,
  FaUserCircle,
  FaCog,
} from "react-icons/fa";


const LeftActivityBar = ({ setActivePage }) => {
  const [activeIcon, setActiveIcon] = useState("explorer");
  
  const icons = [
    { id: "explorer", icon: <FaFileAlt />, title: "Explorer", page: "Home.jsx" },
    { id: "search", icon: <FaSearch />, title: "Search", page: "Projects.zip" },
    { id: "debug", icon: <FaBug />, title: "Debug", page: "Profiles.json" },
    { id: "extensions", icon: <FaPuzzlePiece />, title: "Extensions" },
    { id: "profile", icon: <FaUserCircle />, title: "Profile", page: "About.txt" },
    { id: "settings", icon: <FaCog />, title: "Settings", page: "Settings.config" },
  ];

  const handleClick = (icon) => {
    setActiveIcon(icon.id);
    if (icon.page) {
      setActivePage(icon.page);
    }
  };

  return (
    <div className="w-12 bg-base-300 flex flex-col justify-between items-center py-4 border-r border-base-200 text-base-content/70">
      <div className="space-y-6 text-lg">
        {icons.slice(0, 4).map((icon) => (
          <div 
            key={icon.id}
            onClick={() => handleClick(icon)}
            className={`p-2 rounded-lg cursor-pointer transition-colors ${
              activeIcon === icon.id 
                ? "text-primary bg-primary/10" 
                : "hover:text-base-content"
            }`}
            title={icon.title}
          >
            {icon.icon}
          </div>
        ))}
      </div>

      <div className="space-y-4 text-lg">
        {icons.slice(4).map((icon) => (
          <div 
            key={icon.id}
            onClick={() => handleClick(icon)}
            className={`p-2 rounded-lg cursor-pointer transition-colors ${
              activeIcon === icon.id 
                ? "text-primary bg-primary/10" 
                : "hover:text-base-content"
            }`}
            title={icon.title}
          >
            {icon.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftActivityBar;
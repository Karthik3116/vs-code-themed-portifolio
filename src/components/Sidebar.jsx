// import React from "react";
// import {
//   FileText,
//   FileCode,
//   FileArchive,
//   Info,
//   Settings as SettingsIcon,
// } from "lucide-react";

// // Helper to return appropriate icon
// const getFileIcon = (fileName) => {
//   if (fileName.endsWith(".jsx")) return <FileCode className="w-4 h-4 inline mr-2" />;
//   if (fileName.endsWith(".txt")) return <FileText className="w-4 h-4 inline mr-2" />;
//   if (fileName.endsWith(".zip")) return <FileArchive className="w-4 h-4 inline mr-2" />;
//   if (fileName.endsWith(".info")) return <Info className="w-4 h-4 inline mr-2" />;

//   if (fileName.toLowerCase().includes("settings"))
//     return <SettingsIcon className="w-4 h-4 inline mr-2" />;
//   return <FileText className="w-4 h-4 inline mr-2" />;
// };

// const Sidebar = ({ componentMap, openFile, activeTab }) => {
//   return (
//     <div className="w-64 bg-base-200 p-3 border-r border-base-300 flex flex-col justify-between text-sm text-base-content">
//       {/* Explorer Section */}
//       <div className="space-y-2">
//         <div className="font-semibold text-base-content tracking-wide">EXPLORER</div>

//         <ul className="space-y-1">
//           {Object.keys(componentMap).map((file) => (
//             <li
//               key={file}
//               onClick={() => openFile(file)}
//               className={`px-2 py-1 rounded cursor-pointer flex items-center transition-colors duration-150 ${
//                 activeTab === file
//                   ? "bg-primary text-primary-content"
//                   : "hover:bg-base-300 text-base-content/70"
//               }`}
//             >
//               {getFileIcon(file)}
//               <span>{file}</span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Bottom Outline/Timeline */}
//       <div className="text-xs text-base-content/70 border-t border-base-300 pt-2 mt-2">
//         <div className="mb-1 font-semibold text-base-content">OUTLINE</div>
//         <hr className="border-base-300" />
//         <div className="mb-1 mt-2 font-semibold text-base-content">TIMELINE</div>
//         <hr className="border-base-300" />
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { FileText, FileCode, FileArchive, Info, Settings as SettingsIcon, X } from "lucide-react";

const getFileIcon = (fileName) => {
  if (fileName.endsWith(".jsx")) return <FileCode className="w-4 h-4 inline mr-2" />;
  if (fileName.endsWith(".txt")) return <FileText className="w-4 h-4 inline mr-2" />;
  if (fileName.endsWith(".zip")) return <FileArchive className="w-4 h-4 inline mr-2" />;
  if (fileName.endsWith(".info")) return <Info className="w-4 h-4 inline mr-2" />;
  if (fileName.endsWith(".json")) return <FileText className="w-4 h-4 inline mr-2" />;
  if (fileName.endsWith(".config")) return <SettingsIcon className="w-4 h-4 inline mr-2" />;
  return <FileText className="w-4 h-4 inline mr-2" />;
};

const Sidebar = ({ componentMap, openFile, activeTab, closeSidebar }) => {
  return (
    <div className="w-64 bg-base-200 p-3 border-r border-base-300 flex flex-col justify-between text-sm text-base-content relative">
      <button 
        className="absolute top-2 right-2 text-base-content/70 hover:text-base-content lg:hidden"
        onClick={closeSidebar}
      >
        <X size={16} />
      </button>
      
      <div className="space-y-2 mt-6">
        <div className="font-semibold text-base-content tracking-wide">EXPLORER</div>

        <ul className="space-y-1">
          {Object.keys(componentMap).map((file) => (
            <li
              key={file}
              onClick={() => openFile(file)}
              className={`px-2 py-1 rounded cursor-pointer flex items-center transition-colors duration-150 ${
                activeTab === file
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-300 text-base-content/70"
              }`}
            >
              {getFileIcon(file)}
              <span>{file}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-xs text-base-content/70 border-t border-base-300 pt-2 mt-2">
        <div className="mb-1 font-semibold text-base-content">OUTLINE</div>
        <hr className="border-base-300" />
        <div className="mb-1 mt-2 font-semibold text-base-content">TIMELINE</div>
        <hr className="border-base-300" />
      </div>
    </div>
  );
};

export default Sidebar;
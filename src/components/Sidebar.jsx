// import React from "react";

// const Sidebar = ({ componentMap, openFile, activeTab }) => {
//   return (
//     <div className="w-64 bg-[#1e2125] p-3 border-r border-[#30363d] flex flex-col justify-between text-sm">
//       {/* Explorer Section */}
//       <div className="space-y-2">
//         <div className="font-semibold text-[#c9d1d9] tracking-wide">EXPLORER</div>

//         <ul className="space-y-1">
//           {Object.keys(componentMap)
//           .map((file) => (
            
//             <li
//               key={file}
//               onClick={() => openFile(file)}
//               className={`px-2 py-1 rounded cursor-pointer transition-colors duration-150 ${
//                 activeTab === file
//                   ? "bg-[#444] text-white"
//                   : "hover:bg-[#30363d] text-[#8b949e]"
//               }`}
//             >
//               📄 {file}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Bottom Outline/Timeline */}
//       <div className="text-xs text-[#8b949e] border-t border-[#30363d] pt-2 mt-2">
//         <div className="mb-1 font-semibold text-[#c9d1d9]">OUTLINE</div>
//         <hr className="border-[#2d3136]" />
//         <div className="mb-1 mt-2 font-semibold text-[#c9d1d9]">TIMELINE</div>
//         <hr className="border-[#30363d]" />
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React from "react";

const Sidebar = ({ componentMap, openFile, activeTab }) => {
  return (
    <div className="w-64 bg-base-200 p-3 border-r border-base-300 flex flex-col justify-between text-sm text-base-content">
      {/* Explorer Section */}
      <div className="space-y-2">
        <div className="font-semibold text-base-content tracking-wide">EXPLORER</div>

        <ul className="space-y-1">
          {Object.keys(componentMap).map((file) => (
            <li
              key={file}
              onClick={() => openFile(file)}
              className={`px-2 py-1 rounded cursor-pointer transition-colors duration-150 ${
                activeTab === file
                  ? "bg-primary text-primary-content"
                  : "hover:bg-base-300 text-base-content/70"
              }`}
            >
              📄 {file}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Outline/Timeline */}
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

// import React from "react";

// const TabBar = ({ openTabs, activeTab, setActiveTab, closeTab }) => {
//   return (
//     <div className="flex bg-[#1f1f20] border-b border-gray-700 text-sm">
//       {openTabs.map((file) => (
//         <div
//           key={file}
//           className={`flex items-center px-3 py-1 cursor-pointer border-r border-gray-700 ${
//             activeTab === file ?   "bg-[#2d2d2d]":"bg-[#1e1e1e]"
//           }`}
//           onClick={() => setActiveTab(file)}
//         >
//           <span className="mr-2">{file}</span>
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               closeTab(file);
//             }}
//             className="hover:text-red-400 text-gray-400"
//           >
//             X
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TabBar;



import React from "react";

const TabBar = ({ openTabs, activeTab, setActiveTab, closeTab }) => {
  return (
    <div className="flex bg-base-200 border-b border-base-300 text-sm text-base-content">
      {openTabs.map((file) => (
        <div
          key={file}
          className={`flex items-center px-3 py-1 cursor-pointer border-r border-base-300 transition-colors duration-150 ${
            activeTab === file ? "bg-base-100" : "bg-base-300"
          }`}
          onClick={() => setActiveTab(file)}
        >
          <span className="mr-2">{file}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeTab(file);
            }}
            className="hover:text-error text-base-content/60"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default TabBar;



// import React from "react";

// const TopBar = () => {
//   return (
//     <div>
//       <div className="flex items-center px-4 py-2 bg-base-300 text-base-content text-sm shadow-sm">
//         {/* Menu */}
//         <div className="flex space-x-4 shrink-0">
//           <span className="hover:text-primary cursor-pointer">File</span>
//           <span className="hover:text-primary cursor-pointer">Edit</span>
//           <span className="hover:text-primary cursor-pointer">Selection</span>
//           <span className="hover:text-primary cursor-pointer">View</span>
//           <span className="hover:text-primary cursor-pointer">Go</span>
//           <span className="hover:text-primary cursor-pointer">Run</span>
//           <span className="hover:text-primary cursor-pointer">Terminal</span>
//           <span className="hover:text-primary cursor-pointer">Help</span>
//         </div>

//         {/* Center Group */}
//         <div className="flex flex-1 justify-center items-center space-x-3">
//           <button className="hover:text-info text-base-content/70">&larr;</button>
//           <button className="hover:text-info text-base-content/70">&rarr;</button>

//           <div className="bg-base-200 px-2 py-1 rounded-md text-xs w-60">
//             <input
//               type="text"
//               placeholder="Search (Ctrl+P)"
//               className="w-full bg-transparent outline-none text-base-content placeholder-base-content/50"
//             />
//           </div>
//         </div>

//         {/* Optional Right Spacer */}
//         <div className="w-[200px]" />
//       </div>

//       {/* Horizontal Divider */}
//       <hr className="border-t border-base-content/20" />
//     </div>
//   );
// };

// export default TopBar;

import React from "react";
import { Menu, X } from 'lucide-react';

const TopBar = ({ toggleSidebar }) => {
  return (
    <div>
      <div className="flex items-center px-4 py-2 bg-base-300 text-base-content text-sm shadow-sm overflow-x-auto">
        <button 
          className="mr-3 lg:hidden text-base-content hover:text-primary"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>
        
        <div className="flex space-x-4 shrink-0">
          <span className="hover:text-primary cursor-pointer">File</span>
          <span className="hover:text-primary cursor-pointer">Edit</span>
          <span className="hover:text-primary cursor-pointer">Selection</span>
          <span className="hover:text-primary cursor-pointer">View</span>
          <span className="hover:text-primary cursor-pointer hidden md:inline">Go</span>
          <span className="hover:text-primary cursor-pointer hidden md:inline">Run</span>
          <span className="hover:text-primary cursor-pointer hidden lg:inline">Terminal</span>
          <span className="hover:text-primary cursor-pointer hidden lg:inline">Help</span>
        </div>

        <div className="flex flex-1 justify-center items-center space-x-3 min-w-max mx-2">
          <button className="hover:text-info text-base-content/70">&larr;</button>
          <button className="hover:text-info text-base-content/70">&rarr;</button>

          <div className="bg-base-200 px-2 py-1 rounded-md text-xs md:w-60">
            <input
              type="text"
              placeholder="Search (Ctrl+P)"
              className="w-full bg-transparent outline-none text-base-content placeholder-base-content/50"
            />
          </div>
        </div>
      </div>
      <hr className="border-t border-base-content/20" />
    </div>
  );
};

export default TopBar;
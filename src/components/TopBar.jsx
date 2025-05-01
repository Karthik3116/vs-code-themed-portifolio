import React from "react";

const TopBar = () => {
  return (
    <div className="flex items-center px-4 py-2 bg-[#333] text-sm space-x-4">
      <span>File</span>
      <span>Edit</span>
      <span>Selection</span>
      <span>View</span>
      <span>Go</span>
      <span>Run</span>
      <span>Terminal</span>
      <span>Help</span>

      <div className="ml-auto flex items-center space-x-2">
        <button className="hover:text-gray-400">&larr;</button>
        <button className="hover:text-gray-400">&rarr;</button>
      </div>

      <div className="ml-4 bg-[#252526] px-2 py-1 rounded-md text-xs w-60">
        <input
          type="text"
          placeholder="Search (Ctrl+P)"
          className="w-full bg-transparent outline-none text-white placeholder-gray-400"
        />
      </div>
    </div>
  );
};

export default TopBar;

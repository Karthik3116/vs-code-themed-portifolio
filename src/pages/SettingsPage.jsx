// import React from 'react';

// const SettingsPage = () => {
//   return (
//     <div className="flex justify-center items-center h-full  text-white">
//       <div className="text-center">
//         <h1 className="text-3xl font-semibold mb-4">Settings</h1>
//         <p className="text-lg">Here you can adjust your app settings.</p>
//         {/* Add more settings elements here as needed */}
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;


import React, { useEffect, useState } from "react";

const themes = [
  "vscode",
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
  "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
  "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
  "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
  "night", "coffee", "winter", "dim", "nord", "sunset"
];

const SettingsPage = () => {
  const [selectedTheme, setSelectedTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setSelectedTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <div className="flex flex-col items-center p-6 text-white overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <p className="mb-4">Select a theme from DaisyUI:</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {themes.map((theme) => (
          <div
            key={theme}
            data-theme={theme}
            onClick={() => handleThemeSelect(theme)}
            className={`cursor-pointer rounded-lg p-4 border-2 text-center transition-all duration-200 ${
              selectedTheme === theme ? "border-primary" : "border-transparent"
            }`}
          >
            <div className="font-bold capitalize">{theme}</div>
            <div className="grid grid-cols-5 gap-1 mt-2">
              <div className="bg-primary w-4 h-4 rounded" />
              <div className="bg-secondary w-4 h-4 rounded" />
              <div className="bg-accent w-4 h-4 rounded" />
              <div className="bg-neutral w-4 h-4 rounded" />
              <div className="bg-base-300 w-4 h-4 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;

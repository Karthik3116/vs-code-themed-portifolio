// import React, { useEffect, useState } from "react";

// const themes = [
//   "vscode",
//   "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
//   "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
//   "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
//   "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
//   "night", "coffee", "winter", "dim", "nord", "sunset"
// ];

// const SettingsPage = () => {
//   const [selectedTheme, setSelectedTheme] = useState("dark");

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") || "dark";
//     setSelectedTheme(savedTheme);
//     document.documentElement.setAttribute("data-theme", savedTheme);
//   }, []);

//   const handleThemeSelect = (theme) => {
//     setSelectedTheme(theme);
//     localStorage.setItem("theme", theme);
//     document.documentElement.setAttribute("data-theme", theme);
//   };

//   return (
//     <div className="flex flex-col items-center p-6 text-white overflow-y-auto">
//       <h1 className="text-3xl font-bold mb-6">Settings</h1>
//       <p className="mb-4">Select a theme from DaisyUI:</p>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
//         {themes.map((theme) => (
//           <div
//             key={theme}
//             data-theme={theme}
//             onClick={() => handleThemeSelect(theme)}
//             className={`cursor-pointer rounded-lg p-4 border-2 text-center transition-all duration-200 ${
//               selectedTheme === theme ? "border-primary" : "border-transparent"
//             }`}
//           >
//             <div className="font-bold capitalize">{theme}</div>
//             <div className="grid grid-cols-5 gap-1 mt-2">
//               <div className="bg-primary w-4 h-4 rounded" />
//               <div className="bg-secondary w-4 h-4 rounded" />
//               <div className="bg-accent w-4 h-4 rounded" />
//               <div className="bg-neutral w-4 h-4 rounded" />
//               <div className="bg-base-300 w-4 h-4 rounded" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;
// import React, { useEffect, useState } from "react";

// const themes = [
//   "vscode",
//   "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
//   "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
//   "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
//   "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
//   "night", "coffee", "winter", "dim", "nord", "sunset"
// ];

// const SettingsPage = () => {
//   const [selectedTheme, setSelectedTheme] = useState("dark");
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") || "dark";
//     setSelectedTheme(savedTheme);
//     document.documentElement.setAttribute("data-theme", savedTheme);
//   }, []);

//   const handleThemeSelect = (theme) => {
//     setSelectedTheme(theme);
//     localStorage.setItem("theme", theme);
//     document.documentElement.setAttribute("data-theme", theme);
//   };

//   const filteredThemes = themes.filter(theme => 
//     theme.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col items-center p-4 sm:p-6 text-base-content overflow-y-auto"
//       style={{ minHeight: "calc(100vh - 8rem)" }}
//     >
//       <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Theme Settings</h1>
      
//       <div className="w-full max-w-2xl mb-5">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search themes..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="input input-bordered w-full pl-10"
//           />
//           <svg 
//             className="absolute left-3 top-3 w-4 h-4 text-base-content/50" 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
//           </svg>
//         </div>
//       </div>
      
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
//         {filteredThemes.map((theme) => (
//           <div
//             key={theme}
//             data-theme={theme}
//             onClick={() => handleThemeSelect(theme)}
//             className={`cursor-pointer rounded-lg p-3 border-2 text-center transition-all duration-200 ${
//               selectedTheme === theme 
//                 ? "border-primary ring-2 ring-primary/30" 
//                 : "border-base-300"
//             }`}
//           >
//             <div className="font-bold capitalize text-sm sm:text-base mb-2">
//               {theme}
//             </div>
//             <div className="flex justify-center gap-1">
//               <div className="bg-primary w-5 h-5 rounded-sm" />
//               <div className="bg-secondary w-5 h-5 rounded-sm" />
//               <div className="bg-accent w-5 h-5 rounded-sm" />
//               <div className="bg-neutral w-5 h-5 rounded-sm" />
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {filteredThemes.length === 0 && (
//         <div className="text-center py-10 text-base-content/70">
//           No themes found matching "{searchTerm}"
//         </div>
//       )}
//     </div>
//   );
// };

// export default SettingsPage;
// import React, { useEffect, useState } from "react";
// import { Search, Check } from "lucide-react";

// const themes = [
//   "vscode",
//   "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
//   "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
//   "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
//   "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
//   "night", "coffee", "winter", "dim", "nord", "sunset"
// ];

// const SettingsPage = () => {
//   const [selectedTheme, setSelectedTheme] = useState("dark");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") || "dark";
//     setSelectedTheme(savedTheme);
//     document.documentElement.setAttribute("data-theme", savedTheme);
//     setIsLoading(false);
//   }, []);

//   const handleThemeSelect = (theme) => {
//     setIsLoading(true);
//     setSelectedTheme(theme);
//     localStorage.setItem("theme", theme);
//     document.documentElement.setAttribute("data-theme", theme);
    
//     // Small delay to show loading state
//     setTimeout(() => setIsLoading(false), 300);
//   };

//   const filteredThemes = themes.filter(theme => 
//     theme.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col items-center p-4 sm:p-6 text-base-content overflow-y-auto"
//       style={{ minHeight: "calc(100vh - 8rem)" }}
//     >
//       <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Theme Settings</h1>
      
//       <div className="w-full max-w-2xl mb-5">
//         <div className="relative">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="h-4 w-4 text-base-content/50" />
//           </div>
//           <input
//             type="text"
//             placeholder="Search themes..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="input input-bordered w-full pl-10 pr-4"
//           />
//           {searchTerm && (
//             <button
//               onClick={() => setSearchTerm("")}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center"
//             >
//               <svg
//                 className="h-4 w-4 text-base-content/50 hover:text-base-content"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           )}
//         </div>
//       </div>
      
//       {isLoading ? (
//         <div className="flex justify-center items-center py-20">
//           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 w-full max-w-6xl">
//           {filteredThemes.map((theme) => (
//             <div
//               key={theme}
//               data-theme={theme}
//               onClick={() => handleThemeSelect(theme)}
//               className={`relative cursor-pointer rounded-lg p-3 border-2 text-center transition-all duration-200 hover:scale-[1.02] ${
//                 selectedTheme === theme 
//                   ? "border-primary ring-2 ring-primary/30 shadow-lg" 
//                   : "border-base-200 hover:border-base-300"
//               }`}
//             >
//               {selectedTheme === theme && (
//                 <div className="absolute -top-2 -right-2 bg-primary text-primary-content rounded-full p-1">
//                   <Check className="h-3 w-3" />
//                 </div>
//               )}
//               <div className="font-bold capitalize text-sm sm:text-base mb-2">
//                 {theme}
//               </div>
//               <div className="flex justify-center gap-1">
//                 <div className="bg-primary w-5 h-5 rounded-sm" />
//                 <div className="bg-secondary w-5 h-5 rounded-sm" />
//                 <div className="bg-accent w-5 h-5 rounded-sm" />
//                 <div className="bg-neutral w-5 h-5 rounded-sm" />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
      
//       {filteredThemes.length === 0 && !isLoading && (
//         <div className="text-center py-10 text-base-content/70">
//           No themes found matching "{searchTerm}"
//         </div>
//       )}
//     </div>
//   );
// };

// export default SettingsPage;
import React, { useState, useEffect } from "react";
import { Search, Check } from "lucide-react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setSelectedTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
    setIsLoading(false);
  }, []);

  const handleThemeSelect = (theme) => {
    setIsLoading(true);
    setSelectedTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    setTimeout(() => setIsLoading(false), 300);
  };

  const filtered = themes.filter(t =>
    t.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-base-100 text-base-content">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Theme Settings</h1>

        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-base-content/50" />
            </div>
            <input
              type="text"
              placeholder="Search themes..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10 pr-4"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-4 w-4 text-base-content/50 hover:text-base-content"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map(theme => (
              <div
                key={theme}
                data-theme={theme}
                onClick={() => handleThemeSelect(theme)}
                className={`relative cursor-pointer rounded-lg p-4 border-2 transition transform hover:scale-105
                  ${selectedTheme === theme
                    ? 'border-primary ring-2 ring-primary/30 shadow-lg'
                    : 'border-base-200 hover:border-base-300'}
                `}
              >
                {selectedTheme === theme && (
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-content rounded-full p-1">
                    <Check className="h-3 w-3" />
                  </div>
                )}
                <div className="font-semibold capitalize text-center mb-3 text-sm">
                  {theme}
                </div>
                <div className="flex justify-center gap-2">
                  <span className="w-5 h-5 bg-primary rounded-sm"></span>
                  <span className="w-5 h-5 bg-secondary rounded-sm"></span>
                  <span className="w-5 h-5 bg-accent rounded-sm"></span>
                  <span className="w-5 h-5 bg-neutral rounded-sm"></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length === 0 && !isLoading && (
          <div className="text-center py-10 text-base-content/70">
            No themes found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;

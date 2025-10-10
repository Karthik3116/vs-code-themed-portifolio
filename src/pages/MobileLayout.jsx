// import React, { useState } from 'react';
// import Home from './Home';
// import About from './About';
// import Projects from './Projects';
// import Contact from './Contact';
// import SettingsPage from './SettingsPage';
// import Profiles from './Profiles';

// import { 
//   LayoutDashboard, User, Folder, Mail, BarChart2, Settings 
// } from 'lucide-react';

// const MobileLayout = () => {
//   const [activePage, setActivePage] = useState('home');
  
//   const pages = {
//     home: <Home />,
//     about: <About />,
//     projects: <Projects />,
//     contact: <Contact />,
//     profiles: <Profiles />,
//     settings: <SettingsPage />
//   };

//   return (
//     <div className="flex flex-col h-screen bg-base-100">
//       {/* Header */}
//       <header className="bg-base-300 p-4 flex justify-between items-center">
//         <h1 className="text-xl font-bold text-primary">Kartheek's Portfolio</h1>
//       </header>
      
//       {/* Main Content */}
//       <main className="flex-1 overflow-y-auto p-4">
//         {pages[activePage]}
//       </main>
      
//       {/* Mobile Navigation */}
//       <nav className="bg-base-300 border-t border-base-200">
//         <div className="grid grid-cols-6 gap-1 p-1">
//           {[
//             { id: 'home', icon: <LayoutDashboard size={20} />, label: 'Home' },
//             { id: 'about', icon: <User size={20} />, label: 'About' },
//             { id: 'projects', icon: <Folder size={20} />, label: 'Projects' },
//             { id: 'profiles', icon: <BarChart2 size={20} />, label: 'Stats' },
//             { id: 'contact', icon: <Mail size={20} />, label: 'Contact' },
//             { id: 'settings', icon: <Settings size={20} />, label: 'Settings' }
//           ].map((item) => (
//             <button
//               key={item.id}
//               onClick={() => setActivePage(item.id)}
//               className={`flex flex-col items-center justify-center p-2 rounded-lg ${
//                 activePage === item.id 
//                   ? 'bg-primary text-primary-content' 
//                   : 'text-base-content hover:bg-base-200'
//               }`}
//             >
//               {item.icon}
//               <span className="text-xs mt-1">{item.label}</span>
//             </button>
//           ))}
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default MobileLayout;

import React, { useState } from "react";
import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import SettingsPage from "./SettingsPage";
import Profiles from "./Profiles";

import { LayoutDashboard, User, Folder, Mail, BarChart2, Settings } from "lucide-react";

const MobileLayout = () => {
  const [activePage, setActivePage] = useState("home");

  const pages = {
    home: <Home />,
    about: <About />,
    projects: <Projects />,
    contact: <Contact />,
    profiles: <Profiles />,
    settings: <SettingsPage />,
  };

  // navHeight used for main's bottom padding to avoid overlap.
  // Keep in sync with the nav's height (here we use 72px / pb-18).
  return (
    <div className="flex flex-col h-screen bg-base-100">
      {/* Header */}
      <header className="bg-base-300 p-4 flex justify-between items-center shadow-sm z-10">
        <h1 className="text-xl font-bold text-primary">Kartheek&apos;s Portfolio</h1>
      </header>

      {/* Main Content
          - `overflow-y-auto` keeps content scrollable
          - `pb-20` reserves space for the fixed bottom nav (make larger if your nav is taller)
          - also include safe-area inset so it sits above iPhone home indicator
      */}
      <main
        className="flex-1 overflow-y-auto p-4 pb-20"
        style={{ paddingBottom: "calc(5rem + env(safe-area-inset-bottom))" }} /* 5rem ~= 80px, matches nav height below */
      >
        {pages[activePage]}
      </main>

      {/* Mobile Navigation — fixed at bottom so it is always visible */}
      <nav
        className="fixed bottom-0 left-0 right-0 bg-base-300 border-t border-base-200 z-20"
        aria-label="Primary"
        style={{
          // Keep explicit height so main's padding matches. You can adjust as needed.
          height: 64,
          // Ensure mobile safe area is honored
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="grid grid-cols-6 gap-1 p-1 h-full items-center">
          {[
            { id: "home", icon: <LayoutDashboard size={20} />, label: "Home" },
            { id: "about", icon: <User size={20} />, label: "About" },
            { id: "projects", icon: <Folder size={20} />, label: "Projects" },
            { id: "profiles", icon: <BarChart2 size={20} />, label: "Stats" },
            { id: "contact", icon: <Mail size={20} />, label: "Contact" },
            { id: "settings", icon: <Settings size={20} />, label: "Settings" },
          ].map((item) => {
            const active = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center justify-center p-2 rounded-lg mx-1 ${
                  active ? "bg-primary text-primary-content" : "text-base-content hover:bg-base-200"
                }`}
                style={{ minHeight: 48 }} // keep tappable area
              >
                {item.icon}
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;

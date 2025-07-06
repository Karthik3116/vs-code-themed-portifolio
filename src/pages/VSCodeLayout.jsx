

// // import React, { useState } from "react";
// // import Home from "./Home";
// // import About from "./About";
// // import Projects from "./Projects";
// // import Contact from "./Contact";
// // import SettingsPage from "./SettingsPage"; // ✅ Import SettingsPage
// // import Profiles from "./Profiles";

// // import TopBar from "../components/TopBar";
// // import Sidebar from "../components/Sidebar";
// // import TabBar from "../components/TabBar";
// // import NoFile from "../components/NoFile";
// // import LeftActivityBar from "../components/LeftActivityBar"; // ✅ Import

// // const componentMap = {
// //   "Home.jsx": <Home />,
// //   "About.txt": <About />,
// //   "Projects.zip": <Projects />,
// //   "Contact.info": <Contact />,
// //   "Settings": <SettingsPage />, // ✅ Add to component map
  
// // };

// // const VSCodeLayout = () => {
// //   const [openTabs, setOpenTabs] = useState(["Home.jsx"]);
// //   const [activeTab, setActiveTab] = useState("Home.jsx");

// //   const openFile = (file) => {
// //     if (!openTabs.includes(file)) {
// //       setOpenTabs([...openTabs, file]);
// //     }
// //     setActiveTab(file);
// //   };

// //   const closeTab = (fileName) => {
// //     const newTabs = openTabs.filter((f) => f !== fileName);
// //     setOpenTabs(newTabs);
// //     if (fileName === activeTab && newTabs.length > 0) {
// //       setActiveTab(newTabs[newTabs.length - 1]);
// //     } else if (newTabs.length === 0) {
// //       setActiveTab(null);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col h-screen bg-[#1e1e1e] text-white font-mono">
// //       <TopBar />
// //       <div className="flex flex-1">
// //         <LeftActivityBar setActivePage={setActiveTab} /> {/* ✅ Pass setActiveTab */}
// //         <Sidebar
// //           componentMap={componentMap}
// //           openFile={openFile}
// //           activeTab={activeTab}
// //         />
// //         <div className="flex-1 flex flex-col bg-base-100">
// //           <TabBar
// //             openTabs={openTabs}
// //             activeTab={activeTab}
// //             setActiveTab={setActiveTab}
// //             closeTab={closeTab}
// //           />
// //           <div className="flex-1 p-4">
// //             {activeTab ? componentMap[activeTab] : <NoFile />}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default VSCodeLayout;

// import React, { useState } from "react";
// import Home from './Home';
// import About from './About';
// import Projects from './Projects';
// import Contact from './Contact';
// import SettingsPage from './SettingsPage';
// import Profiles from './Profiles';

// import TopBar from "../components/TopBar";
// import Sidebar from "../components/Sidebar";
// import TabBar from "../components/TabBar";
// import NoFile from "../components/NoFile";
// import LeftActivityBar from "../components/LeftActivityBar";

// const componentMap = {
//   "Home.jsx": <Home />,
//   "About.txt": <About />,
//   "Projects.zip": <Projects />,
//   "Contact.info": <Contact />,
//   "Profiles.json": <Profiles />,
//   "Settings.config": <SettingsPage />
// };

// const VSCodeLayout = () => {
//   const [openTabs, setOpenTabs] = useState(["Home.jsx"]);
//   const [activeTab, setActiveTab] = useState("Home.jsx");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const openFile = (file) => {
//     if (!openTabs.includes(file)) {
//       setOpenTabs([...openTabs, file]);
//     }
//     setActiveTab(file);
//   };

//   const closeTab = (fileName) => {
//     const newTabs = openTabs.filter((f) => f !== fileName);
//     setOpenTabs(newTabs);
//     if (fileName === activeTab && newTabs.length > 0) {
//       setActiveTab(newTabs[newTabs.length - 1]);
//     } else if (newTabs.length === 0) {
//       setActiveTab(null);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-[#1e1e1e] text-white font-mono">
//       <TopBar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
//       <div className="flex flex-1 min-w-0">
//         <LeftActivityBar setActivePage={setActiveTab} />
        
//         {sidebarOpen && (
//           <Sidebar
//             componentMap={componentMap}
//             openFile={openFile}
//             activeTab={activeTab}
//             closeSidebar={() => setSidebarOpen(false)}
//           />
//         )}
        
//         <div className="flex-1 flex flex-col min-w-0">
//           <TabBar
//             openTabs={openTabs}
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//             closeTab={closeTab}
//           />
//           <div className="flex-1 p-4 overflow-auto">
//             {activeTab ? componentMap[activeTab] : <NoFile />}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VSCodeLayout;

import React, { useState, useEffect } from "react";
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import SettingsPage from './SettingsPage';
import Profiles from './Profiles';
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import TabBar from "../components/TabBar";
import NoFile from "../components/NoFile";
import LeftActivityBar from "../components/LeftActivityBar";

const componentMap = {
  "Home.jsx": <Home />,
  "About.txt": <About />,
  "Projects.zip": <Projects />,
  "Contact.info": <Contact />,
  "Profiles.json": <Profiles />,
  "Settings.config": <SettingsPage />
};

const VSCodeLayout = () => {
  const [openTabs, setOpenTabs] = useState(["Home.jsx"]);
  const [activeTab, setActiveTab] = useState("Home.jsx");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [themeClass, setThemeClass] = useState("theme-vscode");

  useEffect(() => {
    // Set initial theme class based on data-theme attribute
    const updateThemeClass = () => {
      const theme = document.documentElement.getAttribute("data-theme") || "vscode";
      setThemeClass(`theme-${theme}`);
    };

    updateThemeClass();

    // Watch for theme changes
    const observer = new MutationObserver(updateThemeClass);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  const openFile = (file) => {
    if (!openTabs.includes(file)) {
      setOpenTabs([...openTabs, file]);
    }
    setActiveTab(file);
  };

  const closeTab = (fileName) => {
    const newTabs = openTabs.filter((f) => f !== fileName);
    setOpenTabs(newTabs);
    if (fileName === activeTab && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1]);
    } else if (newTabs.length === 0) {
      setActiveTab(null);
    }
  };

  // Theme-specific background colors
  const getBackgroundColor = () => {
    switch (document.documentElement.getAttribute("data-theme")) {
      case "light":
        return "bg-gray-100";
      case "dark":
        return "bg-gray-900";
      case "vscode":
      default:
        return "bg-[#1e1e1e]";
    }
  };

  return (
    <div className={`flex flex-col h-screen ${getBackgroundColor()} text-base-content font-mono ${themeClass}`}>
      <TopBar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 min-w-0">
        <LeftActivityBar setActivePage={setActiveTab} />
        
        {sidebarOpen && (
          <Sidebar
            componentMap={componentMap}
            openFile={openFile}
            activeTab={activeTab}
            closeSidebar={() => setSidebarOpen(false)}
          />
        )}
        
        <div className="flex-1 flex flex-col min-w-0">
          <TabBar
            openTabs={openTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            closeTab={closeTab}
          />
          <div className="flex-1 p-4 overflow-auto">
            {activeTab ? componentMap[activeTab] : <NoFile />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSCodeLayout;
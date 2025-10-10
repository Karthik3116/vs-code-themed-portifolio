

// import React, { useState, useEffect } from "react";
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

// // Mapping file names to their respective components
// const componentMap = {
//   "Home.jsx": <Home />,
//   "About.txt": <About />,
//   "Projects.zip": <Projects />,
//   "Contact.info": <Contact />,
//   "Profiles.json": <Profiles />,
//   "Settings.config": <SettingsPage />
// };

// // A simple placeholder for the bottom status bar
// const StatusBar = () => (
//   <div className="bg-editor-header text-sm px-4 py-1 flex items-center justify-between border-t border-border-color">
//     <div>main</div>
//     <div className="flex items-center gap-4">
//       <span>Ln 1, Col 1</span>
//       <span>Spaces: 2</span>
//       <span>UTF-8</span>
//       <span>CRLF</span>
//       <span>&#123; &#125; JavaScript</span>
//     </div>
//   </div>
// );


// const VSCodeLayout = () => {
//   // State management for UI
//   const [openTabs, setOpenTabs] = useState(["Home.jsx"]);
//   const [activeTab, setActiveTab] = useState("Home.jsx");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
  
//   // State for theme-specific classes to ensure components re-render on theme change
//   const [themeClasses, setThemeClasses] = useState({
//     bg: 'bg-vscode-bg',
//     text: 'text-vscode-text',
//     border: 'border-vscode-border'
//   });

//   // Effect to listen for theme changes on the root <html> element
//   useEffect(() => {
//     const updateTheme = () => {
//       const theme = document.documentElement.getAttribute("data-theme") || "vscode";
//       switch (theme) {
//         case "light":
//           setThemeClasses({ bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' });
//           break;
//         case "dark":
//           setThemeClasses({ bg: 'bg-gray-900', text: 'text-gray-200', border: 'border-gray-700' });
//           break;
//         case "vscode":
//         default:
//           setThemeClasses({ bg: 'bg-[#1e1e1e]', text: 'text-gray-300', border: 'border-[#333333]' });
//           break;
//       }
//     };

//     updateTheme(); // Set initial theme

//     // Use a MutationObserver to detect when the data-theme attribute changes
//     const observer = new MutationObserver(updateTheme);
//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ['data-theme']
//     });

//     // Cleanup observer on component unmount
//     return () => observer.disconnect();
//   }, []);

//   // --- File and Tab Management Functions ---
  
//   /**
//    * Opens a file in a new tab if it's not already open, and sets it as the active tab.
//    * @param {string} file - The name of the file to open.
//    */
//   const openFile = (file) => {
//     if (!openTabs.includes(file)) {
//       setOpenTabs([...openTabs, file]);
//     }
//     setActiveTab(file);
//   };

//   /**
//    * Closes a specific tab. If the closed tab was active, it makes the last tab active.
//    * @param {string} fileName - The name of the file/tab to close.
//    */
//   const closeTab = (fileName) => {
//     const newTabs = openTabs.filter((tab) => tab !== fileName);
//     setOpenTabs(newTabs);

//     // If the closed tab was the active one, update the active tab
//     if (activeTab === fileName) {
//       if (newTabs.length > 0) {
//         setActiveTab(newTabs[newTabs.length - 1]);
//       } else {
//         setActiveTab(null); // No tabs left
//       }
//     }
//   };

//   return (
//     <div className={`flex flex-col h-screen font-mono ${themeClasses.bg} ${themeClasses.text}`}>
      
//       {/* Top Bar / Menu Bar */}
//       <TopBar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

//       {/* Main Content Area (below TopBar, above StatusBar) */}
//       <div className="flex flex-1 overflow-hidden">
        
//         {/* Far-left Activity Bar */}
//         <LeftActivityBar setActivePage={setActiveTab} />
        
//         {/* Explorer Sidebar */}
//         {sidebarOpen && (
//           <Sidebar
//             componentMap={componentMap}
//             openFile={openFile}
//             activeTab={activeTab}
//             closeSidebar={() => setSidebarOpen(false)}
//           />
//         )}
        
//         {/* Editor and Tabs Pane */}
//         <main className="flex-1 flex flex-col min-w-0">
          
//           {/* Tab Bar for open files */}
//           <TabBar
//             openTabs={openTabs}
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//             closeTab={closeTab}
//           />
          
//           {/* Content of the active file */}
//           <div className="flex-1 p-4 overflow-auto bg-editor-bg">
//             {activeTab ? componentMap[activeTab] : <NoFile />}
//           </div>
//         </main>
//       </div>

//       {/* Bottom Status Bar */}
//       <StatusBar />
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
import StatusBar from "../components/StatusBar";

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

  // Close sidebar on smaller screens by default
  useEffect(() => {
      if (window.innerWidth < 1024) {
          setSidebarOpen(false);
      }
  }, []);
  
  const openFile = (file) => {
    if (!openTabs.includes(file)) {
      setOpenTabs([...openTabs, file]);
    }
    setActiveTab(file);
  };

  const closeTab = (fileName) => {
    const newTabs = openTabs.filter((tab) => tab !== fileName);
    setOpenTabs(newTabs);
    if (activeTab === fileName) {
      setActiveTab(newTabs.length > 0 ? newTabs[newTabs.length - 1] : null);
    }
  };
  
  const handlePageChange = (page) => {
    if (!sidebarOpen) {
        setSidebarOpen(true);
    }
    openFile(page);
  }

  return (
    <div className="flex flex-col h-screen font-mono bg-base-100 text-base-content overflow-hidden">
      <TopBar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 min-h-0"> {/* min-h-0 is crucial for flexbox overflow */}
        <LeftActivityBar setActivePage={handlePageChange} />
        
        {sidebarOpen && (
          <Sidebar
            componentMap={componentMap}
            openFile={openFile}
            activeTab={activeTab}
            closeSidebar={() => setSidebarOpen(false)}
          />
        )}
        
        <main className="flex flex-col flex-1 min-w-0"> {/* min-w-0 is also crucial */}
          <TabBar
            openTabs={openTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            closeTab={closeTab}
          />
          <div className="flex-1 overflow-y-auto bg-base-100">
            {activeTab ? componentMap[activeTab] : <NoFile />}
          </div>
        </main>
      </div>

      <StatusBar />
    </div>
  );
};

export default VSCodeLayout;
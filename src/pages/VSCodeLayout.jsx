
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
  "Profiles.json": <Profiles />,
  "Contact.info": <Contact />,
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
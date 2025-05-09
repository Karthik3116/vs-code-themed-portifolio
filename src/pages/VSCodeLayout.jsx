

import React, { useState } from "react";
import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import SettingsPage from "./SettingsPage"; // ✅ Import SettingsPage

import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import TabBar from "../components/TabBar";
import NoFile from "../components/NoFile";
import LeftActivityBar from "../components/LeftActivityBar"; // ✅ Import

const componentMap = {
  "Home.jsx": <Home />,
  "About.txt": <About />,
  "Projects.zip": <Projects />,
  "Contact.info": <Contact />,
  "Settings": <SettingsPage />, // ✅ Add to component map
};

const VSCodeLayout = () => {
  const [openTabs, setOpenTabs] = useState(["Home.jsx"]);
  const [activeTab, setActiveTab] = useState("Home.jsx");

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

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-white font-mono">
      <TopBar />
      <div className="flex flex-1">
        <LeftActivityBar setActivePage={setActiveTab} /> {/* ✅ Pass setActiveTab */}
        <Sidebar
          componentMap={componentMap}
          openFile={openFile}
          activeTab={activeTab}
        />
        <div className="flex-1 flex flex-col bg-base-100">
          <TabBar
            openTabs={openTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            closeTab={closeTab}
          />
          <div className="flex-1 p-4">
            {activeTab ? componentMap[activeTab] : <NoFile />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSCodeLayout;

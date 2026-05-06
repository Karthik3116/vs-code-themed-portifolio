import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import SettingsPage from './SettingsPage';
import Profiles from './Profiles';
import Insights from './Insights';
import Details from './Details';
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import TabBar from "../components/TabBar";
import NoFile from "../components/NoFile";
import LeftActivityBar from "../components/LeftActivityBar";
import StatusBar from "../components/StatusBar";
import SEOHead from "../components/SEOHead";
import { routeToTab, tabToRoute } from "../utils/routeConfig";

const componentMap = {
  "Home.jsx": <Home />,
  "About.txt": <About />,
  "Projects.zip": <Projects />,
  "Profiles.json": <Profiles />,
  "Contact.info": <Contact />,
  "Settings.config": <SettingsPage />,
  "Insights.log": <Insights />,
  "Status.log": <Details />,
};

const VSCodeLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab from URL
  const currentTab = routeToTab[location.pathname] || "Home.jsx";

  const [openTabs, setOpenTabs] = useState([currentTab]);
  const [activeTab, setActiveTab] = useState(currentTab);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sync tab state when URL changes
  useEffect(() => {
    const tab = routeToTab[location.pathname];
    if (tab) {
      if (!openTabs.includes(tab)) {
        setOpenTabs((prev) => [...prev, tab]);
      }
      setActiveTab(tab);
    }
  }, [location.pathname]);

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
    // Navigate to the corresponding route
    const route = tabToRoute[file];
    if (route) {
      navigate(route);
    }
  };

  const closeTab = (fileName) => {
    const newTabs = openTabs.filter((tab) => tab !== fileName);
    setOpenTabs(newTabs);
    if (activeTab === fileName) {
      const nextTab = newTabs.length > 0 ? newTabs[newTabs.length - 1] : null;
      setActiveTab(nextTab);
      if (nextTab) {
        navigate(tabToRoute[nextTab]);
      }
    }
  };

  const switchTab = (file) => {
    setActiveTab(file);
    const route = tabToRoute[file];
    if (route) {
      navigate(route);
    }
  };

  const handlePageChange = (page) => {
    if (!sidebarOpen) {
      setSidebarOpen(true);
    }
    openFile(page);
  };

  return (
    <>
      <SEOHead tab={activeTab} />
      <div className="flex flex-col h-screen font-mono bg-base-100 text-base-content overflow-hidden">
        <TopBar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex flex-1 min-h-0">
          <LeftActivityBar setActivePage={handlePageChange} />

          {sidebarOpen && (
            <Sidebar
              componentMap={componentMap}
              openFile={openFile}
              activeTab={activeTab}
              closeSidebar={() => setSidebarOpen(false)}
            />
          )}

          <main className="flex flex-col flex-1 min-w-0">
            <TabBar
              openTabs={openTabs}
              activeTab={activeTab}
              setActiveTab={switchTab}
              closeTab={closeTab}
            />
            <div className="flex-1 overflow-y-auto bg-base-100">
              {activeTab ? componentMap[activeTab] : <NoFile />}
            </div>
          </main>
        </div>

        <StatusBar />
      </div>
    </>
  );
};

export default VSCodeLayout;

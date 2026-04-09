import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import SettingsPage from "./SettingsPage";
import Profiles from "./Profiles";
import Insights from "./Insights";
import SEOHead from "../components/SEOHead";
import { routeToTab } from "../utils/routeConfig";

import { LayoutDashboard, User, Folder, Mail, BarChart2, Settings } from "lucide-react";

const pageComponents = {
  "Home.jsx": <Home />,
  "About.txt": <About />,
  "Projects.zip": <Projects />,
  "Profiles.json": <Profiles />,
  "Contact.info": <Contact />,
  "Settings.config": <SettingsPage />,
  "Insights.log": <Insights />,
};

const navItems = [
  { route: "/home", tab: "Home.jsx", icon: <LayoutDashboard size={20} />, label: "Home" },
  { route: "/about", tab: "About.txt", icon: <User size={20} />, label: "About" },
  { route: "/projects", tab: "Projects.zip", icon: <Folder size={20} />, label: "Projects" },
  { route: "/profiles", tab: "Profiles.json", icon: <BarChart2 size={20} />, label: "Stats" },
  { route: "/contact", tab: "Contact.info", icon: <Mail size={20} />, label: "Contact" },
  { route: "/settings", tab: "Settings.config", icon: <Settings size={20} />, label: "Settings" },
];

const MobileLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = routeToTab[location.pathname] || "Home.jsx";

  return (
    <>
      <SEOHead tab={currentTab} />
      <div className="flex flex-col h-screen bg-base-100">
        <main
          className="flex-1 overflow-y-auto p-4 pb-20"
          style={{ paddingBottom: "calc(5rem + env(safe-area-inset-bottom))" }}
        >
          {pageComponents[currentTab] || <Home />}
        </main>

        <nav
          className="fixed bottom-0 left-0 right-0 bg-base-300 border-t border-base-200 z-20"
          aria-label="Primary"
          style={{
            height: 64,
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          <div className="grid grid-cols-6 gap-1 p-1 h-full items-center">
            {navItems.map((item) => {
              const active = currentTab === item.tab;
              return (
                <button
                  key={item.route}
                  onClick={() => navigate(item.route)}
                  aria-label={item.label}
                  aria-current={active ? "page" : undefined}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg mx-1 ${
                    active ? "bg-primary text-primary-content" : "text-base-content hover:bg-base-200"
                  }`}
                  style={{ minHeight: 48 }}
                >
                  {item.icon}
                  <span className="text-xs mt-1">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileLayout;

import React, { useState } from 'react';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';
import SettingsPage from './SettingsPage';
import Profiles from './Profiles';

import { 
  LayoutDashboard, User, Folder, Mail, BarChart2, Settings 
} from 'lucide-react';

const MobileLayout = () => {
  const [activePage, setActivePage] = useState('home');
  
  const pages = {
    home: <Home />,
    about: <About />,
    projects: <Projects />,
    contact: <Contact />,
    profiles: <Profiles />,
    settings: <SettingsPage />
  };

  return (
    <div className="flex flex-col h-screen bg-base-100">
      {/* Header */}
      <header className="bg-base-300 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">Kartheek's Portfolio</h1>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        {pages[activePage]}
      </main>
      
      {/* Mobile Navigation */}
      <nav className="bg-base-300 border-t border-base-200">
        <div className="grid grid-cols-6 gap-1 p-1">
          {[
            { id: 'home', icon: <LayoutDashboard size={20} />, label: 'Home' },
            { id: 'about', icon: <User size={20} />, label: 'About' },
            { id: 'projects', icon: <Folder size={20} />, label: 'Projects' },
            { id: 'profiles', icon: <BarChart2 size={20} />, label: 'Stats' },
            { id: 'contact', icon: <Mail size={20} />, label: 'Contact' },
            { id: 'settings', icon: <Settings size={20} />, label: 'Settings' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-lg ${
                activePage === item.id 
                  ? 'bg-primary text-primary-content' 
                  : 'text-base-content hover:bg-base-200'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;
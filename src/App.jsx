import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import VSCodeLayout from "./pages/VSCodeLayout";
import BottomBar from './components/BottomBar';
import MobileLayout from './pages/MobileLayout';
import NotFound from './pages/NotFound';  // <== we’ll create this

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 992);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <Router>
      <div className='flex flex-col h-screen bg-[#1e1e1e] text-white font-mono'>
        {isMobile ? (
          <MobileLayout />
        ) : (
          <>
            <Routes>
              <Route path="/" element={<VSCodeLayout />} />
              {/* You can nest child routes inside VSCodeLayout if needed */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomBar />
          </>
        )}
      </div>
    </Router>
  );
};

export default App;

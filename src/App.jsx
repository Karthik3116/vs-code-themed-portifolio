import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';

import VSCodeLayout from "./pages/VSCodeLayout";
import BottomBar from './components/BottomBar';
import MobileLayout from './pages/MobileLayout';
import NotFound from './pages/NotFound';
import { trackPageVisit } from './utils/routeConfig';

/* ─── Visit Tracker ─── */
const VisitTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageVisit(location.pathname);
  }, [location.pathname]);

  return null;
};

/* ─── App Shell (layout route) ─── */
const AppShell = ({ isMobile }) => {
  return (
    <div className='flex flex-col h-screen bg-[#1e1e1e] text-white font-mono'>
      {isMobile ? (
        <MobileLayout />
      ) : (
        <>
          <VSCodeLayout />
          <BottomBar />
        </>
      )}
      <Outlet />
    </div>
  );
};

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
    <HelmetProvider>
      <Router>
        <Analytics />
        <VisitTracker />
        <Routes>
          <Route element={<AppShell isMobile={isMobile} />}>
            <Route index element={<></>} />
            <Route path="home" element={<></>} />
            <Route path="about" element={<></>} />
            <Route path="projects" element={<></>} />
            <Route path="profiles" element={<></>} />
            <Route path="contact" element={<></>} />
            <Route path="settings" element={<></>} />
            <Route path="insights" element={<></>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;

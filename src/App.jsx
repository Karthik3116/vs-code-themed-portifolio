// import React from 'react'
// import VSCodeLayout from "./pages/VSCodeLayout"
// import BottomBar from './components/BottomBar'

// const App = () => {
//   return (
    
//     <div className='flex flex-col h-screen bg-[#1e1e1e] text-white font-mono'>
      
      
//       <VSCodeLayout/>
//       <BottomBar/>
      

      

      
//     </div>
//   )
// }

// export default App

import React, { useEffect, useState } from 'react';
import VSCodeLayout from "./pages/VSCodeLayout";
import BottomBar from './components/BottomBar';
import OpenDesktop from './pages/OpenDesktop';

const App = () => {
  const [isRealMobile, setIsRealMobile] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const isFakeDesktop = window.visualViewport?.scale && window.visualViewport.scale < 1;

      // Only treat as "mobile" if it's a real mobile device and not spoofing desktop view
      setIsRealMobile(isMobileDevice && !isFakeDesktop);
    };

    checkDeviceType(); // initial check
    window.addEventListener('resize', checkDeviceType); // recheck on resize/rotation

    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-white font-mono">
      {isRealMobile ? (
        <OpenDesktop />
      ) : (
        <>
          <VSCodeLayout />
          <BottomBar />
        </>
      )}
    </div>
  );
};

export default App;

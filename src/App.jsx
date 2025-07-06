// // import React from 'react'
// // import VSCodeLayout from "./pages/VSCodeLayout"
// // import BottomBar from './components/BottomBar'

// // const App = () => {
// //   return (
    
// //     <div className='flex flex-col h-screen bg-[#1e1e1e] text-white font-mono'>
      
      
// //       <VSCodeLayout/>
// //       <BottomBar/>
      

      

      
// //     </div>
// //   )
// // }

// // export default App

// import React, { useEffect, useState } from 'react';
// import VSCodeLayout from "./pages/VSCodeLayout";
// import BottomBar from './components/BottomBar';
// import OpenDesktop from './pages/OpenDesktop'; // Make sure this path is correct

// const App = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth <= 768); // you can adjust the breakpoint
//     };

//     checkScreenSize(); // check on mount
//     window.addEventListener('resize', checkScreenSize); // listen to resize

//     return () => window.removeEventListener('resize', checkScreenSize); // cleanup
//   }, []);

//   return (
//     <div className='flex flex-col h-screen bg-[#1e1e1e] text-white font-mono'>
//       {isMobile ? <OpenDesktop /> : (
//         <>
//           <VSCodeLayout />
//           <BottomBar />
//         </>
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState } from 'react';
import VSCodeLayout from "./pages/VSCodeLayout";
import BottomBar from './components/BottomBar';
import OpenDesktop from './pages/OpenDesktop';
import MobileLayout from './pages/MobileLayout';

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className='flex flex-col h-screen bg-[#1e1e1e] text-white font-mono'>
      {isMobile ? <MobileLayout /> : (
        <>
          <VSCodeLayout />
          <BottomBar />
        </>
      )}
    </div>
  );
};

export default App;
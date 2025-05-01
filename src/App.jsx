import React from 'react'
import VSCodeLayout from "./pages/VSCodeLayout"
import BottomBar from './components/BottomBar'
const App = () => {
  return (
    
    <div className='flex flex-col h-screen bg-[#1e1e1e] text-white font-mono'>
      
      
      <VSCodeLayout/>
      <BottomBar/>

      

      
    </div>
  )
}

export default App
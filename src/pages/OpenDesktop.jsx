// import React from "react";
// import { MonitorX } from "lucide-react";

// // Reusable Themed Button
// const Button = ({ children, className, ...props }) => {
//   return (
//     <button
//       className={`bg-primary text-primary-content px-6 py-2 rounded-lg shadow-md hover:bg-primary-focus transition duration-300 ${className}`}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };

// const OpenDesktop = () => {
//   return (
//     <div className="bg-base-100 text-base-content font-sans min-h-screen flex items-center justify-center px-4 py-12">
//       <div className="bg-base-200 border border-base-300 rounded-2xl shadow-lg max-w-xl w-full p-8 sm:p-10 text-center space-y-6">
        
//         {/* Icon */}
//         <div className="flex justify-center">
//           <MonitorX className="w-16 h-16 text-error" />
//         </div>

//         {/* Title */}
//         <h1 className="text-3xl sm:text-4xl font-bold text-error">
//           Desktop Only
//         </h1>

//         {/* Description */}
//         <p className="text-base-content/70 text-lg">
//           This app is optimized for larger screens. Please switch to a desktop or laptop for the full experience.
//         </p>

//         {/* Action Button */}
//         <Button onClick={() => window.location.reload()} className="mt-2">
//           Retry
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default OpenDesktop;

import React from "react";
import { MonitorX } from "lucide-react";
import { motion } from "framer-motion";

// Reusable Themed Button (Enhanced with Framer Motion)
const Button = ({ children, className, ...props }) => {
  return (
    <motion.button
      className={`bg-primary text-primary-content px-6 py-2 rounded-lg shadow-md hover:bg-primary-focus focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${className}`}
      whileHover={{ scale: 1.05, y: -2 }} // Subtle lift and scale on hover
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }} // Springy transition for interactions
      {...props}
    >
      {children}
    </motion.button>
  );
};

const OpenDesktop = () => {
  // Variants for the main card animation
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",       // Using a spring animation for a bouncier, more organic feel
        stiffness: 100,       // How "stiff" the spring is
        damping: 15,          // How much the spring is dampened (less oscillation)
        duration: 0.5,        // Approximate duration
        when: "beforeChildren", // Ensure card animates before its children
        staggerChildren: 0.15, // Delay between children animations
      },
    },
  };

  // Variants for child items (text, button)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 12, duration: 0.4 },
    },
  };

  // Variants for the icon's container (for initial pop-in)
  const iconContainerVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 10, delay: 0.1 }, // Slight delay for icon
    },
  };

  return (
    <div className="bg-base-100 text-base-content font-sans min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        className="bg-base-200 border border-base-300 rounded-2xl shadow-xl max-w-xl w-full p-8 sm:p-10 text-center space-y-6" // Increased shadow
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Icon */}
        <motion.div
          className="flex justify-center"
          variants={iconContainerVariants} // Animate the container of the icon
        >
          <motion.div
            // Continuous subtle animation for the icon itself after entry
            animate={{ y: [0, -4, 0, 4, 0] }} // Gentle up-down floating effect
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              repeat: Infinity,       // Repeat the animation indefinitely
            }}
          >
            <MonitorX className="w-16 h-16 sm:w-20 sm:h-20 text-error" /> {/* Slightly larger icon */}
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-error"
          variants={itemVariants}
        >
          Desktop Only
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-base-content/80 text-lg sm:text-xl" // Increased opacity & responsive text
          variants={itemVariants}
        >
          This app is optimized for larger screens. Please switch to a desktop or
          laptop for the full experience.
        </motion.p>

        {/* Action Button */}
        <motion.div variants={itemVariants} className="pt-4"> {/* Added padding-top for button spacing */}
          <Button
            onClick={() => window.location.reload()}
            className="mt-2 w-full sm:w-auto" // Full width on small screens, auto on larger
          >
            Retry on This Device
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OpenDesktop;
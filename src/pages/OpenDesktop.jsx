
import React from "react";
import { Monitor, Smartphone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const OpenDesktop = () => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 12, duration: 0.4 },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 10, delay: 0.1 },
    },
    floating: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      }
    }
  };

  return (
    <div className="bg-base-100 text-base-content font-sans min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="bg-base-200 border border-base-300 rounded-2xl shadow-xl max-w-md w-full p-6 sm:p-8 text-center space-y-6"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex justify-center"
          variants={iconVariants}
        >
          <motion.div
            variants={iconVariants}
            animate="floating"
          >
            <div className="relative">
              <Monitor className="w-16 h-16 sm:w-20 sm:h-20 text-primary mx-auto" />
              <Smartphone className="w-8 h-8 text-secondary absolute -top-2 -right-4" />
            </div>
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-2xl sm:text-3xl font-bold text-primary"
          variants={itemVariants}
        >
          Optimized for Desktop
        </motion.h1>

        <motion.p
          className="text-base-content/80 text-base sm:text-lg"
          variants={itemVariants}
        >
          For the best experience, please view this portfolio on a desktop or laptop computer.
        </motion.p>

        <motion.div 
          className="pt-4"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary flex items-center justify-center gap-2"
            >
              Try Anyway <ArrowRight size={16} />
            </button>
            <a 
              href="https://karthik.top" 
              className="btn btn-outline"
              target="_blank"
              rel="noopener"
            >
              View Mobile Version
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default OpenDesktop;
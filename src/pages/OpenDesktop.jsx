import React from "react";
import { MonitorX } from "lucide-react";

// Reusable Themed Button
const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`bg-primary text-primary-content px-6 py-2 rounded-lg shadow-md hover:bg-primary-focus transition duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const OpenDesktop = () => {
  return (
    <div className="bg-base-100 text-base-content font-sans min-h-screen flex items-center justify-center px-4 py-12">
      <div className="bg-base-200 border border-base-300 rounded-2xl shadow-lg max-w-xl w-full p-8 sm:p-10 text-center space-y-6">
        
        {/* Icon */}
        <div className="flex justify-center">
          <MonitorX className="w-16 h-16 text-error" />
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-error">
          Desktop Only
        </h1>

        {/* Description */}
        <p className="text-base-content/70 text-lg">
          This app is optimized for larger screens. Please switch to a desktop or laptop for the full experience.
        </p>

        {/* Action Button */}
        <Button onClick={() => window.location.reload()} className="mt-2">
          Retry
        </Button>
      </div>
    </div>
  );
};

export default OpenDesktop;

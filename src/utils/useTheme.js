// useTheme.js
import { useEffect } from "react";

export const useApplySavedTheme = () => {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);
};

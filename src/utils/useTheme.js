// useTheme.js
import { useEffect } from "react";

export const useApplySavedTheme = () => {
 useEffect(() => {
  const theme = localStorage.getItem("theme") || "vscode"; // Default theme is now vscode
  document.documentElement.setAttribute("data-theme", theme);
 }, []);
};
/** @type {import('tailwindcss').Config} */
const daisyui = require("daisyui");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
      {
        vscode: {
          "primary": "#007acc",        // Blue accent for interactive elements
          "secondary": "#569cd6",      // Blue for keywords, links
          "accent": "#4ec9b0",         // Teal for types, special items
          "neutral": "#333333",        // Darker elements, borders
          "base-100": "#1e1e1e",       // Main editor background
          "base-200": "#252526",       // Sidebar background
          "base-300": "#3c3c3c",       // Hover items, darker borders
          "info": "#b5cea8",           // Green for numbers/values
          "success": "#608b4e",
          "warning": "#ce9178",        // Orange for strings
          "error": "#f44747",
          "--base-content": "#cccccc", // Default text color
          "--primary-content": "#ffffff",
        },

      },
      "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
      "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
      "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
      "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
      "night", "coffee", "winter", "dim", "nord", "sunset"
    ],
  },
}
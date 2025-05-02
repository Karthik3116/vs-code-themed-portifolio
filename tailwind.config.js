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
          "primary": "#007acc",
          "secondary": "#3C3C3C",
          "accent": "#d7ba7d",
          "neutral": "#1e1e1e",
          "base-100": "#252526",
          "base-200": "#1e1e1e",
          "base-300": "#3C3C3C",
          "info": "#3794ff",
          "success": "#16825D",
          "warning": "#dcdcaa",
          "error": "#f48771",
          "--rounded-box": "0.25rem",
          "--rounded-btn": "0.25rem",
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
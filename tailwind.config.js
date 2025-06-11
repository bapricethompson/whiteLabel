/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", // Scan all JS/JSX files in src/
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF9F6",
        primaryText: "#333333",
        accent: "#D9643B", //buttons and highlights
        secondaryText: "#7D7D7D",
        accentHover: "#B25530",
        borders: "#DDD6CE",
        pink: "#F4E7E1",
      },
    },
  },
  plugins: [],
};

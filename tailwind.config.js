/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", // Scan all JS/JSX files in src/
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        primaryText: "var(--foreground)",
        accent: "var(--accent)",
        secondaryText: "var(--secondary)",
        accentHover: "var(--accent-hover)",
        borders: "var(--borders)",
        pink: "var(--pink)",
      },
    },
  },

  plugins: [],
};

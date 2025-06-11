/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}", // Scan all JS/JSX files in src/
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accentyellow: "#FFEA9E",
        cardYellow: "#FFF6D3",
        darkaccentyellow: "#F5E199",
        primaryyellow: "#FFFBE9",
        navbrown: "#E6E2D4",
        darkbrown: "#CCC4A9",
      },
    },
  },
  plugins: [],
};

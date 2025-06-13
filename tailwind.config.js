/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media", // auto theme switch
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
        sage: "var(--sage)",
        darksage: "var(--darksage)",
        steel: "var(--steel)",
      },
    },
  },
  plugins: [],
};

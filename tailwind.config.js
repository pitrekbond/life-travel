/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff5ff",
          100: "#dbe8fe",
          200: "#bfd7fe",
          300: "#93bbfd",
          400: "#609afa",
          500: "#3b82f6",
          600: "#2570eb",
          700: "#1d64d8",
          800: "#1e55af",
          900: "#1e478a",
          950: "#172e54",
        },
        accent: {
          50: "#fef9ec",
          100: "#fdedc8",
          200: "#fad98d",
          300: "#f7bf52",
          400: "#f6af3b",
          500: "#ef8611",
          600: "#d3630c",
          700: "#af440e",
          800: "#8e3512",
          900: "#752c12",
          950: "#431505",
        },
      },
    },
  },
  plugins: [],
};

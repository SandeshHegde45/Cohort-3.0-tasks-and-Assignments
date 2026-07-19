/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        lime: {
          400: "#D8FA33",
          500: "#C8F400",
          600: "#A8CC00",
        },
        ink: {
          950: "#0D0D0D",
          900: "#111111",
          800: "#161616",
          700: "#1E1E1E",
          600: "#2A2A2A",
        },
      },
      fontFamily: {
        display: ["'Baloo 2'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(198,255,51,0.35)",
      },
    },
  },
  plugins: [],
};

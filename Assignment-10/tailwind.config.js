/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Clash Display", "Syne", "sans-serif"],
        body: ["Cabinet Grotesk", "DM Sans", "sans-serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#0d0d0d",
          50: "#f7f7f7",
          100: "#efefef",
          200: "#e0e0e0",
          400: "#999",
          600: "#555",
          800: "#222",
        },
        volt: { DEFAULT: "#c8f400", dark: "#a8ce00", light: "#e2ff66" },
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideIn: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: 0, transform: "scale(0.95)" },
          to: { opacity: 1, transform: "scale(1)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-in": "slideIn 0.35s cubic-bezier(0.32,0.72,0,1) forwards",
        "scale-in": "scaleIn 0.3s ease forwards",
        shimmer: "shimmer 2s linear infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        robotoSlab: [
          "Roboto Slab",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        customLight: "#31363F", // Light color
        customBlueLight: "#76ABAE", // Light blue
        customBlueDark: "#1A4870", // Dark blue
        customBlueDarker: "#1F316F", // Even darker blue
        customBlueLightBg: "#4e7a99", // For Background
      },
    },
  },
  plugins: [],
};

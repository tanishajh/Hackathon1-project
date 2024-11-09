/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: "#003F5E",
          DEFAULT: "#2A9CA8",
          light: "#A8DADC",
        },
        secondary: {
          dark: "#023047",
          text: "#1A1A1A",
        },
        light: {
          primary: "#f5f9f9",
          secondary: "#FFFFFF",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};

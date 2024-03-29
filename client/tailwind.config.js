/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4184E2",
          hover: "#2261bb",
        },
        dark: {
          hard: "#0D2436",
          soft: "#183B56",
          light: "#5A7184",
        },
        gray: {
          placeholder: "#959EAD",
          detail: "#B3BAC5",
          background: "#F2F4F5",
          border: "#C3CAD9",
        },
        green: {
          success: "#36B37E",
          dark: "#115C31",
        },
      },
      fontFamily: {
        opensans: ["'Open Sans'", "sans-serif"],
        roboto: ["'Roboto'", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [], //No themes
    base: false, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: 'd-'
  },
};

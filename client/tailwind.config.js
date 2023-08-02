/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4184E2",
        dark: {
          hard: "#0D2436",
          soft: "#183B56",
          light: "#5A7184",
        },
        gray: {
          placeholder: "#959EAD",
          detail: "#B3BAC5",
        },
        success: "#36B37E",
      },
      fontFamily: {
        opensans: ["'Open Sans'", "sans-serif"],
        roboto: ["'Roboto'", "sans-serif"],
      },
    },
    plugins: [],
  },
};

/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      'sm-md': '640px', // Custom breakpoint between sm and md
      'md-lg': '800px', // Custom breakpoint between md and lg
      'lg-xl': '1000px', // Custom breakpoint between lg and xl
      'xl-2xl': '1200px', // Custom breakpoint between xl and 2xl
    },
  },
  plugins: [],
});


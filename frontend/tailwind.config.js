/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},          // customise later (colours, fonts, etc.)
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],           // add forms/typography plugins here
  };
  
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        teko: ["teko", "sans-serif"],
        poppins: ["poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

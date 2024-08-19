/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Jost", "sans-serif"],
      },

      boxShadow: {
        "th-shadow": "0 6px 15px rgba(64,79,104,.05)",
      },
    },
  },
  plugins: [],
};

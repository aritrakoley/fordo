/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        1: "1px",
      },
      transitionDuration: {
        30: "30ms",
      },
      scale: {
        '98': '0.98',
      },
      boxShadow: {
        'input': 'inset 0 0 0.5rem 4px rgba(255, 255, 255, 0.2)'
      }
    },
  },
  plugins: [],
};

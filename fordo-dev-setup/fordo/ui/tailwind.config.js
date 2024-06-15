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
      }
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.html", "./src/app/*.js"],
  theme: {
    extend: {
      colors: {
        gray: "hsl(0, 0%, 75%)",
        grayishViolet: "hsl(257, 7%, 63%)",
        veryDarkBlue: "hsl(255, 11%, 22%)",
        veryDarkViolet: "hsl(260, 8%, 14%)",
        cyan: "hsl(180, 66%, 49%)",
        darkViolet: "hsl(257, 27%, 26%)",
        red: "hsl(0, 87%, 67%)",
      },
    },

    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1200px",
    },
  },
  plugins: [],
};

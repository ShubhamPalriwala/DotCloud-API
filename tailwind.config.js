module.exports = {
  purge: {
    enabled: true,
    content: ["src/public/*.html"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins"],
      },
      colors: {
        ivory: "#F9F9F9",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

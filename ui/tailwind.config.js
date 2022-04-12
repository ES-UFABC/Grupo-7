const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend:{colors: {
    primary: colors.emerald,
  },}
  },
  plugins: [require("daisyui")],
};

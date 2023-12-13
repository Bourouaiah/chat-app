/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'leaf': "url('../assets/background.jpg')",
      },
      backgroundColor: {
        'blur': 'rgb(255 255 255 / 95%)'
      },
      colors: {
        primary: '#43C651',
        primaryBold: '#056526',
        primaryText: '#555',
        littleBlack: 'rgb(0 0 0 / 70%)'
      }
    },
  },
  plugins: [],
};

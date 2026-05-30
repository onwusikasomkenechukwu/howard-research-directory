/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        howard: {
          blue: '#003A63',
          red: '#E51937',
        },
      },
    },
  },
  plugins: [],
};

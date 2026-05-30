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
        stanford: {
          cardinal: '#8C1515',
        },
        academia: {
          bg: '#1C1714',
          bgAlt: '#251E19',
          bgAlt2: '#2D241D',
          fg: '#E8DFD4',
          muted: '#3D332B',
          mutedFg: '#9C8B7A',
          accent: '#C9A962',
          accentLight: '#D4B872',
          accentDark: '#B8953F',
          accentSecondary: '#8B2635',
          border: '#4A3F35',
        },
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'Garamond', 'serif'],
        body: ['"Crimson Pro"', 'Georgia', 'serif'],
        display: ['Cinzel', 'serif'],
      },
      borderRadius: {
        arch: '40% 40% 0 0 / 20% 20% 0 0',
      },
    },
  },
  plugins: [],
};

import scrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'neon-green': '#39ff14',
      },
    },
  },
  plugins: [
    scrollbar({ nocompatible: true }),
  ],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,css}'],
  corePlugins: {
    preflight: true,
  },
  theme: {
    extend: {
      boxShadow: {
        die: '0px 2px 2px rgba(0, 0, 0, 0.15)',
        'die-button': 'inset 5px 5px 10px -3px rgba(0, 0, 0, 0.7)',
      },
      fontFamily: {
        karla: 'Karla, sans-serif',
      },
    },
  },
  plugins: [],
};

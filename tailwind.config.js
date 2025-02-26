/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#f65a5b',
          darkred: '#d33636',
          lightred: '#f87272',
          blue: '#204056',
          darkblue: '#193243',
          lightblue: '#2f5f7f',
          gray: '#bab2b5',
          darkgray: '#887b80',
          lightgray: '#cdc8ca',
          cream: '#eee2dc',
          white: '#f6f5f4',
        },

        pastel: {
          yellow: '#fbf8cc',
          orange: '#fde4cf',
          red: '#ffcfd2',
          pink: '#f1c0e8',
          violet: '#cfbaf0',
          indigo: '#a3c4f3',
          blue: '#90dbf4',
          teal: '#8eecf5',
          cyan: '#98f5e1',
          green: '#b9fbc0',
        },
      },
    },
  },
  plugins: [],
}

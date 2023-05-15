/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        'black': '#000000',
        'orange': '#fe4600',
        'grey-dark': '#1b1b1b',
        'grey-button': '#8e8e93',
        'grey-light': '#a5a5a5',
        'grey-md' : '#a5a5a5',
        'blue-light': '#f0f7fb',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },

      borderRadius: {
        'md': '10px',
        'lg': '25px',
      }
    },
  },
  plugins: [],
}


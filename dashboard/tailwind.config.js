/** @type {import('tailwindcss').Config} */

module.exports = {
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      'orange': '#fe4600',
      'grey-dark': '#1b1b1b',
      'grey-button': '#8e8e93',
      'grey-light': '#a5a5a5',
      'blue-light': '#f0f7fb',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      // spacing: {
      //   '128': '32rem',
      //   '144': '36rem',
      // },
      borderRadius: {
        'md': '10px',
        'lg': '25px',
      }
    }
  }
}
const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    layers: [], // Do not purge `base`, `components` nor `utilities` layers
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    preserveHtmlElements: false,
    options: {
      safelist: [/^spa/], // @TODO is this still appropriate?
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
    },
    fontFamily: {
      sans: ['KoHo', 'system-ui', 'sans-serif'],
    },
    fontWeight: {
      normal: 400,
      bold: 700,
    },
    extend: {
      colors: {
        stat: {
          0: 'var(--tw-stat-0)',
          10: 'var(--tw-stat-10)',
          20: 'var(--tw-stat-20)',
          30: 'var(--tw-stat-30)',
          40: 'var(--tw-stat-40)',
          50: 'var(--tw-stat-50)',
          60: 'var(--tw-stat-60)',
          70: 'var(--tw-stat-70)',
          80: 'var(--tw-stat-80)',
          90: 'var(--tw-stat-90)',
          100: 'var(--tw-stat-100)',
        },
      },
      lineHeight: {
        'extra-tight': '0.8',
      },
      gridTemplateColumns: {
        data: 'minmax(20ch, 25vw) auto',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

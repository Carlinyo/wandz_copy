/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.vue', './stories/**/*.stories.js'],
  safelist: [
    'tw-justify-between',
    'tw-justify-end',
    'tw-justify-start',
    'tw-justify-center',
    'tw-h-12',
    'tw-h-24',
    'tw-h-36',
    'tw-h-48',
    'tw-h-60',
    'tw-h-72',
    '!tw-h-12',
    '!tw-h-24',
    '!tw-h-36',
    '!tw-h-48',
    '!tw-h-60',
    '!tw-h-72',
    'group-hover/menu:!tw-h-36',
    'group-hover/menu:!tw-h-12',
    'group-hover/menu:!tw-h-24',
    'group-hover/menu:!tw-h-36',
    'group-hover/menu:!tw-h-48',
    'group-hover/menu:!tw-h-60',
    'group-hover/menu:!tw-h-72',
    'group-hover/menu:!tw-h-84',
    'group-hover/menu:!tw-h-96',
    'group-hover/menu:!tw-h-108',
    'group-hover/menu:!tw-h-120',
    'group-hover/menu:!tw-h-132',
    'group-hover/menu:!tw-h-144',
  ],
  theme: {
    extend: {
      spacing: {
        84: '21rem',
        96: '24rem',
        108: '27rem',
        120: '30rem',
        132: '33rem',
        144: '36rem',
      },
    },
    fontFamily: {
      display: ['Figtree', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      '1.5xl': '1440px',
      // => @media (min-width: 1440px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
  prefix: 'tw-',
};

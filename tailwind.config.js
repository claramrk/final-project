/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          container: {
            center: true,
            padding: '2rem',
          },
          primary: '#333',

          secondary: '#FDA929',

          accent: '#11B196',

          neutral: '#4272C5',

          'base-100': '#ffffff',

          info: '#4272C5',

          success: '#11B196',

          warning: '#F7A929',

          error: '#E84106',
        },
      },
    ],
  },
};

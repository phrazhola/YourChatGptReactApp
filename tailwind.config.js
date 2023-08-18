/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/vendors/chatgpt_frontend/src/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
      extend: {},
    },
    variants: {
      extend: {
        visibility: ['group-hover'],
      },
    },
    plugins: [require('@tailwindcss/typography')],
  };
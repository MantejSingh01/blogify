/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPink: '#df6688',
        customPurple: '#3d1051',
      },
      linearGradientColors: theme => ({
        'custom-gradient': `#${theme('colors.customPink')} 0%, #${theme('colors.customPurple')} 100%`,
      }),
    },
  },
  plugins: [],
}
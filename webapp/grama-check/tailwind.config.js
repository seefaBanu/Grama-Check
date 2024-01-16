/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mont: ['var(--font-mont)'],
        mono: ['var(--font-roboto-mono)'],
        general: ['"Poppins"', 'sans-serif'],
        heading:['"poppins"','sans-serif']
      },
    },
  },
  plugins: [],
}


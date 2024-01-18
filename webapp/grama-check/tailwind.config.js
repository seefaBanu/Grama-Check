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
    screens: {
      "2xl": { max: "1535px" },
      "xl": { max: "1279px" },
      "lg": { max: "1023px" },
      "md": { max: "767px" },
      "sm": { max: "639px" },
      "xs": { max: "479px" },
  },
  },
  plugins: [],
}


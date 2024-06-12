/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        "max-height" : "max-height"
      },
      transitionTimingFunction: {
        "dropdown" : "cubic-bezier(.51,.92,.24,1.15)"
      },
      colors: {
        "current" : "currentColor"
      }
    },
  },
  plugins: [],
}


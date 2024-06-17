/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      transitionProperty: {
        "max-height" : "max-height"
      },
      transitionTimingFunction: {
        "dropdown" : "cubic-bezier(.51,.92,.24,1.15)"
      },
      colors: {
        background: "hsl(var(--clr-bg))",
        foreground: "hsl(var(--clr-foreground))",
        border: "hsl(var(--clr-border))",
        primary: "hsl(var(--clr-primary))"
      }
    },
  },
  plugins: [],
}


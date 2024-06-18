/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      transitionProperty: {
        "max-height": "max-height",
      },
      transitionTimingFunction: {
        dropdown: "cubic-bezier(.51,.92,.24,1.15)",
      },
      colors: {
        background: "hsl(var(--clr-bg))",
        foreground: "hsl(var(--clr-foreground))",
        border: "hsl(var(--clr-border))",
        primary: "hsl(var(--clr-primary))",
        dimBlack: "hsl(var(--clr-dim-black))",
        accent: "hsl(var(--clr-accent))",
        muted: "hsl(var(--clr-muted))",
        "pop-over": "hsl(var(--clr-pop-over))"
      },
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'custom-dark': '0 10px 15px -3px rgba(255, 255, 255, 0.01), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
        
      },
    },
  },
  plugins: [],
};

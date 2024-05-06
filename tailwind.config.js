module.exports = {
  mode: 'jit',
  purge: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'gradient-x':'gradient-x 2s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%': { backgroundColor: '#f56565' },
          '50%': { backgroundColor: 'ffffff' },
          '100%': { backgroundColor: '#f56565' },
        },
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif']
      },
      colors: {
        primary: "#1976D2", // blue
        primaryHover: "#1565C0", // blue
        secondary: "#424242", // grey
        background: "#FFFFFF", // white
        accent: "#FFC107", // yellow
        backgroundDark: '#f4f4fb',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  variants: {
    extend: {
      padding: ['first', 'last'],
    },
  },
  plugins: [require("tailwindcss-animate")],
}
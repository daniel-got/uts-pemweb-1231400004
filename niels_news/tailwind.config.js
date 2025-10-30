export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Clash Display', 'Inter', 'sans-serif'],  // Fallback ke Inter
      },
      colors: {
        mint: '#00D4AA',
        yellow: '#FFC300',
        purple: '#A78BFA',
        black: '#000000',
        white: '#FFFFFF',
        gray: '#F5F5F5',
        dark: '#1A1A1A',
      },
      borderWidth: {
        'thick': '3px',
      },
      boxShadow: {
        'card': '0 8px 25px rgba(0,0,0,0.15)',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

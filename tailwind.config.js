/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './client/**/*.{js,jsx}'],
  theme: {
      extend: {
        colors: {
        midnight: '#f5f9ff',
        ink: '#dfeffc',
        panel: '#ffffff',
        gold: {
          50: '#f0f8ff',
          100: '#d8edff',
          200: '#bddfff',
          300: '#93cbff',
          400: '#68b4ff',
          500: '#3797f6',
          600: '#2678d4',
          700: '#205fa8',
          800: '#1e4f88',
          900: '#1f446f',
        },
        },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(55, 151, 246, 0.12), 0 18px 40px rgba(115, 150, 190, 0.16)',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(circle at top, rgba(104, 180, 255, 0.22), transparent 30%), radial-gradient(circle at 85% 18%, rgba(255, 255, 255, 0.75), transparent 22%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fdf8f9',
          100: '#fceef1',
          200: '#f9dce3',
          300: '#f4c0ce',
          400: '#ec9ab0',
          500: '#e07a98',
          600: '#c95a7a',
          700: '#a84460',
          800: '#8b3b52',
          900: '#75354a',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#faf3e8',
          300: '#f5ead8',
        },
        ink: {
          900: '#1a1214',
          800: '#2d2226',
          700: '#45363c',
          600: '#5c4a52',
          500: '#75636b',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(224, 122, 152, 0.12)',
        glow: '0 8px 40px -8px rgba(224, 122, 152, 0.25)',
        glass: '0 8px 32px rgba(26, 18, 20, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #fdf8f9 0%, #fceef1 40%, #faf3e8 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(252,238,241,0.6) 100%)',
      },
    },
  },
  plugins: [],
};

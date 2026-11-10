/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFE5EC',
          rose: '#FBB6CE',
          peach: '#FFEDD5',
          cream: '#FFFBEB',
          mint: '#DCFCE7',
          sage: '#BBF7D0',
          sky: '#E0F2FE',
          blue: '#BAE6FD',
          lavender: '#EDE9FE',
          purple: '#DDD6FE',
          yellow: '#FEF08A',
          coral: '#FDA4AF',
        },
        brand: {
          50: '#F5F7FF',
          100: '#EBF0FE',
          200: '#D6E0FD',
          300: '#ABC1FA',
          400: '#7B9CF6',
          500: '#6366F1',
          600: '#4F46E5',
          rose: '#FF6B8B',
          sunset: '#FF8E53',
          teal: '#14B8A6',
          mint: '#10B981',
          amber: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['"Quicksand"', '"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cute': '0 8px 30px -4px rgba(236, 72, 153, 0.12), 0 4px 12px -2px rgba(99, 102, 241, 0.08)',
        'soft': '0 4px 20px -2px rgba(148, 163, 184, 0.15)',
        'glow-pink': '0 0 25px rgba(251, 182, 206, 0.45)',
        'glow-blue': '0 0 25px rgba(186, 230, 253, 0.45)',
        'glow-amber': '0 0 25px rgba(254, 240, 138, 0.45)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}


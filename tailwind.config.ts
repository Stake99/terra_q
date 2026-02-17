import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        'mining-primary': '#1A1A1A',    // Dark gray/black from logo
        'mining-secondary': '#E63946',  // Vibrant red from logo
        'mining-accent': '#C0C0C0',     // Silver/light gray from logo
      },
      fontFamily: {
        sans: ['var(--font-architects)', 'cursive', 'system-ui'],
        heading: ['var(--font-architects)', 'cursive', 'system-ui'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'count-up': 'count-up 2s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'count-up': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
};
export default config;

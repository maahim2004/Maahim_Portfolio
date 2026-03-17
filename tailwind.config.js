/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        secondaryBg: "#050505",
        card: "#1E293B",
        surface: "rgba(30, 41, 59, 0.4)", // Card background with alpha
        surfaceHover: "rgba(30, 41, 59, 0.8)",
        primary: "#38BDF8", // Accent Color
        secondary: "#00E5FF", // Glow Accent
        textDefault: "#E2E8F0", // Primary Text
        textMuted: "#94A3B8"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        oldMoney: ['Cormorant Garamond', 'serif']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      },
      boxShadow: {
        'glow': '0 0 15px rgba(56, 189, 248, 0.2)',
        'glow-primary': '0 0 25px rgba(56, 189, 248, 0.5)',
        'glow-secondary': '0 0 25px rgba(0, 229, 255, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      }
    },
  },
  plugins: [],
}

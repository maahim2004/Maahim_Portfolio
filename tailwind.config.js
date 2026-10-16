/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF8F2", // Pure warm architectural Ivory
        paper: "#FFFFFF", // Crisp white surface
        card: "#FFFFFF",
        surface: "rgba(255, 255, 255, 0.92)",
        surfaceHover: "#FFFFFF",
        surfaceMuted: "#F2EDE3", // Soft ivory tone for chips & tags
        primary: "#D40028", // Radiant Candy Apple Red
        primaryDark: "#B30020",
        primaryLight: "#FFE8EC",
        secondary: "#18181B", // Deep Charcoal / Technical Black
        textDefault: "#18181B", // Dark charcoal typography
        textMuted: "#635F5A", // Technical subtext graphite
        textSubtle: "#8A847B", // Fine drafting annotations
        borderLight: "#E8E2D6", // Fine architectural drafting line
        borderDark: "#18181B",
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['Space Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'paper': '0 1px 3px 0 rgba(24, 24, 27, 0.05), 0 1px 2px -1px rgba(24, 24, 27, 0.05)',
        'paper-md': '0 4px 6px -1px rgba(24, 24, 27, 0.07), 0 2px 4px -2px rgba(24, 24, 27, 0.05)',
        'paper-lg': '0 10px 15px -3px rgba(24, 24, 27, 0.08), 0 4px 6px -4px rgba(24, 24, 27, 0.05)',
        'candy': '0 10px 25px -5px rgba(212, 0, 40, 0.25)',
        'glow-primary': '0 0 20px rgba(212, 0, 40, 0.35)',
        'glow': '0 0 15px rgba(212, 0, 40, 0.2)',
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

import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void:   '#111111',
        paper:  '#F4F0E6',
        soviet: '#E52E2D',
        ink:    '#000000',
        gold:   '#C9A227',
        amber:  '#E8B547',
        steel:  '#333333',
        ash:    '#8A8A8A',
        glow:   '#FF2233',
        surface: '#1A1A1A',
        border:  '#000000',
        'ink-light': '#D4CFC8',
      },
      fontFamily: {
        sans:  ['var(--font-ibm-plex-sans)', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-ibm-plex-mono)', 'monospace'],
        display: ['var(--font-bebas-neue)', 'sans-serif'],
      },
      backgroundImage: {
        'constructivist-grid': `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 39px,
            rgba(229,46,45,0.1) 39px,
            rgba(229,46,45,0.1) 40px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 39px,
            rgba(229,46,45,0.1) 39px,
            rgba(229,46,45,0.1) 40px
          )
        `,
        'scanline': `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0,0,0,0.04) 2px,
          rgba(0,0,0,0.04) 3px
        )`,
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'ticker': 'ticker 30s linear infinite',
        'tilt': 'tilt 0.3s ease',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      perspective: {
        '500': '500px',
        '800': '800px',
        '1000': '1000px',
      },
      typography: {
        invert: {
          css: {
            '--tw-prose-body': '#D4CFC8',
            '--tw-prose-headings': '#F4F0E6',
            '--tw-prose-links': '#E52E2D',
            '--tw-prose-code': '#E8B547',
            '--tw-prose-pre-bg': '#1A1A1A',
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config

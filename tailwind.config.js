/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        terminal: {
          DEFAULT: 'var(--terminal-bg)',
          bg: 'var(--terminal-bg)',
          text: 'var(--terminal-text)',
          accent: 'var(--terminal-accent)',
          muted: 'var(--terminal-muted)',
          success: 'var(--terminal-success)',
          error: 'var(--terminal-error)',
          warning: 'var(--terminal-warning)',
          header: 'var(--terminal-header)',
          hover: 'var(--terminal-hover)',
          border: 'var(--terminal-border)',
        },
      },
    },
  },
  plugins: [],
};

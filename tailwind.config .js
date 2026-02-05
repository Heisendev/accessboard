/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#111',
        danger: '#b00020',
      },
    },
  },
  plugins: [],
}

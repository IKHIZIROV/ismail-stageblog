/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: '#FDEDD6',
          sand: '#F8E4C4',
          paper: '#FFF7EA',
          navy: '#17264A',
          text: '#17264A',
          muted: '#4A5878',
          dark: '#17264A',
          teal: '#1FDEB8',
          cyan: '#02A7EF',
          blue: '#2664E4',
          purple: '#7447F0',
          coral: '#FD7B54',
          orange: '#FC9960',
          light: '#FDEDD6',
        },
      },
      boxShadow: {
        soft: '0 16px 36px -24px rgba(23, 38, 74, 0.45)',
        card: '0 18px 46px -28px rgba(23, 38, 74, 0.42)',
        button: '0 12px 24px -16px rgba(38, 100, 228, 0.65)',
      },
    },
  },
  plugins: [],
}

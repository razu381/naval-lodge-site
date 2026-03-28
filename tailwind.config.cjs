/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          bg: '#080C14',
          'bg-2': '#0D1220',
          'bg-3': '#121929',
          card: '#0F1623',
        },
        amber: {
          DEFAULT: '#E8A842',
          dim: '#B07E28',
        },
        text: {
          DEFAULT: '#EBE9E4',
          muted: '#6B7280',
          'muted-2': '#3D4656',
        },
        border: {
          DEFAULT: 'rgba(232,168,66,0.12)',
          '2': 'rgba(255,255,255,0.06)',
        },
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        jetbrains: ['var(--font-jetbrains)', 'monospace'],
      },
    },
  },
  plugins: [],
};

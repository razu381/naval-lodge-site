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
          bg: '#001233',
          'bg-2': '#001B4D',
          'bg-3': '#002352',
          card: '#001845',
        },
        amber: {
          DEFAULT: '#FFCF01',
          dim: '#D4AD00',
        },
        'brand-gray': {
          DEFAULT: '#505759',
          light: '#C7C8CA',
        },
        'brand-orange': '#FAA61A',
        'brand-navy': '#002B5C',
        'brand-yellow': '#FFCF01',
        text: {
          DEFAULT: '#EBE9E4',
          muted: '#6B7280',
          'muted-2': '#3D4656',
        },
        border: {
          DEFAULT: 'rgba(255,207,1,0.12)',
          '2': 'rgba(255,255,255,0.06)',
        },
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        jetbrains: ['var(--font-jetbrains)', 'monospace'],
        heading: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

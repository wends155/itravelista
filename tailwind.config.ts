import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#008080',
          hover: '#006B6B',
          light: '#E0F2F1',
        },
        chart: {
          flights: '#4A90E2',
          accommodation: '#008080',
          food: '#F5A623',
          transport: '#D0021B',
          activities: '#7B61FF',
          other: '#9B9B9B',
        },
      },
      borderRadius: {
        pill: '24px',
        card: '16px',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.08)',
        modal: '0 8px 24px rgba(0,0,0,0.12)',
        fab: '0 4px 16px rgba(0,0,0,0.15)',
        bottomnav: '0 -2px 8px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

    },
    colors: {
      // Keep essential colors
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',

      // Gray colors
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },

      // Custom blue palette based on #2b91cb - MAIN BRAND COLOR
      blue: {
        50: '#eff9ff',
        100: '#dff2ff',
        200: '#b8e5ff',
        300: '#78d1ff',
        400: '#30afff',
        500: '#2b91cb',  // YOUR MAIN COLOR
        600: '#2475a3',
        700: '#1e5e83',
        800: '#1f4e6c',
        900: '#1e435c',
      },

      // Keep other essential colors (removed purple, pink, violet, indigo)
      red: {
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
      },
      green: {
        100: '#d1fae5',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
      },
      yellow: {
        100: '#fef3c7',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
      },
      orange: {
        100: '#ffedd5',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
      },
      cyan: {
        50: '#ecfeff',
        100: '#cffafe',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
      },
      amber: {
        600: '#d97706',
        800: '#92400e',
      },
      stone: {
        400: '#a8a29e',
        500: '#78716c',
        600: '#57534e',
      },
    },
  },
  plugins: [],
};

export default config;

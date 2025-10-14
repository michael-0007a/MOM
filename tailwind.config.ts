import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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

      // Custom blue palette based on #2b91cb
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

      // Keep other essential colors
      red: {
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
      },
      green: {
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
      },
      yellow: {
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
      },
      purple: {
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
      },
      pink: {
        400: '#f472b6',
        500: '#ec4899',
        600: '#db2777',
      },
      orange: {
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
      },
      cyan: {
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
      },
      indigo: {
        400: '#818cf8',
        500: '#6366f1',
        600: '#4f46e5',
      },
      violet: {
        400: '#a78bfa',
        500: '#8b5cf6',
        600: '#7c3aed',
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

// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(190 80% 40%)', // teal accent
          foreground: 'hsl(190 0% 100%)',
        },
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(210 10% 15%)',
        card: 'hsl(0 0% 98%)',
        "card-foreground": 'hsl(210 10% 15%)',
        popover: 'hsl(0 0% 100%)',
        "popover-foreground": 'hsl(210 10% 15%)',
        muted: 'hsl(210 20% 95%)',
        "muted-foreground": 'hsl(210 10% 35%)',
        accent: 'hsl(190 80% 40%)',
        "accent-foreground": 'hsl(190 0% 100%)',
        destructive: 'hsl(0 80% 50%)',
        border: 'hsl(210 20% 90%)',
        input: 'hsl(210 20% 95%)',
        ring: 'hsl(190 80% 40% / 0.2)',
        sidebar: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(210 10% 15%)',
          primary: 'hsl(190 80% 40%)',
          "primary-foreground": 'hsl(190 0% 100%)',
          accent: 'hsl(190 70% 45%)',
          "accent-foreground": 'hsl(190 0% 100%)',
          border: 'hsl(210 20% 90%)',
          ring: 'hsl(190 80% 40% / 0.2)',
        },
      },
      borderRadius: {
        sm: '0.3rem',
        md: '0.45rem',
        lg: '0.6rem',
        xl: '0.9rem',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}

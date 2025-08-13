import type { Config } from "tailwindcss"

// all in fixtures is set to tailwind v3 as interims solutions

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "academy-blue": "#001f3f",
        "academy-blue-light": "#0a2f5a",
        "academy-blue-dark": "#001833",
        "academy-blue-50": "#f0f4f8",
        "academy-blue-100": "#d6e3f0",
        "academy-blue-200": "#b3c7e6",
        "academy-blue-300": "#90abdc",
        "academy-blue-400": "#6d8fd2",
        "academy-blue-500": "#4a73c8",
        "academy-blue-600": "#275bbe",
        "academy-blue-700": "#1e4a9f",
        "academy-blue-800": "#153a7f",
        "academy-blue-900": "#0c2a5f",
        "academy-gold": "#FFD700",
        "academy-gold-light": "#ffe234",
        "academy-gold-dark": "#e6c200",
        "academy-gold-50": "#fffdf0",
        "academy-gold-100": "#fffbcc",
        "academy-gold-200": "#fff799",
        "academy-gold-300": "#fff366",
        "academy-gold-400": "#ffef33",
        "academy-gold-500": "#ffeb00",
        "academy-gold-600": "#e6d400",
        "academy-gold-700": "#ccbc00",
        "academy-gold-800": "#b3a500",
        "academy-gold-900": "#998e00",
        "academy-white": "#FFFFFF",
        "academy-gray": "#f8fafc",
        "academy-gray-light": "#f1f5f9",
        "academy-gray-medium": "#e2e8f0",
        "academy-dark-gray": "#64748b",
        "academy-darker-gray": "#475569",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        arabic: ["Segoe UI", "Tahoma", "Arial", "Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config

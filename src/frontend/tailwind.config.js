import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        // Brand tokens
        maroon: {
          DEFAULT: "oklch(var(--maroon))",
          dark: "oklch(var(--maroon-dark))",
          rich: "oklch(var(--maroon-rich))",
          light: "oklch(var(--maroon-light))",
        },
        beige: {
          DEFAULT: "oklch(var(--beige))",
          dark: "oklch(var(--beige-dark))",
        },
        parchment: "oklch(var(--parchment))",
        cream: "oklch(var(--cream))",
        gold: {
          DEFAULT: "oklch(var(--gold))",
          light: "oklch(var(--gold-light))",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["General Sans", "Inter", "sans-serif"],
        sans: ["General Sans", "Inter", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      fontSize: {
        // Editorial display scale
        "display-2xl": ["5rem", { lineHeight: "1.04", letterSpacing: "-0.025em" }],
        "display-xl": ["4rem", { lineHeight: "1.06", letterSpacing: "-0.022em" }],
        "display-lg": ["3.25rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-md": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.018em" }],
        "display-sm": ["2rem", { lineHeight: "1.14", letterSpacing: "-0.015em" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.04)",
        // Warm ivory elevation — tinted toward the maroon palette
        card: "0 1px 3px rgba(80,10,20,0.06), 0 4px 16px rgba(80,10,20,0.04)",
        "card-hover": "0 6px 28px rgba(80,10,20,0.13), 0 2px 8px rgba(80,10,20,0.07)",
        // Maroon CTA glow
        maroon: "0 4px 18px rgba(100,0,25,0.35), 0 1px 4px rgba(100,0,25,0.20)",
        "maroon-lg": "0 8px 32px rgba(100,0,25,0.40), 0 2px 8px rgba(100,0,25,0.22)",
        // Floating surface
        float: "0 20px 60px rgba(80,10,20,0.10), 0 4px 16px rgba(80,10,20,0.06)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-right": "slide-in-right 0.35s cubic-bezier(0.32,0.72,0,1)",
        "fade-up": "fade-up 0.55s ease-out forwards",
        shimmer: "shimmer 1.8s infinite linear",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};

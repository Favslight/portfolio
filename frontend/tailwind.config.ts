import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#b3ccff",
          300: "#7fa8ff",
          400: "#4f83f7",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8"
        },
        accent: {
          400: "#a78bfa",
          500: "#8b5cf6"
        },
        ink: {
          950: "#05070f",
          900: "#080d1a",
          800: "#0d1424",
          700: "#131b31",
          600: "#1b2540",
          500: "#26314f",
          400: "#3a4667"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
        lift: "0 20px 40px rgba(37, 99, 235, 0.16)",
        glow: "0 0 0 1px rgba(59,130,246,0.15), 0 20px 60px rgba(37, 99, 235, 0.25)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "fade-up": "fade-up 700ms ease-out both",
        marquee: "marquee 28s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;

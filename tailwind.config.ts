import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      /* ── Colors ─────────────────────────────────── */
      colors: {
        brand: {
          DEFAULT: "#f54900",
          hover: "#dc4200",
          muted: "rgba(245,73,0,0.12)",
          glow: "rgba(245,73,0,0.06)",
        },
        bg: {
          DEFAULT: "#000000",
          surface: "#0d0d0d",
          surface2: "#111111",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.14)",
          muted: "rgba(255,255,255,0.06)",
        },
        text: {
          primary: "#ffffff",
          secondary: "#999999",
          muted: "#666666",
        },
        icon: {
          gray: "#7F7F7F",
        },
      },

      /* ── Font family ─────────────────────────────── */
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },

      /* ── Font size ───────────────────────────────── */
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem" }],
        xs: ["0.75rem", { lineHeight: "1.1rem" }],
        sm: ["0.8rem", { lineHeight: "1.3rem" }],
        base: ["0.875rem", { lineHeight: "1.5rem" }],
        lg: ["0.95rem", { lineHeight: "1.5rem" }],
        xl: ["1rem", { lineHeight: "1.5rem" }],
        "2xl": ["1.25rem", { lineHeight: "1.2rem" }],
        "3xl": ["1.5rem", { lineHeight: "1.2rem" }],
        "4xl": ["1.8rem", { lineHeight: "1.15rem" }],
        "5xl": ["2rem", { lineHeight: "1.1rem" }],
        "6xl": ["2.5rem", { lineHeight: "1.05rem" }],
        "7xl": ["3rem", { lineHeight: "1rem" }],
        "8xl": ["3.5rem", { lineHeight: "1rem" }],
        hero: ["3.5rem", { lineHeight: "1.02" }],
        section: ["clamp(1.7rem,3.5vw,2.5rem)", { lineHeight: "1.15" }],
      },

      /* ── Letter spacing ──────────────────────────── */
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.03em",
        tight: "-0.02em",
        normal: "0",
        wide: "0.02em",
        wider: "0.06em",
        widest: "0.1em",
        label: "0.12em",
      },

      /* ── Border radius ───────────────────────────── */
      borderRadius: {
        DEFAULT: "6px",
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
      },

      /* ── Spacing (extras) ────────────────────────── */
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },

      /* ── Background image ────────────────────────── */
      backgroundImage: {
        "brand-radial":
          "radial-gradient(ellipse at center, rgba(245,73,0,0.12) 0%, transparent 60%)",
        "brand-radial-strong":
          "radial-gradient(ellipse at center, rgba(245,73,0,0.22) 0%, transparent 60%)",
        "fade-right": "linear-gradient(to right, #000, transparent)",
        "fade-left": "linear-gradient(to left, #000, transparent)",
        "glow-line":
          "linear-gradient(90deg, transparent 0%, rgba(245,73,0,0.45) 50%, transparent 100%)",
        "surface-fade":
          "linear-gradient(to bottom, #0d0d0d 0%, transparent 70%)",
      },

      /* ── Box shadow ──────────────────────────────── */
      boxShadow: {
        brand: "0 0 40px rgba(245,73,0,0.15)",
        "brand-sm": "0 0 20px rgba(245,73,0,0.1)",
        card: "0 1px 3px rgba(0,0,0,0.4)",
      },

      /* ── Transition timing ───────────────────────── */
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
      },

      /* ── Animation ───────────────────────────────── */
      animation: {
        "marquee-left": "marqueeLeft 40s linear infinite",
        "marquee-right": "marqueeRight 40s linear infinite",
        "fade-in-up": "fadeInUp 0.5s ease forwards",
      },
      keyframes: {
        marqueeLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      /* ── Max-width ───────────────────────────────── */
      maxWidth: {
        container: "1100px",
      },
    },
  },
  plugins: [],
};

export default config;

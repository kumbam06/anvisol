import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        mist: "var(--mist)",
        paper: "var(--paper)",
        line: "var(--line)",
        mute: "var(--mute)",
        accent: "var(--accent)",
        solid: "var(--solid)",
        "solid-fg": "var(--solid-fg)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "ui-serif", "Georgia"]
      },
      boxShadow: {
        card: "var(--shadow)"
      }
    }
  },
  plugins: []
};

export default config;

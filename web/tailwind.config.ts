import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12141a",
        mist: "#f4f1ea",
        paper: "#fffcf7",
        line: "#e6e1d6",
        mute: "#5f6570",
        accent: "#2563eb"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-display)", "ui-serif", "Georgia"]
      },
      boxShadow: {
        card: "0 20px 40px rgba(18, 20, 26, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;

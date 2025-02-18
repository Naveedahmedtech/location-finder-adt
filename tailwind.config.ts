import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        primary: "var(--primary)",
        primaryHover: "var(--primary-hover)",
        secondary: "var(--secondary)",
        secondaryHover: "var(--secondary-hover)",
        accent: "var(--accent)",
        accentHover: "var(--accent-hover)",
        error: "var(--error)",
        errorHover: "var(--error-hover)",
        button: "var(--button)",
        buttonHover: "var(--button-hover)",
        border: "var(--border)",
        text: "var(--text)",
      },
    },
  },
  plugins: [],
} satisfies Config;

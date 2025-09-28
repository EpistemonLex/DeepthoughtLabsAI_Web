import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ["var(--font-logo)"],
        headings: ["var(--font-headings)"],
        body: ["var(--font-body)"],
      },
      colors: {
        primary: "var(--text-primary)",
        muted: "var(--text-muted)",
        "accent-blue": "var(--accent-blue)",
        "bg-dark": "var(--bg-dark)",
        "bg-pane": "var(--bg-pane)",
        "bg-card": "var(--bg-card)",
        "border-color": "var(--border-color)",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        gradient: 'linear-gradient(108.7deg, rgba(221, 22, 224, 1) 11%, rgba(111, 22, 190, 1) 88.2%)'
      },
      boxShadow: {
        glow: '0 7px 29px 0 rgba(100, 100, 111, 0.2)'
      }
    },
  },
  plugins: [],
};
export default config;

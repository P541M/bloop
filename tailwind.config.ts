import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}", // Include all TypeScript files in src/app
    "./src/components/**/*.{ts,tsx}", // Include all TypeScript files in src/components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

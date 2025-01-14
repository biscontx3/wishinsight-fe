import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,css,scss}",
  ],
  important: true,
  theme: {
    extend: {},
  },
  plugins: [],
};

import GeneralPreset from "./src/tailwind.preset";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    {
      pattern: /(grid-cols|col-span)-(1[0-2]|[1-9])/,
      variants: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
  ],
  theme: {
    extend: {},
  },
  presets: [GeneralPreset],
};

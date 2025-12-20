import GeneralPreset from "./tailwind.preset";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../base/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /(grid-cols|col-span)-(1[0-2]|[1-9])/,
      variants: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
  ],
  presets: [GeneralPreset],
  theme: {
    extend: {},
  },
};

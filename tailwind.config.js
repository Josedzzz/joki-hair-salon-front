/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#0A0A0A",
        "custom-platinum": "#E0E0E0",
        "custom-white": "#F0F0F0",
      },
    },
  },
  plugins: [],
};

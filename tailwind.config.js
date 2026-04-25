/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        "rail-blue": "#1a4f8a",
        "rail-dark": "#0f3361",
        "rail-gold": "#c8920a",
      },
    },
  },
  plugins: [],
};

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@element-plus/nuxt"],
  tailwindcss: {
    configPath: "tailwind.config.js",
  },
});

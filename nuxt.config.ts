export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@element-plus/nuxt", "@nuxtjs/i18n"],

  // TODO: Change NUXT_PUBLIC_API_BASE in your .env file to the real backend URL when ready
  runtimeConfig: {
    apiBase:
      process.env.NUXT_PUBLIC_API_BASE || process.env.NUXT_PUBLIC_API_BASE_URL,
    public: {
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE ||
        process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },

  i18n: {
    defaultLocale: "uz",
    langDir: "locales/",
    vueI18n: "./i18n.config.ts",
    strategy: "no_prefix",
    detectBrowserLanguage: false,
    locales: [
      { code: "uz", name: "O'zbekcha", file: "uz.json" },
      { code: "oz", name: "Ўзбекча", file: "oz.json" },
      { code: "kz", name: "Қазақша", file: "kz.json" },
      { code: "ru", name: "Русский", file: "ru.json" },
      { code: "en", name: "English", file: "en.json" },
    ],
  },

  tailwindcss: {
    configPath: "tailwind.config.js",
  },
});

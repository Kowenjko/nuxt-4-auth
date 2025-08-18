// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['nuxt-auth-utils', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    session: {
      password: '',
      name: 'nau-session',
      cookie: {
        maxAge: 60 * 24 * 7, // 7 days
      },
    },
  },
})

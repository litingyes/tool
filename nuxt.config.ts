export default defineNuxtConfig({
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxt/image-edge',
    '@nuxthq/ui',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/fontaine',
    '@vueuse/nuxt',
    'nuxt-lodash',
    '@nuxt/devtools',
    '@nuxtjs/i18n',
  ],
  eslint: {
    lintOnStart: false,
  },
  devtools: {
    enabled: true,
  },
  ui: {
    global: true,
    icons: 'all',
  },
  stylelint: {
    lintOnStart: false,
  },
  tailwindcss: {
    cssPath: '~/assets/styles/tailwind.css',
  },
  colorMode: {
    preference: 'light',
  },
  i18n: {
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en.json',
        name: 'English',
      },
      {
        code: 'zh',
        iso: 'zh-CN',
        file: 'zh.json',
        name: '简体中文',
      },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      alwaysRedirect: true,
      fallbackLocale: 'en',
      useCookie: true,
    },
  },
})

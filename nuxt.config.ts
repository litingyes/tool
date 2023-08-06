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
})

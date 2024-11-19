import { i18n } from './configs/i18n'
import { image } from './configs/image'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    // pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
    // baseURL: '.',
    // buildAssetsDir: './',
  },

  css: [
    'assets/css/fonts.css',
    'assets/css/common.css',
  ],

  modules: [
    ['@pinia/nuxt', { autoImports: ['defineStore', 'storeToRefs'] }],
    ['@nuxtjs/i18n', i18n],
    ['@nuxt/image', image],
  ],
})
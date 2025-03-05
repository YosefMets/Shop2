import { i18n } from './configs/i18n'
import { image } from './configs/image'
import { stripe } from './configs/stripe'

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
    '@nuxthub/core',
    '@unlok-co/nuxt-stripe',
    '@nuxt/scripts'
  ],
  build: {
    transpile: ['pinia']
  },
  alias: {
    pinia: 'pinia/dist/pinia.cjs'
  },
  hub: {
    database: true,
    kv: true,
    blob: true,
    cache: true,
  },
  stripe,

  scripts: {
    registry: {
      stripe: true,
    }
  }

})
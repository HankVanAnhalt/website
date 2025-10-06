// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0'
  },
  css: ['@/styling/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styling/helper.scss" as *;',
        },
      },
    },
  },
  components: [ {
    path: '@/components',
    pathPrefix: false
  }],
  modules: [
    '@nuxt/fonts', '@nuxt/icon', '@nuxt/image', '@vueuse/nuxt', '@nuxtjs/google-fonts', '@nuxthub/core'
  ],
  nitro: {
    preset: 'cloudflare-pages'
  },
  googleFonts: {
    display: "swap",
    families: {
      "Roboto Mono": [100, 200, 300, 400, 500, 600, 700]
    },
    preload: true
  },
  image: {
    format: ['avif, webp']
  },
  ssr: false,
  app: {
    baseURL: '/website/',
    head: {
      meta: [{
        name: 'viewport', 
        content: 'width=device-width, initial-scale=1.0'
      }]
    }
  },
})
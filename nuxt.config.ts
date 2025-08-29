export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: 3001
  },

  // Modules
  modules: ['@pinia/nuxt'],

  // CSS
  css: ['~/assets/css/main.css'],

  // PostCSS
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  // Components auto-import
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // Runtime config
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:8000/api'
    }
  },

  // App
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  }
})

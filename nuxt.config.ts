export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: 3001
  },

  // فقط Pinia
  modules: [
    '@pinia/nuxt'
  ],

  // تنظیمات CSS
  css: ['~/assets/css/main.css'],

  // تنظیمات PostCSS برای Tailwind
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  // تنظیمات Components - اجباری کردن auto-import
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  // تنظیمات runtime
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:8000/api'
    }
  },

  // تنظیمات SSR
  ssr: true,

  // تنظیمات app
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  }
})

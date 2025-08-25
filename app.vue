<template>
  <NuxtLayout>
    <NuxtPage />
    <ClientOnly>
      <ToastContainer />
    </ClientOnly>
  </NuxtLayout>
</template>

<script setup lang="ts">
// Global head configuration
useHead({
  htmlAttrs: {
    lang: 'fa',
    dir: 'rtl'
  },
  titleTemplate: '%s | بلیان - وبلاگ',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'بلیان - مقالات و آموزش‌های تخصصی' },
    { name: 'keywords', content: 'بلیان, مقالات, آموزش, وبلاگ, توسعه نرم‌افزار, برنامه‌نویسی' },
    { property: 'og:title', content: 'بلیان - وبلاگ' },
    { property: 'og:description', content: 'مقالات و آموزش‌های تخصصی' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})

// Initialize auth on app mount (client-side only)
onMounted(async () => {
  if (process.client) {
    try {
      const authStore = useAuthStore()
      await authStore.initializeAuth()
    } catch (error) {
      console.error('Auth initialization error:', error)
    }
  }
})
</script>

<style>
/* Global styles */
html, body {
  font-family: 'Vazirmatn', sans-serif !important;
  direction: rtl;
}

* {
  font-family: 'Vazirmatn', sans-serif !important;
}

/* Ensure RTL layout */
.nuxt-page {
  direction: rtl;
}

/* Improve font rendering */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

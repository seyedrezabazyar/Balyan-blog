<template>
  <NuxtLayout>
    <NuxtPage />
    <ClientOnly>
      <ToastContainer />
    </ClientOnly>
  </NuxtLayout>
</template>

<script setup>
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
    { name: 'keywords', content: 'بلیان, مقالات, آموزش, وبلاگ' },
    { property: 'og:title', content: 'بلیان - وبلاگ' },
    { property: 'og:description', content: 'مقالات و آموزش‌های تخصصی' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
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

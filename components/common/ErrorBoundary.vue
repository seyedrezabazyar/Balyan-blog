<!-- components/common/ErrorBoundary.vue -->
<template>
  <div v-if="hasError" class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <svg class="mx-auto h-24 w-24 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
      </div>
      
      <h1 class="text-2xl font-bold text-gray-900 mb-4">
        خطایی رخ داده است
      </h1>
      
      <p class="text-gray-600 mb-8">
        متأسفیم، در بارگذاری این صفحه مشکلی پیش آمده است.
      </p>
      
      <div class="space-y-3">
        <button
          @click="handleReload"
          class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          تلاش مجدد
        </button>
        
        <NuxtLink
          to="/"
          class="block w-full px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          بازگشت به صفحه اصلی
        </NuxtLink>
      </div>
      
      <details v-if="isDev" class="mt-8 text-right">
        <summary class="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
          جزئیات خطا
        </summary>
        <pre class="mt-4 p-4 bg-gray-100 rounded-lg text-xs text-gray-700 overflow-x-auto text-left">{{ error }}</pre>
      </details>
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const hasError = ref(false)
const error = ref<any>(null)
const isDev = process.env.NODE_ENV === 'development'

onErrorCaptured((err) => {
  hasError.value = true
  error.value = err
  
  // Log error to console in development
  if (isDev) {
    console.error('Error captured:', err)
  }
  
  // Send error to monitoring service in production
  if (!isDev && typeof window !== 'undefined') {
    // You can integrate with services like Sentry here
    // Example: Sentry.captureException(err)
  }
  
  return false // Prevent error propagation
})

const handleReload = () => {
  window.location.reload()
}
</script>
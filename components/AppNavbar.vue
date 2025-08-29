<template>
  <nav class="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b">
    <div class="max-w-7xl mx-auto px-4 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center gap-3">
            <img src="/images/logo.png" alt="بلیان" class="h-8 w-auto" />
          </NuxtLink>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8 space-x-reverse">
          <NuxtLink to="/" class="nav-link">مقالات</NuxtLink>
          <NuxtLink to="/category" class="nav-link">دسته‌بندی‌ها</NuxtLink>
          <NuxtLink to="/author" class="nav-link">نویسندگان</NuxtLink>
          <NuxtLink to="/publisher" class="nav-link">ناشران</NuxtLink>
          <NuxtLink to="/search" class="nav-link">جستجو</NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button @click="isOpen = !isOpen" class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="isOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="md:hidden bg-white border-t">
      <div class="px-4 py-2 space-y-1">
        <NuxtLink to="/" class="mobile-nav-link">مقالات</NuxtLink>
        <NuxtLink to="/category" class="mobile-nav-link">دسته‌بندی‌ها</NuxtLink>
        <NuxtLink to="/author" class="mobile-nav-link">نویسندگان</NuxtLink>
        <NuxtLink to="/publisher" class="mobile-nav-link">ناشران</NuxtLink>
        <NuxtLink to="/search" class="mobile-nav-link">جستجو</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
const isOpen = ref(false)
const route = useRoute()

// Close menu on route change
watch(() => route.path, () => {
  isOpen.value = false
})
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50;
}

.mobile-nav-link {
  @apply block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium;
}
</style>

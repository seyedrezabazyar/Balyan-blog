<template>
  <aside class="space-y-6">
    <!-- Search Box -->
    <div class="bg-white rounded-xl shadow-sm p-6">
      <h3 class="font-bold text-lg mb-4">جستجو</h3>
      <div class="relative">
        <input
          v-model="searchQuery"
          @keyup.enter="performSearch"
          type="text"
          placeholder="جستجو..."
          class="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          @click="performSearch"
          class="absolute left-3 top-3 text-gray-400 hover:text-blue-600"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Categories -->
    <div v-if="sidebarData?.categories?.length" class="bg-white rounded-xl shadow-sm p-6">
      <h3 class="font-bold text-lg mb-4">دسته‌بندی‌ها</h3>
      <ul class="space-y-2">
        <li v-for="category in sidebarData.categories" :key="category.id">
          <NuxtLink
            :to="`/category/${category.slug}`"
            class="flex items-center justify-between p-2 hover:bg-blue-50 rounded-lg transition-colors group"
          >
            <span class="group-hover:text-blue-600">{{ category.name }}</span>
            <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {{ formatNumber(category.books_count) }}
            </span>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- Recent Books -->
    <div v-if="sidebarData?.recent_books?.length" class="bg-white rounded-xl shadow-sm p-6">
      <h3 class="font-bold text-lg mb-4">کتاب‌های جدید</h3>
      <ul class="space-y-3">
        <li v-for="book in sidebarData.recent_books" :key="book.id">
          <NuxtLink :to="`/${book.slug}`" class="block hover:bg-gray-50 p-2 rounded-lg">
            <div class="flex gap-3">
              <div class="w-12 h-16 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center text-xs">
                <img
                  v-if="book.cover_image"
                  :src="book.cover_image"
                  :alt="book.title"
                  class="w-full h-full object-cover rounded"
                />
                <span v-else>📚</span>
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-medium text-sm line-clamp-2 mb-1">{{ book.title }}</h4>
                <p v-if="book.authors.length" class="text-xs text-gray-600">
                  {{ book.authors[0].name }}
                </p>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
// حذف TypeScript imports
const props = defineProps({
  sidebarData: {
    type: Object,
    default: null
  }
})

const searchQuery = ref('')

const formatNumber = (num) => {
  return new Intl.NumberFormat('fa-IR').format(num)
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`)
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

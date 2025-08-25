<!-- components/blog/BlogSidebar.vue -->
<template>
    <aside class="space-y-6">
        <!-- Search Box -->
        <div class="bg-white rounded-xl shadow-md p-6">
            <h3 class="font-bold text-lg mb-4 text-gray-900">جستجو در کتاب‌ها</h3>
            <div class="relative">
                <input
                    v-model="searchQuery"
                    @keyup.enter="performSearch"
                    type="text"
                    placeholder="جستجو..."
                    class="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <button
                    @click="performSearch"
                    class="absolute left-3 top-3 text-gray-400 hover:text-blue-600 transition-colors"
                >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Categories -->
        <div v-if="sidebarData?.categories?.length" class="bg-white rounded-xl shadow-md p-6">
            <h3 class="font-bold text-lg mb-4 text-gray-900">دسته‌بندی‌ها</h3>
            <ul class="space-y-2">
                <li v-for="category in sidebarData.categories" :key="category.id">
                    <NuxtLink
                        :to="`/category/${category.slug}`"
                        class="flex items-center justify-between text-gray-700 hover:text-blue-600 hover:bg-blue-50 py-2 px-3 rounded-lg transition-all group"
                    >
                        <span class="group-hover:translate-x-1 transition-transform">{{ category.name }}</span>
                        <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">
              {{ formatNumber(category.books_count) }}
            </span>
                    </NuxtLink>
                </li>
            </ul>
        </div>

        <!-- Recent Books -->
        <div v-if="sidebarData?.recent_books?.length" class="bg-white rounded-xl shadow-md p-6">
            <h3 class="font-bold text-lg mb-4 text-gray-900">کتاب‌های جدید</h3>
            <ul class="space-y-4">
                <li v-for="book in sidebarData.recent_books" :key="book.id">
                    <NuxtLink
                        :to="`/blog/${book.slug}`"
                        class="block hover:bg-gray-50 p-3 rounded-lg transition-colors group"
                    >
                        <div class="flex gap-3">
                            <img
                                v-if="book.cover_image"
                                :src="book.cover_image"
                                :alt="book.title"
                                class="w-12 h-16 object-cover rounded shadow-sm group-hover:shadow-md transition-shadow"
                            />
                            <div v-else class="w-12 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                                📚
                            </div>

                            <div class="flex-1 min-w-0">
                                <h4 class="font-medium text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                    {{ book.title }}
                                </h4>
                                <p v-if="book.authors.length" class="text-xs text-gray-600 mb-1">
                                    {{ book.authors[0].name }}
                                </p>
                                <div class="text-xs text-gray-500">
                                    {{ book.formatted_date }}
                                </div>
                            </div>
                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </div>

        <!-- Popular Books -->
        <div v-if="sidebarData?.popular_books?.length" class="bg-white rounded-xl shadow-md p-6">
            <h3 class="font-bold text-lg mb-4 text-gray-900">محبوب‌ترین کتاب‌ها</h3>
            <ul class="space-y-4">
                <li v-for="book in sidebarData.popular_books" :key="book.id">
                    <NuxtLink
                        :to="`/blog/${book.slug}`"
                        class="block hover:bg-gray-50 p-3 rounded-lg transition-colors group"
                    >
                        <div class="flex gap-3">
                            <img
                                v-if="book.cover_image"
                                :src="book.cover_image"
                                :alt="book.title"
                                class="w-12 h-16 object-cover rounded shadow-sm group-hover:shadow-md transition-shadow"
                            />
                            <div v-else class="w-12 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                                📚
                            </div>

                            <div class="flex-1 min-w-0">
                                <h4 class="font-medium text-sm text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                    {{ book.title }}
                                </h4>
                                <p v-if="book.authors.length" class="text-xs text-gray-600 mb-1">
                                    {{ book.authors[0].name }}
                                </p>
                                <div class="text-xs text-gray-500 flex items-center">
                                    <svg class="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                                    </svg>
                                    {{ formatNumber(book.view_count) }} بازدید
                                </div>
                            </div>
                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </div>

        <!-- Popular Authors -->
        <div v-if="sidebarData?.authors?.length" class="bg-white rounded-xl shadow-md p-6">
            <h3 class="font-bold text-lg mb-4 text-gray-900">نویسندگان محبوب</h3>
            <ul class="space-y-2">
                <li v-for="author in sidebarData.authors" :key="author.id">
                    <NuxtLink
                        :to="`/author/${author.id}`"
                        class="flex items-center justify-between text-gray-700 hover:text-blue-600 hover:bg-blue-50 py-2 px-3 rounded-lg transition-all group"
                    >
                        <span class="group-hover:translate-x-1 transition-transform">{{ author.name }}</span>
                        <span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full group-hover:bg-blue-100 group-hover:text-blue-600 transition-all">
              {{ formatNumber(author.books_count) }}
            </span>
                    </NuxtLink>
                </li>
            </ul>
        </div>

        <!-- Statistics -->
        <div v-if="sidebarData?.statistics" class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md p-6">
            <h3 class="font-bold text-lg mb-4 text-gray-900">آمار کتابخانه</h3>
            <ul class="space-y-3 text-sm">
                <li class="flex justify-between items-center">
          <span class="text-gray-600 flex items-center">
            <svg class="w-4 h-4 ml-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            تعداد کتاب‌ها
          </span>
                    <span class="font-medium text-blue-600">{{ formatNumber(sidebarData.statistics.total_books) }}</span>
                </li>
                <li class="flex justify-between items-center">
          <span class="text-gray-600 flex items-center">
            <svg class="w-4 h-4 ml-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
            تعداد نویسندگان
          </span>
                    <span class="font-medium text-green-600">{{ formatNumber(sidebarData.statistics.total_authors) }}</span>
                </li>
                <li class="flex justify-between items-center">
          <span class="text-gray-600 flex items-center">
            <svg class="w-4 h-4 ml-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8z" clip-rule="evenodd" />
            </svg>
            تعداد دسته‌ها
          </span>
                    <span class="font-medium text-purple-600">{{ formatNumber(sidebarData.statistics.total_categories) }}</span>
                </li>
                <li class="flex justify-between items-center">
          <span class="text-gray-600 flex items-center">
            <svg class="w-4 h-4 ml-2 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
            </svg>
            مجموع بازدید
          </span>
                    <span class="font-medium text-orange-600">{{ formatNumber(sidebarData.statistics.total_views) }}</span>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script setup lang="ts">
import type { SidebarData } from '~/types/blog'

interface Props {
    sidebarData: SidebarData | null
}

defineProps<Props>()

const searchQuery = ref('')

const formatNumber = (num: number): string => {
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

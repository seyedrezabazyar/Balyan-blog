<!-- pages/search.vue - صفحه جستجو -->
<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Search Header -->
        <section class="bg-white border-b border-gray-200 py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h1 class="text-3xl font-bold text-gray-900 mb-6">جستجو در کتاب‌ها</h1>

                    <!-- Search Form -->
                    <div class="max-w-2xl mx-auto">
                        <div class="relative">
                            <input
                                v-model="searchQuery"
                                @keyup.enter="performSearch"
                                type="text"
                                placeholder="جستجو در کتاب‌ها..."
                                class="w-full px-6 py-4 pr-16 text-lg border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all shadow-sm"
                            />
                            <button
                                @click="performSearch"
                                :disabled="searching"
                                class="absolute left-4 top-4 text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-50"
                            >
                                <svg v-if="!searching" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                                <div v-else class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Search Results -->
        <section class="py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Results Header -->
                <div v-if="hasSearched" class="mb-8">
                    <div class="bg-white rounded-xl shadow-md p-6">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h2 class="text-xl font-bold text-gray-900">
                                    نتایج جستجو برای "{{ currentQuery }}"
                                </h2>
                                <p v-if="total !== undefined" class="text-gray-600 mt-1">
                                    {{ formatNumber(total) }} کتاب یافت شد
                                </p>
                            </div>

                            <!-- Sort Options -->
                            <div class="flex gap-3">
                                <select
                                    v-model="sortBy"
                                    @change="performSearch"
                                    class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                                >
                                    <option value="">مرتبط‌ترین</option>
                                    <option value="newest">جدیدترین</option>
                                    <option value="popular">محبوب‌ترین</option>
                                    <option value="title">الفبایی</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="searching" class="flex justify-center py-16">
                    <div class="text-center">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p class="text-gray-600">در حال جستجو...</p>
                    </div>
                </div>

                <!-- Search Results -->
                <div v-else-if="hasSearched && books.length" class="space-y-8">
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <BookCard v-for="book in books" :key="book.id" :book="book" />
                    </div>

                    <!-- Pagination -->
                    <div v-if="totalPages > 1" class="mt-12">
                        <nav class="flex justify-center">
                            <div class="flex space-x-2 space-x-reverse">
                                <button
                                    v-if="currentPage > 1"
                                    @click="goToPage(currentPage - 1)"
                                    class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    قبلی
                                </button>

                                <template v-for="page in visiblePages" :key="page">
                                    <button
                                        v-if="page === '...'"
                                        disabled
                                        class="px-4 py-2 text-gray-500 bg-white border border-gray-300 rounded-lg cursor-not-allowed"
                                    >
                                        ...
                                    </button>
                                    <button
                                        v-else
                                        @click="goToPage(page)"
                                        :class="[
                                            'px-4 py-2 border rounded-lg transition-colors',
                                            page === currentPage
                                                ? 'bg-blue-600 text-white border-blue-600'
                                                : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                                        ]"
                                    >
                                        {{ page }}
                                    </button>
                                </template>

                                <button
                                    v-if="currentPage < totalPages"
                                    @click="goToPage(currentPage + 1)"
                                    class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    بعدی
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>

                <!-- No Results -->
                <div v-else-if="hasSearched && !books.length" class="text-center py-16">
                    <div class="text-6xl mb-6">🔍</div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">نتیجه‌ای یافت نشد</h3>
                    <p class="text-gray-600 mb-6 max-w-md mx-auto">
                        متاسفانه کتابی با عبارت جستجوی "{{ currentQuery }}" پیدا نشد.
                    </p>
                    <NuxtLink
                        to="/"
                        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                    >
                        بازگشت به صفحه اصلی
                    </NuxtLink>
                </div>

                <!-- Initial State -->
                <div v-else class="text-center py-16">
                    <div class="text-6xl mb-6">📚</div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">جستجو در کتابخانه</h3>
                    <p class="text-gray-600 mb-8 max-w-md mx-auto">
                        در میان هزاران کتاب موجود در کتابخانه ما جستجو کنید
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
// Meta
useHead({
    title: 'جستجو در کتابخانه',
    meta: [
        { name: 'description', content: 'جستجو در مجموعه کتاب‌های موجود در کتابخانه' }
    ]
})

// Route and query
const route = useRoute()

// Data
const searchQuery = ref('')
const currentQuery = ref('')
const books = ref([])
const searching = ref(false)
const hasSearched = ref(false)
const sortBy = ref('')
const currentPage = ref(1)
const totalPages = ref(1)
const total = ref(0)

// Computed
const visiblePages = computed(() => {
    const pages = []
    const totalPgs = totalPages.value
    const current = currentPage.value

    if (totalPgs <= 7) {
        for (let i = 1; i <= totalPgs; i++) {
            pages.push(i)
        }
    } else {
        pages.push(1)

        if (current > 4) {
            pages.push('...')
        }

        const start = Math.max(2, current - 1)
        const end = Math.min(totalPgs - 1, current + 1)

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (current < totalPgs - 3) {
            pages.push('...')
        }

        if (totalPgs > 1) {
            pages.push(totalPgs)
        }
    }

    return pages
})

// Methods
const formatNumber = (num) => {
    return new Intl.NumberFormat('fa-IR').format(num)
}

const performSearch = async () => {
    const query = searchQuery.value.trim()
    if (!query || query.length < 2) return

    searching.value = true
    currentQuery.value = query
    hasSearched.value = true
    currentPage.value = 1

    try {
        const response = await $fetch('/api/v1/blog/search', {
            query: {
                q: query,
                per_page: 16,
                ...(sortBy.value && { sort: sortBy.value })
            }
        })

        if (response?.success) {
            books.value = response.data || []
            totalPages.value = response.meta?.last_page || 1
            total.value = response.meta?.total || 0
        } else {
            books.value = []
        }

        // Update URL without navigation
        await navigateTo({
            path: '/search',
            query: {
                q: query,
                ...(sortBy.value && { sort: sortBy.value })
            }
        }, { replace: true })
    } catch (error) {
        console.error('Error searching books:', error)
        books.value = []
    } finally {
        searching.value = false
    }
}

const goToPage = async (page) => {
    if (typeof page !== 'number' || !currentQuery.value) return

    searching.value = true
    currentPage.value = page

    try {
        const response = await $fetch('/api/v1/blog/search', {
            query: {
                q: currentQuery.value,
                page: page,
                per_page: 16,
                ...(sortBy.value && { sort: sortBy.value })
            }
        })

        if (response?.success) {
            books.value = response.data || []
            totalPages.value = response.meta?.last_page || 1
        }

        window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
        console.error('Error loading page:', error)
    } finally {
        searching.value = false
    }
}

// Initialize from URL query
onMounted(() => {
    const queryParam = route.query.q
    if (queryParam && typeof queryParam === 'string') {
        searchQuery.value = queryParam
        if (route.query.sort && typeof route.query.sort === 'string') {
            sortBy.value = route.query.sort
        }
        performSearch()
    }
})
</script>



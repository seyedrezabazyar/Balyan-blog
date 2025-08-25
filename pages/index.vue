<!-- pages/index.vue - صفحه اصلی -->
<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Header with Search -->
        <section class="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h1 class="text-4xl md:text-5xl font-bold mb-4">کتابخانه دیجیتال</h1>
                    <p class="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                        جستجو و مطالعه بهترین کتاب‌ها
                    </p>

                    <!-- Modern Search Box -->
                    <div class="max-w-xl mx-auto">
                        <div class="relative group">
                            <!-- Search Input -->
                            <input
                                v-model="searchQuery"
                                @keyup.enter="performSearch"
                                @focus="searchFocused = true"
                                @blur="searchFocused = false"
                                type="text"
                                placeholder="جستجو..."
                                class="w-full px-5 py-3.5 pr-12 text-gray-800 bg-white/95 backdrop-blur-sm rounded-2xl 
                                       border-2 border-white/50 shadow-xl shadow-blue-900/10
                                       placeholder:text-gray-400 text-base
                                       focus:outline-none focus:border-white focus:bg-white 
                                       transition-all duration-300 ease-out"
                            />
                            
                            <!-- Search Icon -->
                            <button
                                @click="performSearch"
                                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 
                                       transition-colors duration-200 p-2"
                                :class="{ 'text-blue-600': searchFocused || searchQuery }"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                            
                            <!-- Clear Button (shows when there's text) -->
                            <Transition
                                enter-active-class="transition-opacity duration-200"
                                leave-active-class="transition-opacity duration-200"
                                enter-from-class="opacity-0"
                                leave-to-class="opacity-0"
                            >
                                <button
                                    v-if="searchQuery"
                                    @click="searchQuery = ''"
                                    class="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 
                                           transition-colors duration-200 p-1"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </Transition>
                            
                            <!-- Keyboard Shortcut Hint -->
                            <!-- Removed the keyboard hint to improve appearance -->
                        </div>
                        
                        <!-- Quick Search Suggestions -->
                        <div class="mt-4 flex flex-wrap justify-center gap-2">
                            <button
                                v-for="tag in ['رمان', 'علمی', 'تاریخی', 'روانشناسی']"
                                :key="tag"
                                @click="searchQuery = tag; performSearch()"
                                class="px-3 py-1.5 text-sm text-white/90 bg-white/20 backdrop-blur-sm rounded-full
                                       border border-white/30 hover:bg-white/30 hover:text-white
                                       transition-all duration-200"
                            >
                                {{ tag }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Main Content -->
        <section class="py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Loading State -->
                <div v-if="pending" class="flex justify-center py-12">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>

                <!-- Books Grid - 4 columns -->
                <div v-else-if="books?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <BookCard v-for="book in books" :key="book.id" :book="book" />
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-16 bg-white rounded-xl shadow-sm">
                    <div class="text-6xl mb-4">📚</div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">
                        کتابی یافت نشد
                    </h3>
                    <p class="text-gray-600">
                        هنوز کتابی در کتابخانه منتشر نشده است.
                    </p>
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
        </section>
    </div>
</template>

<script setup>
// Meta
useHead({
    title: 'کتابخانه - بلیان',
    meta: [
        { name: 'description', content: 'کتابخانه دیجیتال بلیان - جستجو و مطالعه بهترین کتاب‌ها' }
    ]
})

// Data
const books = ref([])
const pending = ref(true)
const searchQuery = ref('')
const searchFocused = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const perPage = 16

// Computed
const visiblePages = computed(() => {
    const pages = []
    const total = totalPages.value
    const current = currentPage.value

    if (total <= 7) {
        for (let i = 1; i <= total; i++) {
            pages.push(i)
        }
    } else {
        pages.push(1)

        if (current > 4) {
            pages.push('...')
        }

        const start = Math.max(2, current - 1)
        const end = Math.min(total - 1, current + 1)

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (current < total - 3) {
            pages.push('...')
        }

        if (total > 1) {
            pages.push(total)
        }
    }

    return pages
})

// Methods
const fetchBooks = async () => {
    try {
        pending.value = true

        const response = await $fetch('/api/v1/blog', {
            query: {
                page: currentPage.value,
                per_page: perPage
            }
        })

        if (response?.success) {
            books.value = response.data || []
            totalPages.value = response.meta?.last_page || 1
        } else {
            books.value = []
        }
    } catch (error) {
        console.error('Error fetching books:', error)
        books.value = []
    } finally {
        pending.value = false
    }
}

const performSearch = () => {
    if (searchQuery.value.trim()) {
        navigateTo(`/search?q=${encodeURIComponent(searchQuery.value.trim())}`)
    }
}

const goToPage = (page) => {
    if (typeof page === 'number') {
        currentPage.value = page
        fetchBooks()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

// Initialize
onMounted(() => {
    fetchBooks()
})
</script>


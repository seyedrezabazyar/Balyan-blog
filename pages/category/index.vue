<!-- pages/category/index.vue - لیست دسته‌بندی‌ها -->
<template>
    <div v-if="pending" class="min-h-screen flex items-center justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else class="min-h-screen bg-gray-50">
        <!-- Header -->
        <section class="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h1 class="text-4xl md:text-5xl font-bold mb-4">
                        دسته‌بندی کتاب‌ها
                    </h1>
                    <p class="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
                        مجموعه کامل دسته‌بندی‌های کتابخانه را مرور کنید
                    </p>
                    <div class="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                        <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                        </svg>
                        <span class="font-medium">
                            {{ formatNumber(actualCategoriesCount) }} دسته‌بندی
                        </span>
                    </div>gs
                </div>
            </div>
        </section>

        <!-- Breadcrumb -->
        <nav class="bg-white border-b border-gray-200 py-4">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ol class="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                    <li>
                        <NuxtLink to="/" class="hover:text-blue-600 transition-colors">خانه</NuxtLink>
                    </li>
                    <li>/</li>
                    <li class="text-gray-900 font-medium">دسته‌بندی‌ها</li>
                </ol>
            </div>
        </nav>

        <!-- Error Message -->
        <div v-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                <div class="flex items-center">
                    <svg class="w-5 h-5 text-red-600 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                    <span class="text-red-800">{{ error }}</span>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <section class="py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Categories Grid -->
                <div v-if="categories.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <NuxtLink
                        v-for="category in categories"
                        :key="category.id"
                        :to="`/category/${category.slug}`"
                        class="group"
                    >
                        <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                            <!-- Category Image or Icon -->
                            <div class="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 relative overflow-hidden">
                                <div class="absolute inset-0 bg-black/10"></div>
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <div class="text-white/20 group-hover:text-white/30 transition-colors">
                                        <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                        </svg>
                                    </div>
                                </div>
                                <!-- Books Count Badge -->
                                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                                    <span class="text-sm font-medium text-gray-800">
                                        {{ formatNumber(category.books_count || 0) }} کتاب
                                    </span>
                                </div>
                            </div>

                            <!-- Category Info -->
                            <div class="p-6">
                                <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {{ category.name }}
                                </h3>
                                <p v-if="category.description" class="text-gray-600 text-sm line-clamp-3 mb-4">
                                    {{ category.description }}
                                </p>
                                <p v-else class="text-gray-400 text-sm italic mb-4">
                                    بدون توضیحات
                                </p>

                                <!-- View More Link -->
                                <div class="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                                    <span>مشاهده کتاب‌ها</span>
                                    <svg class="w-4 h-4 mr-1 transform group-hover:translate-x-[-4px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </NuxtLink>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-16 bg-white rounded-xl shadow-md">
                    <div class="text-6xl mb-4">📂</div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">
                        دسته‌بندی یافت نشد
                    </h3>
                    <p class="text-gray-600 mb-6">
                        در حال حاضر هیچ دسته‌بندی فعالی در سیستم وجود ندارد
                    </p>
                    <button
                        @click="refreshCategories"
                        class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        تلاش مجدد
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
// Meta
useHead({
    title: 'دسته‌بندی کتاب‌ها',
    meta: [
        {
            name: 'description',
            content: 'مشاهده همه دسته‌بندی‌های کتابخانه و انتخاب کتاب‌های مورد علاقه'
        },
        { name: 'keywords', content: 'دسته‌بندی, کتاب, کتابخانه' }
    ]
})

// Data
const categories = ref([])
const pending = ref(true)
const error = ref(null)
const isRefreshing = ref(false)

const { getCategories } = useBlogApi()

// Computed
const actualCategoriesCount = computed(() => {
    return categories.value.length
})

// Methods
const formatNumber = (num) => {
    return new Intl.NumberFormat('fa-IR').format(num)
}

const fetchCategories = async (forceRefresh = false) => {
    try {
        error.value = null

        // Add timestamp to force fresh data
        const params = forceRefresh ? { _t: Date.now() } : {}
        const response = await getCategories(params)

        if (response?.success) {
            categories.value = response.data || []
            console.log(`Loaded ${categories.value.length} categories`)
        } else {
            // If success is false, treat as empty
            categories.value = []
            if (response?.message) {
                error.value = response.message
            }
        }
    } catch (err) {
        console.error('Error fetching categories:', err)
        error.value = 'خطا در دریافت دسته‌بندی‌ها. لطفاً دوباره تلاش کنید.'
        categories.value = []
    } finally {
        pending.value = false
        isRefreshing.value = false
    }
}

const refreshCategories = async () => {
    isRefreshing.value = true
    await fetchCategories(true)
}

// Initialize
onMounted(() => {
    fetchCategories()
})

// Auto refresh every 30 seconds if page is visible
let refreshInterval = null
onMounted(() => {
    if (process.client) {
        refreshInterval = setInterval(() => {
            if (!document.hidden) {
                fetchCategories(true)
            }
        }, 30000)
    }
})

onUnmounted(() => {
    if (refreshInterval) {
        clearInterval(refreshInterval)
    }
})
</script>

<style scoped>
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>

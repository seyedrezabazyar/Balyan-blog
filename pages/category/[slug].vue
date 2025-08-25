<!-- pages/category/[slug].vue - کتاب‌های یک دسته‌بندی -->
<template>
    <div v-if="pending" class="min-h-screen flex items-center justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="category" class="min-h-screen bg-gray-50">
        <!-- Category Header -->
        <section class="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h1 class="text-4xl md:text-5xl font-bold mb-4">
                        {{ category.name }}
                    </h1>
                    <p v-if="category.description" class="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
                        {{ category.description }}
                    </p>
                    <div class="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                        <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        </svg>
                        <span class="font-medium">
                            {{ formatNumber(totalBooks || 0) }} کتاب در این دسته
                        </span>
                    </div>
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
                    <li>
                        <NuxtLink to="/category" class="hover:text-blue-600 transition-colors">دسته‌بندی‌ها</NuxtLink>
                    </li>
                    <li>/</li>
                    <li class="text-gray-900 font-medium">{{ category.name }}</li>
                </ol>
            </div>
        </nav>

        <!-- Main Content -->
        <section class="py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Filters -->
                <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <h2 class="text-xl font-bold text-gray-900">
                            کتاب‌های دسته {{ category.name }}
                        </h2>

                        <div class="flex flex-wrap gap-3">
                            <select
                                v-model="filters.sort"
                                @change="fetchCategoryBooks"
                                class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                            >
                                <option value="newest">جدیدترین</option>
                                <option value="oldest">قدیمی‌ترین</option>
                                <option value="popular">محبوب‌ترین</option>
                                <option value="title">الفبایی</option>
                            </select>

                            <select
                                v-model="filters.language"
                                @change="fetchCategoryBooks"
                                class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                            >
                                <option value="">همه زبان‌ها</option>
                                <option value="fa">فارسی</option>
                                <option value="en">انگلیسی</option>
                                <option value="ar">عربی</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="loading" class="flex justify-center py-12">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>

                <!-- Books Grid -->
                <div v-else-if="books.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <BookCard v-for="book in books" :key="book.id" :book="book" />
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-16">
                    <div class="text-6xl mb-4">📚</div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">
                        کتابی در این دسته یافت نشد
                    </h3>
                    <p class="text-gray-600 mb-6">
                        هنوز کتابی در دسته {{ category.name }} منتشر نشده است.
                    </p>
                    <NuxtLink
                        to="/"
                        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        مشاهده همه کتاب‌ها
                    </NuxtLink>
                </div>

                <!-- Pagination -->
                <div v-if="pagination && pagination.last_page > 1" class="mt-12">
                    <nav class="flex justify-center">
                        <div class="flex space-x-2 space-x-reverse">
                            <button
                                v-if="pagination.current_page > 1"
                                @click="goToPage(pagination.current_page - 1)"
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
                                        page === pagination.current_page
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                                    ]"
                                >
                                    {{ page }}
                                </button>
                            </template>

                            <button
                                v-if="pagination.current_page < pagination.last_page"
                                @click="goToPage(pagination.current_page + 1)"
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

    <!-- 404 Error -->
    <div v-else class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="text-center">
            <div class="text-6xl mb-4">📂</div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">دسته‌بندی یافت نشد</h1>
            <p class="text-gray-600 mb-6">دسته‌بندی مورد نظر شما وجود ندارد</p>
            <NuxtLink
                to="/category"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
                مشاهده همه دسته‌بندی‌ها
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
// Get route params
const route = useRoute()
const slug = route.params.slug

// Data
const category = ref(null)
const books = ref([])
const pagination = ref(null)
const pending = ref(true)
const loading = ref(false)
const totalBooks = ref(0)

// Filters
const filters = reactive({
    sort: 'newest',
    language: '',
    page: 1
})

// API
const blogApi = useBlogApi()

// Computed
const visiblePages = computed(() => {
    if (!pagination.value) return []

    const current = pagination.value.current_page
    const last = pagination.value.last_page
    const pages = []

    if (last <= 7) {
        for (let i = 1; i <= last; i++) {
            pages.push(i)
        }
    } else {
        pages.push(1)

        if (current > 4) {
            pages.push('...')
        }

        const start = Math.max(2, current - 1)
        const end = Math.min(last - 1, current + 1)

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        if (current < last - 3) {
            pages.push('...')
        }

        if (last > 1) {
            pages.push(last)
        }
    }

    return pages
})

// Methods
const formatNumber = (num) => {
    return new Intl.NumberFormat('fa-IR').format(num || 0)
}

const fetchCategoryBooks = async () => {
    try {
        loading.value = true

        const params = {
            sort: filters.sort,
            language: filters.language,
            page: filters.page,
            per_page: 16
        }

        const response = await blogApi.getBooksByCategory(slug, params)

        if (response?.success) {
            category.value = response.data?.category || null
            books.value = response.data?.books || []
            pagination.value = response.meta || null
            totalBooks.value = response.meta?.total || response.data?.books?.length || 0
        } else {
            category.value = null
            books.value = []
            pagination.value = null
            totalBooks.value = 0
        }
    } catch (error) {
        console.error('Error fetching category books:', error)
        category.value = null
        books.value = []
        pagination.value = null
        totalBooks.value = 0
    } finally {
        loading.value = false
        pending.value = false
    }
}

const goToPage = (page) => {
    if (typeof page === 'number') {
        filters.page = page
        fetchCategoryBooks()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

// Meta tags
watchEffect(() => {
    if (category.value) {
        useHead({
            title: `کتاب‌های دسته ${category.value.name}`,
            meta: [
                {
                    name: 'description',
                    content: category.value.description || `مجموعه کتاب‌های دسته ${category.value.name}`
                },
                { name: 'keywords', content: `${category.value.name}, کتاب, کتابخانه` }
            ]
        })
    }
})

// Watch filters
watch(() => filters.sort, () => {
    filters.page = 1
    fetchCategoryBooks()
})

watch(() => filters.language, () => {
    filters.page = 1
    fetchCategoryBooks()
})

// Initialize
onMounted(() => {
    fetchCategoryBooks()
})
</script>

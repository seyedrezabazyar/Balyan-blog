<!-- pages/publisher/[slug].vue - صفحه نمایش ناشر با داده‌های واقعی -->
<template>
    <div v-if="pending" class="min-h-screen flex items-center justify-center">
        <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p class="text-gray-600">در حال بارگذاری اطلاعات ناشر...</p>
        </div>
    </div>

    <div v-else-if="publisher" class="min-h-screen bg-gray-50">
        <!-- Publisher Header با طراحی بهتر -->
        <section class="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-20 relative overflow-hidden">
            <!-- پترن پس‌زمینه -->
            <div class="absolute inset-0 opacity-10">
                <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="5" cy="5" r="1" fill="currentColor"/>
                    </pattern>
                    <rect width="100" height="100" fill="url(#grid)"/>
                </svg>
            </div>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div class="grid lg:grid-cols-2 gap-8 items-center">
                    <!-- Publisher Info -->
                    <div class="text-center lg:text-right">
                        <div class="flex items-center justify-center lg:justify-start mb-6">
                            <div v-if="publisher.logo_path" class="w-24 h-24 bg-white rounded-2xl p-2 shadow-xl">
                                <img
                                    :src="publisher.logo_path"
                                    :alt="publisher.name"
                                    class="w-full h-full object-contain"
                                />
                            </div>
                            <div v-else class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                                <svg class="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                                </svg>
                            </div>
                            <!-- Verified Badge -->
                            <div v-if="publisher.is_verified" class="mr-3">
                                <div class="bg-green-500 text-white px-3 py-1.5 rounded-full shadow-lg flex items-center" title="ناشر تایید شده">
                                    <svg class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                    تایید شده
                                </div>
                            </div>
                        </div>

                        <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ publisher.name }}</h1>
                        <p v-if="publisher.name_fa && publisher.name_fa !== publisher.name" class="text-xl text-purple-100 mb-4">
                            {{ publisher.name_fa }}
                        </p>
                        <p v-if="publisher.description" class="text-lg text-purple-100 mb-6 leading-relaxed">
                            {{ publisher.description }}
                        </p>

                        <!-- Publisher Actions -->
                        <div class="flex flex-wrap gap-3 justify-center lg:justify-start">
                            <a
                                v-if="publisher.website"
                                :href="publisher.website"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-lg transition-all"
                            >
                                <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd"/>
                                </svg>
                                وب‌سایت رسمی
                            </a>
                            <button
                                @click="sharePublisher"
                                class="inline-flex items-center bg-white/20 hover:bg-white/30 backdrop-blur-sm px-5 py-2.5 rounded-lg transition-all"
                            >
                                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m9.032 4.026A9.001 9.001 0 012.968 7.326m9.032 4.026c-.202.404-.316.86-.316 1.342 0 .482.114.938.316 1.342"/>
                                </svg>
                                اشتراک‌گذاری
                            </button>
                        </div>
                    </div>

                    <!-- Statistics Cards -->
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all">
                            <div class="text-3xl font-bold mb-2">{{ formatNumber(totalBooks || 0) }}</div>
                            <div class="text-purple-100 flex items-center justify-center">
                                <svg class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H4v10a2 2 0 002 2h8a2 2 0 002-2V5h-2a1 1 0 100-2 2 2 0 012 2v10a4 4 0 01-4 4H6a4 4 0 01-4-4V5z" clip-rule="evenodd"/>
                                </svg>
                                کتاب منتشر شده
                            </div>
                        </div>
                        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all">
                            <div class="text-3xl font-bold mb-2">{{ formatNumber(authorCount) }}</div>
                            <div class="text-purple-100 flex items-center justify-center">
                                <svg class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                                </svg>
                                نویسنده
                            </div>
                        </div>
                        <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all">
                            <div class="text-3xl font-bold mb-2">{{ formatNumber(categoryCount) }}</div>
                            <div class="text-purple-100 flex items-center justify-center">
                                <svg class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                                </svg>
                                دسته‌بندی
                            </div>
                        </div>
                        <div v-if="publisher.created_at" class="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all">
                            <div class="text-3xl font-bold mb-2">{{ getYearsSince(publisher.created_at) }}</div>
                            <div class="text-purple-100 flex items-center justify-center">
                                <svg class="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                                </svg>
                                سال فعالیت
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Breadcrumb -->
        <nav class="bg-white border-b border-gray-200 py-4 shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ol class="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                    <li>
                        <NuxtLink to="/" class="hover:text-indigo-600 transition-colors flex items-center">
                            <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                            </svg>
                            خانه
                        </NuxtLink>
                    </li>
                    <li class="text-gray-400">/</li>
                    <li>
                        <NuxtLink to="/publisher" class="hover:text-indigo-600 transition-colors">ناشران</NuxtLink>
                    </li>
                    <li class="text-gray-400">/</li>
                    <li class="text-gray-900 font-medium">{{ publisher.name }}</li>
                </ol>
            </div>
        </nav>

        <!-- Main Content -->
        <section class="py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Filters با طراحی بهتر -->
                <div class="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900 mb-2">کتاب‌های منتشر شده</h2>
                            <p class="text-gray-600">مجموعه آثار {{ publisher.name }}</p>
                        </div>
                        <div class="flex flex-wrap gap-3">
                            <!-- Sort Dropdown -->
                            <select
                                v-model="filters.sort"
                                @change="fetchPublisherBooks"
                                class="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 text-sm bg-white hover:border-gray-300 transition-colors"
                            >
                                <option value="newest">جدیدترین</option>
                                <option value="oldest">قدیمی‌ترین</option>
                                <option value="popular">محبوب‌ترین</option>
                                <option value="title">الفبایی</option>
                            </select>
                            <!-- Language Filter -->
                            <select
                                v-model="filters.language"
                                @change="fetchPublisherBooks"
                                class="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500 text-sm bg-white hover:border-gray-300 transition-colors"
                            >
                                <option value="">همه زبان‌ها</option>
                                <option value="fa">فارسی</option>
                                <option value="en">انگلیسی</option>
                                <option value="ar">عربی</option>
                            </select>
                            <!-- View Mode Toggle -->
                            <div class="flex bg-gray-100 rounded-lg p-1">
                                <button
                                    @click="viewMode = 'grid'"
                                    :class="[
                                        'px-3 py-1.5 rounded transition-all',
                                        viewMode === 'grid'
                                            ? 'bg-white shadow-sm text-indigo-600'
                                            : 'text-gray-600 hover:text-gray-900'
                                    ]"
                                >
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                                    </svg>
                                </button>
                                <button
                                    @click="viewMode = 'list'"
                                    :class="[
                                        'px-3 py-1.5 rounded transition-all',
                                        viewMode === 'list'
                                            ? 'bg-white shadow-sm text-indigo-600'
                                            : 'text-gray-600 hover:text-gray-900'
                                    ]"
                                >
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="loading" class="flex justify-center py-12">
                    <div class="text-center">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                        <p class="text-gray-600">در حال بارگذاری کتاب‌ها...</p>
                    </div>
                </div>

                <!-- Books Grid/List -->
                <div v-else-if="books.length">
                    <!-- Grid View -->
                    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        <BookCard v-for="book in books" :key="book.id" :book="book" />
                    </div>

                    <!-- List View -->
                    <div v-else class="space-y-4 mb-8">
                        <BookListItem v-for="book in books" :key="book.id" :book="book" />
                    </div>

                    <!-- Pagination -->
                    <div v-if="pagination && pagination.last_page > 1" class="flex justify-center">
                        <nav class="flex items-center gap-1">
                            <button
                                @click="goToPage(pagination.current_page - 1)"
                                :disabled="pagination.current_page === 1"
                                class="px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                </svg>
                            </button>

                            <template v-for="page in visiblePages" :key="page">
                                <span v-if="page === '...'" class="px-3 py-2 text-gray-400">...</span>
                                <button
                                    v-else
                                    @click="goToPage(page)"
                                    :class="[
                                        'px-4 py-2 rounded-lg transition-colors',
                                        page === pagination.current_page
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    ]"
                                >
                                    {{ formatNumber(page) }}
                                </button>
                            </template>

                            <button
                                @click="goToPage(pagination.current_page + 1)"
                                :disabled="pagination.current_page === pagination.last_page"
                                class="px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                                </svg>
                            </button>
                        </nav>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-16 bg-white rounded-2xl shadow-md">
                    <div class="text-6xl mb-4">📚</div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">کتابی یافت نشد</h3>
                    <p class="text-gray-600">هنوز کتابی از این ناشر ثبت نشده است.</p>
                </div>
            </div>
        </section>
    </div>

    <!-- 404 State -->
    <div v-else class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="text-center">
            <div class="text-6xl mb-4">🔍</div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">ناشر یافت نشد</h1>
            <p class="text-gray-600 mb-6">متأسفانه ناشر مورد نظر شما پیدا نشد.</p>
            <NuxtLink
                to="/publisher"
                class="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
                <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
                </svg>
                بازگشت به لیست ناشران
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Book } from '@/types/blog'

// Route
const route = useRoute()
const slug = route.params.slug as string

// Data
const publisher = ref(null)
const books = ref<Book[]>([])
const pagination = ref(null)
const totalBooks = ref(0)
const pending = ref(true)
const loading = ref(false)
const viewMode = ref('grid')
const authorCount = ref(0)
const categoryCount = ref(0)

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
        for (let i = 1; i <= last; i++) pages.push(i)
    } else {
        pages.push(1)
        if (current > 4) pages.push('...')
        const start = Math.max(2, current - 1)
        const end = Math.min(last - 1, current + 1)
        for (let i = start; i <= end; i++) pages.push(i)
        if (current < last - 3) pages.push('...')
        if (last > 1) pages.push(last)
    }
    return pages
})

// Methods
const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('fa-IR').format(num || 0)
}

const fetchPublisherBooks = async () => {
    try {
        loading.value = true

        const params = {
            sort: filters.sort,
            language: filters.language,
            page: filters.page,
            per_page: 16
        }

        const response = await blogApi.getBooksByPublisher(slug, params)

        if (response?.success && response.data) {
            publisher.value = response.data.publisher || null
            books.value = response.data.books || []
            pagination.value = response.meta || null
            totalBooks.value = response.meta?.total || response.data.books?.length || 0

            // Calculate unique authors and categories from books
            if (books.value.length > 0) {
                const uniqueAuthors = new Set()
                const uniqueCategories = new Set()

                books.value.forEach(book => {
                    if (book.authors) {
                        book.authors.forEach(author => uniqueAuthors.add(author.id))
                    }
                    if (book.category) {
                        uniqueCategories.add(book.category.id)
                    }
                })

                authorCount.value = uniqueAuthors.size
                categoryCount.value = uniqueCategories.size
            }
        } else {
            publisher.value = null
            books.value = []
            pagination.value = null
            totalBooks.value = 0
            authorCount.value = 0
            categoryCount.value = 0
        }
    } catch (error) {
        console.error('Error fetching publisher books:', error)
        publisher.value = null
        books.value = []
        pagination.value = null
        totalBooks.value = 0
        authorCount.value = 0
        categoryCount.value = 0
    } finally {
        loading.value = false
        pending.value = false
    }
}

const goToPage = (page: number | string) => {
    if (typeof page === 'number') {
        filters.page = page
        fetchPublisherBooks()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

// Meta tags
watchEffect(() => {
    if (publisher.value) {
        useHead({
            title: `کتاب‌های ${publisher.value.name}`,
            meta: [
                {
                    name: 'description',
                    content: publisher.value.description || `مجموعه آثار منتشر شده توسط ${publisher.value.name}`
                },
                { name: 'keywords', content: `${publisher.value.name}, ناشر, کتاب` }
            ]
        })
    }
})

// Watch filters
watch(() => filters.sort, () => {
    filters.page = 1
    fetchPublisherBooks()
})

watch(() => filters.language, () => {
    filters.page = 1
    fetchPublisherBooks()
})

// Initialize
onMounted(() => {
    fetchPublisherBooks()
})

// Share functionality
const sharePublisher = () => {
    if (publisher.value) {
        const url = `${window.location.origin}/publisher/${slug}`
        const title = `کتاب‌های ${publisher.value.name}`
        const text = `مجموعه آثار منتشر شده توسط ${publisher.value.name} را ببینید!`

        if (navigator.share) {
            navigator.share({
                title: title,
                text: text,
                url: url
            }).catch(error => {
                console.error('Error sharing publisher:', error)
            })
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(url).then(() => {
                // You can show a toast here
                console.log('Link copied to clipboard')
            }).catch(() => {
                console.log('Could not copy link')
            })
        }
    }
}

// Helper to get years since a date
const getYearsSince = (dateString: string): number => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInTime = now.getTime() - date.getTime()
    const diffInYears = diffInTime / (1000 * 3600 * 24 * 365.25)
    return Math.floor(diffInYears)
}
</script>

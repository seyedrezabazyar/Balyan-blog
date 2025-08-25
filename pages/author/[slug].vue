<!-- pages/author/[slug].vue - تغییر از id به slug -->
<template>
    <div v-if="pending" class="min-h-screen flex items-center justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else-if="author" class="min-h-screen bg-gray-50">
        <!-- Author Header -->
        <section class="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col md:flex-row items-center gap-8">
                    <!-- Author Avatar -->
                    <div class="flex-shrink-0">
                        <div class="w-32 h-32 rounded-full overflow-hidden shadow-lg bg-white/20">
                            <img
                                v-if="author.avatar"
                                :src="author.avatar"
                                :alt="author.name"
                                class="w-full h-full object-cover"
                            />
                            <div v-else class="w-full h-full flex items-center justify-center text-6xl">
                                👤
                            </div>
                        </div>
                    </div>

                    <!-- Author Info -->
                    <div class="flex-1 text-center md:text-right">
                        <h1 class="text-4xl md:text-5xl font-bold mb-4">
                            {{ author.name }}
                        </h1>
                        <p v-if="author.bio" class="text-xl text-purple-100 mb-6 max-w-3xl">
                            {{ author.bio }}
                        </p>

                        <!-- Author Stats -->
                        <div class="flex flex-wrap justify-center md:justify-start gap-6">
                            <div class="text-center">
                                <div class="text-2xl font-bold">{{ formatNumber(author.books_count) }}</div>
                                <div class="text-purple-200 text-sm">کتاب منتشر شده</div>
                            </div>
                            <div v-if="totalViews" class="text-center">
                                <div class="text-2xl font-bold">{{ formatNumber(totalViews) }}</div>
                                <div class="text-purple-200 text-sm">مجموع بازدید</div>
                            </div>
                        </div>

                        <!-- Social Links -->
                        <div v-if="author.website || author.social_links" class="flex justify-center md:justify-start gap-4 mt-6">
                            <a
                                v-if="author.website"
                                :href="author.website"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all"
                            >
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clip-rule="evenodd" />
                                </svg>
                            </a>

                            <template v-if="author.social_links">
                                <a
                                    v-for="(link, platform) in author.social_links"
                                    :key="platform"
                                    :href="link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all"
                                >
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/>
                                    </svg>
                                </a>
                            </template>
                        </div>
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
                        <NuxtLink to="/author" class="hover:text-blue-600 transition-colors">نویسندگان</NuxtLink>
                    </li>
                    <li>/</li>
                    <li class="text-gray-900 font-medium">{{ author.name }}</li>
                </ol>
            </div>
        </nav>

        <!-- Main Content -->
        <section class="py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <!-- Books Grid -->
                    <div class="lg:col-span-3">
                        <!-- Filters -->
                        <div class="bg-white rounded-xl shadow-md p-6 mb-8">
                            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <h2 class="text-xl font-bold text-gray-900">
                                    آثار {{ author.name }}
                                </h2>

                                <div class="flex flex-wrap gap-3">
                                    <select
                                        v-model="filters.sort"
                                        @change="applyFilters"
                                        class="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                                    >
                                        <option value="newest">جدیدترین</option>
                                        <option value="oldest">قدیمی‌ترین</option>
                                        <option value="popular">محبوب‌ترین</option>
                                        <option value="title">الفبایی</option>
                                        <option value="publication_year">سال انتشار</option>
                                    </select>

                                    <select
                                        v-model="filters.language"
                                        @change="applyFilters"
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
                        <div v-else-if="books.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <BookCard v-for="book in books" :key="book.id" :book="book" />
                        </div>

                        <!-- Empty State -->
                        <div v-else class="text-center py-16">
                            <div class="text-6xl mb-4">📚</div>
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">
                                اثری از این نویسنده یافت نشد
                            </h3>
                            <p class="text-gray-600 mb-6">
                                هنوز کتابی از {{ author.name }} در کتابخانه ما موجود نیست.
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

                    <!-- Sidebar -->
                    <div class="lg:col-span-1">
                        <BlogSidebar :sidebar-data="sidebarData" />
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- 404 Error -->
    <div v-else class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="text-center">
            <div class="text-6xl mb-4">👤</div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">نویسنده یافت نشد</h1>
            <p class="text-gray-600 mb-6">نویسنده مورد نظر شما وجود ندارد</p>
            <NuxtLink
                to="/author"
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
                بازگشت به فهرست نویسندگان
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Book, SidebarData } from '@/types/blog'

// Get route params - CHANGED FROM ID TO SLUG
const route = useRoute()
const authorSlug = route.params.slug as string

// Reactive data
const author = ref<any>(null)
const books = ref<Book[]>([])
const sidebarData = ref<SidebarData | null>(null)
const pagination = ref<any>(null)
const pending = ref(true)
const loading = ref(false)

// Filters
const filters = reactive({
    sort: 'newest',
    language: '',
    page: 1
})

// API
const blogApi = useBlogApi()

// Computed
const totalViews = computed(() => {
    return books.value.reduce((total: number, book: Book) => total + (book.view_count || 0), 0)
})

const visiblePages = computed(() => {
    if (!pagination.value) return []

    const current = pagination.value.current_page
    const last = pagination.value.last_page
    const pages: (number | string)[] = []

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
const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('fa-IR').format(num)
}

const fetchAuthorBooks = async () => {
    try {
        loading.value = true
        const params = {
            sort: filters.sort,
            language: filters.language,
            page: filters.page,
            per_page: 12
        }

        // CHANGED: Use slug instead of ID
        const response = await blogApi.getBooksByAuthor(authorSlug, params)

        if (response?.success) {
            author.value = response.data.author
            books.value = response.data.books || []
            pagination.value = response.meta
        } else {
            author.value = null
            books.value = []
        }
    } catch (error) {
        console.error('Error fetching author books:', error)
        author.value = null
        books.value = []
    } finally {
        loading.value = false
        pending.value = false
    }
}

const fetchSidebarData = async () => {
    try {
        const response = await blogApi.getSidebarData()
        sidebarData.value = response.data
    } catch (error) {
        console.error('Error fetching sidebar data:', error)
    }
}

const applyFilters = () => {
    filters.page = 1
    fetchAuthorBooks()
}

const goToPage = (page: number | string) => {
    if (typeof page === 'number') {
        filters.page = page
        fetchAuthorBooks()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

// Meta tags
watchEffect(() => {
    if (author.value) {
        useHead({
            title: `کتاب‌های ${author.value.name}`,
            meta: [
                {
                    name: 'description',
                    content: author.value.bio || `مجموعه آثار ${author.value.name}`
                },
                { name: 'keywords', content: `${author.value.name}, نویسنده, کتاب` }
            ]
        })
    }
})

// Initialize
onMounted(async () => {
    if (!authorSlug) {
        pending.value = false
        return
    }

    await Promise.all([
        fetchAuthorBooks(),
        fetchSidebarData()
    ])
})
</script>

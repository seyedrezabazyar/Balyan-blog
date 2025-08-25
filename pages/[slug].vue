<!-- pages/[slug].vue - تصحیح لینک نویسندگان -->
<template>
    <div v-if="pending" class="min-h-screen flex items-center justify-center">
        <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p class="text-gray-600">در حال بارگذاری...</p>
        </div>
    </div>

    <div v-else-if="book" class="min-h-screen bg-gray-50">
        <!-- Breadcrumb -->
        <nav class="bg-white border-b border-gray-200 py-4">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ol class="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                    <li>
                        <NuxtLink to="/" class="hover:text-blue-600 transition-colors">خانه</NuxtLink>
                    </li>
                    <li>/</li>
                    <li v-if="book.category">
                        <NuxtLink :to="`/category/${book.category.slug}`" class="hover:text-blue-600 transition-colors">
                            {{ book.category.name }}
                        </NuxtLink>
                    </li>
                    <li v-if="book.category">/</li>
                    <li class="text-gray-900 font-medium">{{ book.title }}</li>
                </ol>
            </div>
        </nav>

        <!-- Book Content -->
        <article class="py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="p-8">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <!-- Book Cover -->
                            <div class="md:col-span-1">
                                <div class="aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
                                    <img
                                        v-if="book.cover_image"
                                        :src="book.cover_image"
                                        :alt="book.title"
                                        class="w-full h-full object-cover"
                                        @error="onImgError"
                                    />
                                    <div v-else class="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                                        <div class="text-center">
                                            <div class="text-6xl mb-4">📚</div>
                                            <div class="text-gray-500">تصویر جلد</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Book Info -->
                            <div class="md:col-span-2">
                                <!-- Category -->
                                <div v-if="book.category" class="mb-4">
                                    <NuxtLink
                                        :to="`/category/${book.category.slug}`"
                                        class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                                    >
                                        {{ book.category.name }}
                                    </NuxtLink>
                                </div>

                                <!-- Title -->
                                <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    {{ book.title }}
                                </h1>

                                <!-- Authors -->
                                <div v-if="book.authors?.length" class="flex items-center gap-2 mb-4">
                                    <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                    </svg>
                                    <div class="flex flex-wrap gap-2">
                                        <NuxtLink
                                            v-for="(author, index) in book.authors"
                                            :key="author.id"
                                            :to="`/author/${author.slug}`"
                                            class="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                                        >
                                            {{ author.name }}<span v-if="index < book.authors.length - 1">، </span>
                                        </NuxtLink>
                                    </div>
                                </div>

                                <!-- Publisher -->
                                <div v-if="book.publisher" class="flex items-center gap-2 mb-4">
                                    <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2h6v8H7V6z" clip-rule="evenodd" />
                                    </svg>
                                    <NuxtLink
                                        :to="`/publisher/${book.publisher.slug || book.publisher.id}`"
                                        class="text-gray-700 hover:text-blue-600 transition-colors"
                                    >
                                        {{ book.publisher.name }}
                                    </NuxtLink>
                                </div>

                                <!-- Book Details -->
                                <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
                                    <div v-if="book.publication_year">
                                        <span class="text-gray-600">سال انتشار:</span>
                                        <span class="font-medium">{{ book.publication_year }}</span>
                                    </div>
                                    <div v-if="book.pages_count">
                                        <span class="text-gray-600">تعداد صفحات:</span>
                                        <span class="font-medium">{{ formatNumber(book.pages_count) }}</span>
                                    </div>
                                    <div v-if="book.language">
                                        <span class="text-gray-600">زبان:</span>
                                        <span class="font-medium">{{ getLanguageName(book.language) }}</span>
                                    </div>
                                    <div>
                                        <span class="text-gray-600">بازدید:</span>
                                        <span class="font-medium">{{ formatNumber(book.view_count || 0) }}</span>
                                    </div>
                                </div>

                                <!-- Available Formats -->
                                <div v-if="book.available_formats?.length" class="mb-6">
                                    <h3 class="text-lg font-semibold mb-2">فرمت‌های موجود</h3>
                                    <div class="flex flex-wrap gap-2">
                                        <span
                                            v-for="format in book.available_formats"
                                            :key="format"
                                            class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                                        >
                                            {{ format.toUpperCase() }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Excerpt -->
                                <div v-if="book.excerpt" class="mb-6">
                                    <h3 class="text-lg font-semibold mb-2">خلاصه</h3>
                                    <div class="text-gray-700 leading-relaxed p-4 bg-blue-50 rounded-lg border-r-4 border-blue-500">
                                        {{ book.excerpt }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Book Content -->
                        <div v-if="book.content" class="mt-8 pt-8 border-t">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">توضیحات کامل</h3>
                            <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed" v-html="book.content"></div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>

    <!-- 404 Error -->
    <div v-else class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="text-center">
            <div class="text-6xl mb-4">📄</div>
            <h1 class="text-2xl font-bold text-gray-900 mb-2">کتاب یافت نشد</h1>
            <p class="text-gray-600 mb-6">کتاب مورد نظر شما وجود ندارد یا حذف شده است</p>
            <NuxtLink
                to="/"
                class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
                بازگشت به کتابخانه
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
// Get route params
const route = useRoute()
const slug = route.params.slug

// Data
const book = ref(null)
const pending = ref(true)

// Methods
const formatNumber = (num) => {
    return new Intl.NumberFormat('fa-IR').format(num || 0)
}

const getLanguageName = (code) => {
    const languages = {
        'fa': 'فارسی',
        'en': 'انگلیسی',
        'ar': 'عربی',
        'tr': 'ترکی',
        'fr': 'فرانسوی',
        'de': 'آلمانی'
    }
    return languages[code] || code
}

// Fetch book data
const fetchBook = async () => {
    try {
        pending.value = true

        const response = await $fetch(`/api/v1/blog/${slug}`)

        if (response?.success) {
            book.value = response.data?.book || response.data
        } else {
            book.value = null
        }
    } catch (error) {
        console.error('Error fetching book:', error)
        book.value = null
    } finally {
        pending.value = false
    }
}

// Meta tags
watchEffect(() => {
    if (book.value) {
        useHead({
            title: book.value.title,
            meta: [
                { name: 'description', content: book.value.excerpt || `کتاب ${book.value.title}` },
                { property: 'og:title', content: book.value.title },
                { property: 'og:description', content: book.value.excerpt || `کتاب ${book.value.title}` },
                { property: 'og:image', content: book.value.cover_image },
                { property: 'og:type', content: 'book' },
            ]
        })
    }
})

// Initialize
onMounted(() => {
    fetchBook()
})

const defaultCover = '/images/default-book.png'

const onImgError = (event) => {
    const target = event.target
    if (target && target.src !== defaultCover) {
        target.src = defaultCover
    }
}
</script>

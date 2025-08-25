<!-- pages/[slug].vue - صفحه جزئیات کتاب با طراحی بهبود یافته -->
<template>
    <div v-if="pending" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div class="text-center">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <p class="text-gray-600 text-lg">در حال بارگذاری کتاب...</p>
        </div>
    </div>

    <div v-else-if="book" class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <!-- Hero Section with Breadcrumb -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <!-- Breadcrumb -->
                <nav class="mb-4">
                    <ol class="flex items-center space-x-2 space-x-reverse text-sm text-blue-100">
                        <li>
                            <NuxtLink to="/" class="hover:text-white transition-colors">
                                <svg class="w-4 h-4 inline ml-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                                خانه
                            </NuxtLink>
                        </li>
                        <li class="text-blue-200">/</li>
                        <li v-if="book.category">
                            <NuxtLink :to="`/category/${book.category.slug}`" class="hover:text-white transition-colors">
                                {{ book.category.name }}
                            </NuxtLink>
                        </li>
                        <li v-if="book.category" class="text-blue-200">/</li>
                        <li class="text-white font-medium">{{ book.title }}</li>
                    </ol>
                </nav>
            </div>
        </div>

        <!-- Book Content -->
        <article class="relative -mt-8 pb-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Main Content Card -->
                <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div class="p-6 lg:p-10">
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                            <!-- Book Cover and Quick Actions -->
                            <div class="lg:col-span-1">
                                <!-- Book Cover -->
                                <div class="sticky top-6">
                                    <div class="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300">
                                        <img
                                            v-if="book.cover_image"
                                            :src="book.cover_image"
                                            :alt="book.title"
                                            class="w-full h-full object-cover"
                                            @error="onImgError"
                                        />
                                        <div v-else class="w-full h-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 flex items-center justify-center">
                                            <div class="text-center text-white">
                                                <div class="text-7xl mb-4">📚</div>
                                                <div class="text-xl font-medium">تصویر جلد</div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Quick Stats -->
                                    <div class="grid grid-cols-2 gap-3 mb-6">
                                        <div class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                                            <div class="text-2xl font-bold text-blue-600">{{ formatNumber(book.view_count || 0) }}</div>
                                            <div class="text-xs text-blue-600 mt-1">بازدید</div>
                                        </div>
                                        <div class="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 text-center">
                                            <div class="text-2xl font-bold text-green-600">{{ formatNumber(book.download_count || 0) }}</div>
                                            <div class="text-xs text-green-600 mt-1">دانلود</div>
                                        </div>
                                    </div>

                                    <!-- Download Button -->
                                    <button class="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                        <svg class="w-6 h-6 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                        </svg>
                                        دانلود کتاب
                                    </button>

                                    <!-- Price Section -->
                                    <div v-if="book.price > 0" class="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                                        <div v-if="book.sale_price && book.sale_price < book.price" class="flex items-center justify-between mb-2">
                                            <span class="text-gray-500 line-through text-lg">{{ formatPrice(book.price) }}</span>
                                            <span class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                                {{ Math.round((1 - book.sale_price / book.price) * 100) }}% تخفیف
                                            </span>
                                        </div>
                                        <div class="text-3xl font-bold text-purple-600">
                                            {{ formatPrice(book.sale_price || book.price) }}
                                            <span class="text-sm font-normal">تومان</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Book Details -->
                            <div class="lg:col-span-2">
                                <!-- Category Badge -->
                                <div v-if="book.category" class="mb-4">
                                    <NuxtLink
                                        :to="`/category/${book.category.slug}`"
                                        class="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        <svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                        </svg>
                                        {{ book.category.name }}
                                    </NuxtLink>
                                </div>

                                <!-- Title -->
                                <h1 class="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                                    {{ book.title }}
                                </h1>

                                <!-- Authors -->
                                <div v-if="book.authors?.length" class="flex items-center gap-3 mb-6 p-4 bg-blue-50 rounded-xl">
                                    <svg class="w-6 h-6 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                    </svg>
                                    <div class="flex flex-wrap gap-2">
                                        <span class="text-gray-600">نویسنده:</span>
                                        <NuxtLink
                                            v-for="(author, index) in book.authors"
                                            :key="author.id"
                                            :to="`/author/${author.slug}`"
                                            class="text-blue-700 hover:text-blue-900 transition-colors font-bold text-lg"
                                        >
                                            {{ author.name }}<span v-if="index < book.authors.length - 1">، </span>
                                        </NuxtLink>
                                    </div>
                                </div>

                                <!-- Publisher -->
                                <div v-if="book.publisher" class="flex items-center gap-3 mb-6 p-4 bg-green-50 rounded-xl">
                                    <svg class="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                    </svg>
                                    <div>
                                        <span class="text-gray-600">ناشر:</span>
                                        <NuxtLink
                                            :to="`/publisher/${book.publisher.slug || book.publisher.id}`"
                                            class="text-green-700 hover:text-green-900 transition-colors font-bold text-lg mr-2"
                                        >
                                            {{ book.publisher.name }}
                                        </NuxtLink>
                                    </div>
                                </div>

                                <!-- Book Specifications Grid -->
                                <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-6">
                                    <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                        <svg class="w-6 h-6 ml-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                                        </svg>
                                        مشخصات کتاب
                                    </h3>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div v-if="book.isbn" class="flex items-center justify-between bg-white rounded-xl p-3">
                                            <span class="text-gray-600 font-medium">شابک (ISBN):</span>
                                            <span class="font-bold text-gray-900">{{ book.isbn }}</span>
                                        </div>
                                        <div v-if="book.publication_year" class="flex items-center justify-between bg-white rounded-xl p-3">
                                            <span class="text-gray-600 font-medium">سال انتشار:</span>
                                            <span class="font-bold text-gray-900">{{ book.publication_year }}</span>
                                        </div>
                                        <div v-if="book.pages_count" class="flex items-center justify-between bg-white rounded-xl p-3">
                                            <span class="text-gray-600 font-medium">تعداد صفحات:</span>
                                            <span class="font-bold text-gray-900">{{ formatNumber(book.pages_count) }} صفحه</span>
                                        </div>
                                        <div v-if="book.edition" class="flex items-center justify-between bg-white rounded-xl p-3">
                                            <span class="text-gray-600 font-medium">ویرایش:</span>
                                            <span class="font-bold text-gray-900">{{ book.edition }}</span>
                                        </div>
                                        <div v-if="book.language" class="flex items-center justify-between bg-white rounded-xl p-3">
                                            <span class="text-gray-600 font-medium">زبان:</span>
                                            <span class="font-bold text-gray-900">{{ getLanguageName(book.language) }}</span>
                                        </div>
                                        <div v-if="book.format" class="flex items-center justify-between bg-white rounded-xl p-3">
                                            <span class="text-gray-600 font-medium">فرمت اصلی:</span>
                                            <span class="font-bold text-gray-900 uppercase">{{ book.format }}</span>
                                        </div>
                                        <div v-if="book.file_size_bytes" class="flex items-center justify-between bg-white rounded-xl p-3">
                                            <span class="text-gray-600 font-medium">حجم فایل:</span>
                                            <span class="font-bold text-gray-900">{{ formatFileSize(book.file_size_bytes) }}</span>
                                        </div>
                                        <div v-if="book.status" class="flex items-center justify-between bg-white rounded-xl p-3">
                                            <span class="text-gray-600 font-medium">وضعیت:</span>
                                            <span :class="getStatusClass(book.status)">
                                                {{ getStatusLabel(book.status) }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Available Formats -->
                                <div v-if="book.available_formats?.length || book.variants_data" class="mb-6">
                                    <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                        <svg class="w-6 h-6 ml-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100 4h2a1 1 0 100 2 2 2 0 01-2 2H4a2 2 0 01-2-2V5z" clip-rule="evenodd" />
                                        </svg>
                                        فرمت‌های موجود
                                    </h3>
                                    <div class="flex flex-wrap gap-3">
                                        <template v-if="book.available_formats?.length">
                                            <span
                                                v-for="format in book.available_formats"
                                                :key="format"
                                                class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-bold uppercase shadow-md hover:shadow-lg transition-all duration-300"
                                            >
                                                {{ format }}
                                            </span>
                                        </template>
                                        <template v-else-if="book.variants_data">
                                            <span
                                                v-for="(variant, key) in parseVariants(book.variants_data)"
                                                :key="key"
                                                class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full text-sm font-bold uppercase shadow-md hover:shadow-lg transition-all duration-300"
                                            >
                                                {{ key }}
                                            </span>
                                        </template>
                                    </div>
                                </div>

                                <!-- Excerpt -->
                                <div v-if="book.excerpt" class="mb-6">
                                    <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                        <svg class="w-6 h-6 ml-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                                        </svg>
                                        خلاصه کتاب
                                    </h3>
                                    <div class="text-gray-700 leading-relaxed text-lg p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-r-4 border-blue-500">
                                        {{ book.excerpt }}
                                    </div>
                                </div>

                                <!-- SEO Keywords -->
                                <div v-if="book.seo_keywords" class="mb-6">
                                    <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
                                        <svg class="w-6 h-6 ml-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                                        </svg>
                                        برچسب‌ها
                                    </h3>
                                    <div class="flex flex-wrap gap-2">
                                        <span
                                            v-for="(keyword, index) in book.seo_keywords.split(',')"
                                            :key="index"
                                            class="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors cursor-pointer"
                                        >
                                            #{{ keyword.trim() }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Book Content -->
                        <div v-if="book.content" class="mt-12 pt-12 border-t-2 border-gray-200">
                            <h2 class="text-2xl font-black text-gray-900 mb-6 flex items-center">
                                <svg class="w-8 h-8 ml-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                </svg>
                                توضیحات کامل کتاب
                            </h2>
                            <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed bg-white rounded-2xl p-8 shadow-inner" v-html="book.content"></div>
                        </div>

                        <!-- Related Books Section -->
                        <div v-if="relatedBooks?.length" class="mt-12 pt-12 border-t-2 border-gray-200">
                            <h2 class="text-2xl font-black text-gray-900 mb-6 flex items-center">
                                <svg class="w-8 h-8 ml-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                                کتاب‌های مرتبط
                            </h2>
                            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                <div v-for="related in relatedBooks" :key="related.id" class="group">
                                    <NuxtLink :to="`/${related.slug}`" class="block">
                                        <div class="aspect-[3/4] rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                                            <img
                                                v-if="related.cover_image"
                                                :src="related.cover_image"
                                                :alt="related.title"
                                                class="w-full h-full object-cover"
                                            />
                                            <div v-else class="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                                <span class="text-4xl">📖</span>
                                            </div>
                                        </div>
                                        <h3 class="mt-2 text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {{ related.title }}
                                        </h3>
                                    </NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </div>

    <!-- 404 Error -->
    <div v-else class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div class="text-center">
            <div class="text-8xl mb-6 animate-bounce">📚</div>
            <h1 class="text-3xl font-black text-gray-900 mb-3">کتاب یافت نشد</h1>
            <p class="text-gray-600 mb-8 text-lg">کتاب مورد نظر شما وجود ندارد یا حذف شده است</p>
            <NuxtLink
                to="/"
                class="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
                <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
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
const relatedBooks = ref([])
const pending = ref(true)

// Methods
const formatNumber = (num) => {
    return new Intl.NumberFormat('fa-IR').format(num || 0)
}

const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price || 0)
}

const formatFileSize = (bytes) => {
    if (!bytes) return 'نامشخص'
    const sizes = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`
}

const getLanguageName = (code) => {
    const languages = {
        'fa': 'فارسی',
        'en': 'انگلیسی',
        'ar': 'عربی',
        'tr': 'ترکی',
        'fr': 'فرانسوی',
        'de': 'آلمانی',
        'es': 'اسپانیایی',
        'it': 'ایتالیایی',
        'ru': 'روسی',
        'zh': 'چینی',
        'ja': 'ژاپنی',
        'ko': 'کره‌ای'
    }
    return languages[code] || code
}

const getStatusLabel = (status) => {
    const statuses = {
        'draft': 'پیش‌نویس',
        'published': 'منتشر شده',
        'hidden': 'مخفی',
        'archived': 'آرشیو شده'
    }
    return statuses[status] || status
}

const getStatusClass = (status) => {
    const classes = {
        'draft': 'px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-bold',
        'published': 'px-3 py-1 bg-green-200 text-green-700 rounded-full text-sm font-bold',
        'hidden': 'px-3 py-1 bg-yellow-200 text-yellow-700 rounded-full text-sm font-bold',
        'archived': 'px-3 py-1 bg-red-200 text-red-700 rounded-full text-sm font-bold'
    }
    return classes[status] || 'px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-bold'
}

const parseVariants = (variantsData) => {
    if (!variantsData) return {}
    try {
        if (typeof variantsData === 'string') {
            return JSON.parse(variantsData)
        }
        return variantsData
    } catch (e) {
        return {}
    }
}

// Fetch book data
const fetchBook = async () => {
    try {
        pending.value = true

        const response = await $fetch(`/api/v1/blog/${slug}`)

        if (response?.success) {
            book.value = response.data?.book || response.data
            
            // Fetch related books if category exists
            if (book.value?.category?.id) {
                fetchRelatedBooks(book.value.category.id)
            }
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

// Fetch related books
const fetchRelatedBooks = async (categoryId) => {
    try {
        const response = await $fetch('/api/v1/blog', {
            params: {
                category_id: categoryId,
                limit: 8,
                exclude_id: book.value?.id
            }
        })
        
        if (response?.success && response.data?.books) {
            relatedBooks.value = response.data.books.filter(b => b.id !== book.value?.id).slice(0, 4)
        }
    } catch (error) {
        console.error('Error fetching related books:', error)
    }
}

// Meta tags
watchEffect(() => {
    if (book.value) {
        const metaTitle = book.value.seo_title || book.value.title
        const metaDescription = book.value.seo_description || book.value.excerpt || `کتاب ${book.value.title}`
        
        useHead({
            title: metaTitle,
            meta: [
                { name: 'description', content: metaDescription },
                { name: 'keywords', content: book.value.seo_keywords || '' },
                { property: 'og:title', content: metaTitle },
                { property: 'og:description', content: metaDescription },
                { property: 'og:image', content: book.value.cover_image },
                { property: 'og:type', content: 'book' },
                { property: 'book:author', content: book.value.authors?.map(a => a.name).join(', ') || '' },
                { property: 'book:isbn', content: book.value.isbn || '' },
                { property: 'book:release_date', content: book.value.publication_year || '' },
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: metaTitle },
                { name: 'twitter:description', content: metaDescription },
                { name: 'twitter:image', content: book.value.cover_image }
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

<style scoped>
/* Custom scrollbar for book content */
.prose {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e0 #f7fafc;
}

.prose::-webkit-scrollbar {
    width: 8px;
}

.prose::-webkit-scrollbar-track {
    background: #f7fafc;
}

.prose::-webkit-scrollbar-thumb {
    background-color: #cbd5e0;
    border-radius: 4px;
}

/* Line clamp utility */
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Smooth animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
}
</style>
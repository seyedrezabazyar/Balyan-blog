<!-- pages/author/index.vue - تصحیح لینک‌ها با slug -->
<template>
    <div v-if="pending" class="min-h-screen flex items-center justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <div v-else class="min-h-screen bg-gray-50">
        <!-- Header -->
        <section class="bg-gradient-to-br from-green-600 to-teal-700 text-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h1 class="text-4xl md:text-5xl font-bold mb-4">
                        نویسندگان
                    </h1>
                    <p class="text-xl text-green-100 mb-6 max-w-3xl mx-auto">
                        آشنایی با نویسندگان برجسته کتابخانه
                    </p>
                    <div class="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                        <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                        </svg>
                        <span class="font-medium">
                            {{ formatNumber(authors.length) }} نویسنده
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
                    <li class="text-gray-900 font-medium">نویسندگان</li>
                </ol>
            </div>
        </nav>

        <!-- Main Content -->
        <section class="py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Authors Grid -->
                <div v-if="authors.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <NuxtLink
                        v-for="author in authors"
                        :key="author.id"
                        :to="`/author/${author.slug}`"
                        class="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                        <div class="p-6">
                            <!-- Author Avatar -->
                            <div class="w-20 h-20 bg-gradient-to-br from-green-100 to-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <img
                                    v-if="author.avatar"
                                    :src="author.avatar"
                                    :alt="author.name"
                                    class="w-full h-full object-cover rounded-full"
                                />
                                <svg v-else class="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>
                            </div>

                            <!-- Author Name -->
                            <h3 class="text-lg font-bold text-gray-900 text-center mb-2 group-hover:text-green-600 transition-colors">
                                {{ author.name }}
                            </h3>

                            <!-- Author Bio -->
                            <p v-if="author.bio" class="text-sm text-gray-600 text-center mb-2 line-clamp-2">
                                {{ author.bio }}
                            </p>

                            <!-- Books Count -->
                            <div class="text-center">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                                    {{ formatNumber(author.books_count || 0) }} کتاب
                                </span>
                            </div>
                        </div>
                    </NuxtLink>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-16 bg-white rounded-xl shadow-sm">
                    <div class="text-6xl mb-4">👤</div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">
                        نویسنده‌ای یافت نشد
                    </h3>
                    <p class="text-gray-600">
                        هنوز نویسنده‌ای ثبت نشده است.
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
// Meta
useHead({
    title: 'نویسندگان - بلیان',
    meta: [
        { name: 'description', content: 'لیست نویسندگان کتابخانه دیجیتال بلیان' }
    ]
})

// Data
const authors = ref([])
const pending = ref(true)

const { getAuthors } = useBlogApi()

// Methods
const formatNumber = (num) => {
    return new Intl.NumberFormat('fa-IR').format(num || 0)
}

const fetchAuthors = async () => {
    try {
        pending.value = true
        const response = await getAuthors()

        if (response?.success) {
            authors.value = response.data || []
        } else {
            authors.value = []
        }
    } catch (error) {
        console.error('Error fetching authors:', error)
        authors.value = []
    } finally {
        pending.value = false
    }
}

// Initialize
onMounted(() => {
    fetchAuthors()
})
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>

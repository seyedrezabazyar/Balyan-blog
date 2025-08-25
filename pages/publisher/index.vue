<!-- pages/publisher/index.vue - شبیه‌سازی صفحه نویسندگان -->
<template>
    <div v-if="pending" class="min-h-screen flex items-center justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>

    <div v-else class="min-h-screen bg-gray-50">
        <!-- Header -->
        <section class="bg-gradient-to-br from-purple-600 to-pink-700 text-white py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                    <h1 class="text-4xl md:text-5xl font-bold mb-4">
                        ناشران
                    </h1>
                    <p class="text-xl text-purple-100 mb-6 max-w-3xl mx-auto">
                        آشنایی با ناشران برجسته کتابخانه
                    </p>
                    <div class="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3">
                        <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                        </svg>
                        <span class="font-medium">
                            {{ formatNumber(publishers.length) }} ناشر
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
                        <NuxtLink to="/" class="hover:text-purple-600 transition-colors">خانه</NuxtLink>
                    </li>
                    <li>/</li>
                    <li class="text-gray-900 font-medium">ناشران</li>
                </ol>
            </div>
        </nav>

        <!-- Main Content -->
        <section class="py-12">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Publishers Grid -->
                <div v-if="publishers.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <NuxtLink
                        v-for="publisher in publishers"
                        :key="publisher.id"
                        :to="`/publisher/${publisher.slug}`"
                        class="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                        <div class="p-6">
                            <!-- Publisher Logo -->
                            <div class="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <img
                                    v-if="publisher.logo_path"
                                    :src="publisher.logo_path"
                                    :alt="publisher.name"
                                    class="w-full h-full object-cover rounded-full"
                                />
                                <svg v-else class="w-10 h-10 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                                </svg>
                            </div>

                            <!-- Publisher Name -->
                            <h3 class="text-lg font-bold text-gray-900 text-center mb-2 group-hover:text-purple-600 transition-colors">
                                {{ publisher.name }}
                            </h3>

                            <!-- Publisher Description -->
                            <p v-if="publisher.description" class="text-sm text-gray-600 text-center mb-2 line-clamp-2">
                                {{ publisher.description }}
                            </p>

                            <!-- Books Count -->
                            <div class="text-center">
                                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                                    {{ formatNumber(publisher.books_count || 0) }} کتاب
                                </span>
                            </div>

                            <!-- Verified Badge -->
                            <div v-if="publisher.is_verified" class="text-center mt-2">
                                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                    <svg class="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                    </svg>
                                    تایید شده
                                </span>
                            </div>
                        </div>
                    </NuxtLink>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-16 bg-white rounded-xl shadow-sm">
                    <div class="text-6xl mb-4">📚</div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">
                        ناشری یافت نشد
                    </h3>
                    <p class="text-gray-600">
                        هنوز ناشری ثبت نشده است.
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
// Meta
useHead({
    title: 'ناشران - بلیان',
    meta: [
        { name: 'description', content: 'لیست ناشران کتابخانه دیجیتال بلیان' }
    ]
})

// Data
const publishers = ref([])
const pending = ref(true)

const { getPublishers } = useBlogApi()

// Methods
const formatNumber = (num) => {
    return new Intl.NumberFormat('fa-IR').format(num || 0)
}

const fetchPublishers = async () => {
    try {
        pending.value = true
        const response = await getPublishers()

        if (response?.success) {
            publishers.value = response.data || []
        } else {
            publishers.value = []
        }
    } catch (error) {
        console.error('Error fetching publishers:', error)
        publishers.value = []
    } finally {
        pending.value = false
    }
}

// Initialize
onMounted(() => {
    fetchPublishers()
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

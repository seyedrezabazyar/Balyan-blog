<!-- components/blog/BookCard.vue - تصحیح لینک نویسندگان -->
<template>
    <article class="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <!-- Book Cover -->
        <div class="relative overflow-hidden">
            <NuxtLink :to="`/${book.slug}`" class="block">
                <div class="aspect-[3/4] overflow-hidden">
                    <img
                        v-if="book.cover_image"
                        :src="book.cover_image"
                        :alt="book.title"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        @error="onImgError"
                    />
                    <div v-else class="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                        <div class="text-center">
                            <div class="text-4xl mb-2">📚</div>
                            <div class="text-gray-500 text-sm">تصویر جلد</div>
                        </div>
                    </div>
                </div>
            </NuxtLink>

            <!-- Category Badge -->
            <div v-if="book.category" class="absolute top-3 right-3">
                <NuxtLink
                    :to="`/category/${book.category.slug}`"
                    class="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-700 transition-colors"
                >
                    {{ book.category.name }}
                </NuxtLink>
            </div>

            <!-- Language Badge -->
            <div v-if="book.language" class="absolute top-3 left-3">
                <span class="bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                    {{ getLanguageName(book.language) }}
                </span>
            </div>
        </div>

        <!-- Content -->
        <div class="p-6">
            <!-- Title -->
            <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                <NuxtLink :to="`/${book.slug}`">
                    {{ book.title }}
                </NuxtLink>
            </h3>

            <!-- Authors -->
            <div v-if="book.authors?.length" class="flex items-center text-gray-600 mb-3">
                <svg class="w-4 h-4 ml-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
                <div class="flex flex-wrap gap-1">
                    <NuxtLink
                        v-for="(author, index) in book.authors"
                        :key="author.id"
                        :to="`/author/${author.slug}`"
                        class="text-sm hover:text-blue-600 transition-colors cursor-pointer"
                    >
                        {{ author.name }}<span v-if="index < book.authors.length - 1">، </span>
                    </NuxtLink>
                </div>
            </div>

            <!-- Publisher -->
            <div v-if="book.publisher" class="flex items-center text-gray-500 text-sm mb-3">
                <svg class="w-4 h-4 ml-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2h6v8H7V6z" clip-rule="evenodd" />
                </svg>
                <NuxtLink :to="`/publisher/${book.publisher.slug || book.publisher.id}`" class="hover:text-blue-600 transition-colors">
                    {{ book.publisher.name }}
                </NuxtLink>
            </div>

            <!-- Excerpt -->
            <p v-if="book.excerpt" class="text-gray-600 text-sm mb-4 line-clamp-3">
                {{ book.excerpt }}
            </p>

            <!-- Stats -->
            <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                <div class="flex items-center space-x-4 space-x-reverse text-xs text-gray-500">
                    <span class="flex items-center" v-if="book.available_formats?.length">
                        <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clip-rule="evenodd" />
                        </svg>
                        {{ book.available_formats.map((f: string) => f.toUpperCase()).join('، ') }}
                    </span>

                    <span v-if="book.pages_count" class="flex items-center">
                        <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clip-rule="evenodd" />
                        </svg>
                        {{ formatNumber(book.pages_count) }} صفحه
                    </span>

                    <span v-if="book.publication_year" class="flex items-center">
                        <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                        </svg>
                        {{ book.publication_year }}
                    </span>
                </div>

                <!-- Read More Button -->
                <NuxtLink
                    :to="`/${book.slug}`"
                    class="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center group-hover:translate-x-1 transition-transform"
                >
                    مطالعه بیشتر
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </NuxtLink>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import type { Book } from '@/types/blog'

interface Props {
    book: Book
}

defineProps<Props>()

const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('fa-IR').format(num || 0)
}

const getLanguageName = (code: string): string => {
    const languages: Record<string, string> = {
        'fa': 'فارسی',
        'en': 'انگلیسی',
        'ar': 'عربی',
        'tr': 'ترکی',
        'fr': 'فرانسوی',
        'de': 'آلمانی'
    }
    return languages[code] || code
}

const defaultCover = '/images/default-book.png'

const onImgError = (event: Event) => {
    const target = event.target as HTMLImageElement
    if (target && target.src !== defaultCover) {
        target.src = defaultCover
    }
}
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.aspect-\[3\/4\] {
    aspect-ratio: 3/4;
}
</style>

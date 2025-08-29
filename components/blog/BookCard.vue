<template>
  <article class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
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
            <div class="text-4xl">📚</div>
          </div>
        </div>
      </NuxtLink>

      <!-- Category Badge -->
      <div v-if="book.category" class="absolute top-3 right-3">
        <NuxtLink
          :to="`/category/${book.category.slug}`"
          class="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium hover:bg-blue-700 transition-colors"
        >
          {{ book.category.name }}
        </NuxtLink>
      </div>
    </div>

    <!-- Content -->
    <div class="p-4">
      <!-- Title -->
      <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        <NuxtLink :to="`/${book.slug}`">
          {{ book.title }}
        </NuxtLink>
      </h3>

      <!-- Authors -->
      <div v-if="book.authors?.length" class="text-sm text-gray-600 mb-2">
        <span v-for="(author, index) in book.authors" :key="author.id">
          <NuxtLink :to="`/author/${author.slug}`" class="hover:text-blue-600 transition-colors">
            {{ author.name }}
          </NuxtLink>
          <span v-if="index < book.authors.length - 1">، </span>
        </span>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-100 mt-3">
        <div class="text-xs text-gray-500">
          <span v-if="book.publication_year">{{ book.publication_year }}</span>
          <span v-if="book.publication_year && book.pages_count"> • </span>
          <span v-if="book.pages_count">{{ formatNumber(book.pages_count) }} ص</span>
        </div>

        <NuxtLink
          :to="`/${book.slug}`"
          class="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          مطالعه
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

const formatNumber = (num) => {
  return new Intl.NumberFormat('fa-IR').format(num || 0)
}

const onImgError = (event) => {
  const target = event.target
  if (target) {
    target.src = '/images/default-book.png'
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

.aspect-\[3\/4\] {
  aspect-ratio: 3/4;
}
</style>

<template>
  <article class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
    <div class="flex gap-4 p-6">
      <!-- Book Cover -->
      <div class="flex-shrink-0">
        <NuxtLink :to="`/${book.slug}`" class="block">
          <div class="w-20 h-28 overflow-hidden rounded-lg">
            <img
              v-if="book.cover_image"
              :src="book.cover_image"
              :alt="book.title"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
              @error="onImgError"
            />
            <div v-else class="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
              </svg>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Book Info -->
      <div class="flex-1 min-w-0">
        <!-- Category Badge -->
        <div v-if="book.category" class="mb-2">
          <NuxtLink
            :to="`/category/${book.category.slug}`"
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
          >
            {{ book.category.name }}
          </NuxtLink>
        </div>

        <!-- Title -->
        <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
          <NuxtLink :to="`/${book.slug}`">
            {{ book.title }}
          </NuxtLink>
        </h3>

        <!-- Authors -->
        <div v-if="book.authors?.length" class="flex items-center text-sm text-gray-600 mb-2">
          <svg class="w-4 h-4 ml-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
          <div class="flex flex-wrap gap-1">
            <span v-for="(author, index) in book.authors" :key="author.id">
              <NuxtLink
                :to="`/author/${author.slug}`"
                class="hover:text-blue-600 transition-colors"
              >
                {{ author.name }}
              </NuxtLink>
              <span v-if="index < book.authors.length - 1">، </span>
            </span>
          </div>
        </div>

        <!-- Excerpt -->
        <p v-if="book.excerpt" class="text-gray-600 text-sm mb-3 line-clamp-2">
          {{ book.excerpt }}
        </p>

        <!-- Stats -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4 space-x-reverse text-xs text-gray-500">
            <span v-if="book.publication_year" class="flex items-center">
              <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              {{ book.publication_year }}
            </span>

            <span v-if="book.pages_count" class="flex items-center">
              <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clip-rule="evenodd" />
              </svg>
              {{ formatNumber(book.pages_count) }} صفحه
            </span>

            <span v-if="book.view_count" class="flex items-center">
              <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
              </svg>
              {{ formatNumber(book.view_count) }} بازدید
            </span>
          </div>

          <!-- Read More Link -->
          <NuxtLink
            :to="`/${book.slug}`"
            class="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center hover:translate-x-1 transition-transform"
          >
            مطالعه
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
// حذف TypeScript imports
const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const formatNumber = (num) => {
  return new Intl.NumberFormat('fa-IR').format(num || 0)
}

const defaultCover = '/images/default-book.png'

const onImgError = (event) => {
  const target = event.target
  if (target && target.src !== defaultCover) {
    target.src = defaultCover
  }
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

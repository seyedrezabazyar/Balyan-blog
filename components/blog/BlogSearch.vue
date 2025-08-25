<!-- components/blog/BlogSearch.vue -->
<template>
    <div class="relative">
        <form @submit.prevent="handleSearch" class="relative">
            <input
                v-model="searchQuery"
                type="search"
                placeholder="جستجو در مقالات..."
                class="w-full px-4 py-3 pr-12 text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
                type="submit"
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
            </button>
        </form>

        <!-- Search Suggestions -->
        <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
        >
            <div
                v-if="showSuggestions && suggestions.length > 0"
                class="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto"
            >
                <ul class="py-2">
                    <li
                        v-for="suggestion in suggestions"
                        :key="suggestion.id"
                        @click="selectSuggestion(suggestion)"
                        class="px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                        <div class="font-medium text-gray-900">{{ suggestion.title }}</div>
                        <div class="text-sm text-gray-500">{{ suggestion.category }}</div>
                    </li>
                </ul>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface SearchSuggestion {
    id: number
    title: string
    slug: string
    category: string
}

const emit = defineEmits<{
    search: [query: string]
}>()

const searchQuery = ref('')
const showSuggestions = ref(false)
const suggestions = ref<SearchSuggestion[]>([])

// Simple debounce implementation
let debounceTimer: NodeJS.Timeout | null = null

const fetchSuggestions = async (query: string) => {
    if (query.length < 2) {
        suggestions.value = []
        return
    }

    try {
        const { $api } = useNuxtApp()
        const response = await $api('/blog/search/suggestions', {
            params: { q: query }
        })
        suggestions.value = response.data || []
        showSuggestions.value = true
    } catch (error) {
        suggestions.value = []
    }
}

const debouncedFetchSuggestions = (query: string) => {
    if (debounceTimer) {
        clearTimeout(debounceTimer)
    }
    debounceTimer = setTimeout(() => {
        fetchSuggestions(query)
    }, 300)
}

const handleSearch = () => {
    showSuggestions.value = false
    emit('search', searchQuery.value)
}

const selectSuggestion = (suggestion: SearchSuggestion) => {
    searchQuery.value = suggestion.title
    showSuggestions.value = false
    navigateTo(`/blog/${suggestion.slug}`)
}

watch(searchQuery, (newQuery) => {
    if (newQuery) {
        debouncedFetchSuggestions(newQuery)
    } else {
        suggestions.value = []
        showSuggestions.value = false
    }
})

// Close suggestions when clicking outside
onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    if (debounceTimer) {
        clearTimeout(debounceTimer)
    }
})

const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.relative')) {
        showSuggestions.value = false
    }
}
</script>

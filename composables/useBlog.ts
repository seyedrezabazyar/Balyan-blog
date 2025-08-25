// composables/useBlog.ts - نسخه بهینه شده
import type { Book, Category } from '@/types/blog'

interface PaginationMeta {
    current_page: number
    last_page: number
    per_page: number
    total: number
    has_more: boolean
}

export const useBlog = () => {
    const books = ref<Book[]>([])
    const book = ref<Book | null>(null)
    const categories = ref<Category[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)
    const pagination = ref<PaginationMeta | null>(null)

    const blogApi = useBlogApi()

    const fetchBooks = async (filters: any = {}) => {
        loading.value = true
        error.value = null

        try {
            const response = await blogApi.getBooks(filters)

            if (response?.success) {
                books.value = response.data || []
                pagination.value = response.meta || null
            } else {
                books.value = []
                pagination.value = null
                error.value = response?.message || 'خطا در دریافت کتاب‌ها'
            }

            return response
        } catch (err: any) {
            error.value = err.data?.message || 'خطا در دریافت کتاب‌ها'
            books.value = []
            pagination.value = null
            console.error('Error fetching books:', err)
        } finally {
            loading.value = false
        }
    }

    const fetchBook = async (slug: string) => {
        loading.value = true
        error.value = null

        try {
            const response = await blogApi.getBook(slug)

            if (response?.success) {
                book.value = response.data.book || response.data
                return book.value
            } else {
                book.value = null
                error.value = response?.message || 'کتاب یافت نشد'
                throw new Error(error.value)
            }
        } catch (err: any) {
            error.value = err.data?.message || 'کتاب یافت نشد'
            book.value = null
            throw err
        } finally {
            loading.value = false
        }
    }

    const searchBooks = async (query: string, params = {}) => {
        if (!query?.trim()) {
            books.value = []
            pagination.value = null
            return
        }

        loading.value = true
        error.value = null

        try {
            const response = await blogApi.searchBooks(query, params)

            if (response?.success) {
                books.value = response.data || []
                pagination.value = response.meta || null
            } else {
                books.value = []
                pagination.value = null
                error.value = response?.message || 'خطا در جستجو'
            }

            return response
        } catch (err: any) {
            error.value = err.data?.message || 'خطا در جستجو'
            books.value = []
            pagination.value = null
        } finally {
            loading.value = false
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await blogApi.getCategories()

            if (response?.success) {
                categories.value = response.data || []
            }
        } catch (err: any) {
            console.error('Error fetching categories:', err)
        }
    }

    // Clear functions
    const clearBooks = () => {
        books.value = []
        pagination.value = null
    }

    const clearBook = () => {
        book.value = null
    }

    const clearError = () => {
        error.value = null
    }

    return {
        // State
        books: readonly(books),
        book: readonly(book),
        categories: readonly(categories),
        loading: readonly(loading),
        error: readonly(error),
        pagination: readonly(pagination),

        // Actions
        fetchBooks,
        fetchBook,
        searchBooks,
        fetchCategories,

        // Utils
        clearBooks,
        clearBook,
        clearError
    }
}

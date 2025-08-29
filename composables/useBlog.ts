// composables/useBlog.ts - نسخه بدون TypeScript
export const useBlog = () => {
  const books = ref([])
  const book = ref(null)
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)
  const pagination = ref(null)

  const blogApi = useBlogApi()

  const fetchBooks = async (filters = {}) => {
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
    } catch (err) {
      error.value = err.data?.message || 'خطا در دریافت کتاب‌ها'
      books.value = []
      pagination.value = null
      console.error('Error fetching books:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchBook = async (slug) => {
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
    } catch (err) {
      error.value = err.data?.message || 'کتاب یافت نشد'
      book.value = null
      throw err
    } finally {
      loading.value = false
    }
  }

  const searchBooks = async (query, params = {}) => {
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
    } catch (err) {
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
    } catch (err) {
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

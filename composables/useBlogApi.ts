// composables/useBlogApi.ts - نسخه بدون auth
export const useBlogApi = () => {
  const blogBase = '/api/v1/blog'

  const api = $fetch.create({
    baseURL: blogBase,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    timeout: 10000,
    onResponseError({ response, error }) {
      if (import.meta.dev) {
        console.error('Blog API Error:', response?.status, error)
      }
    }
  })

  return {
    // کتاب‌ها
    getBooks: (params = {}) => api('/', { params }),
    getBook: (slug) => api(`/${slug}`),
    searchBooks: (query, params = {}) => api('/search', { params: { q: query, ...params } }),

    // دسته‌بندی‌ها
    getCategories: (params = {}) => api('/categories', { params }),
    getBooksByCategory: (slug, params = {}) => api(`/category/${slug}`, { params }),

    // نویسندگان
    getAuthors: (params = {}) => api('/authors', { params }),
    getBooksByAuthor: (slug, params = {}) => api(`/author/${slug}`, { params }),

    // ناشران
    getPublishers: (params = {}) => api('/publishers', { params }),
    getBooksByPublisher: (slug, params = {}) => api(`/publisher/${slug}`, { params }),

    // sidebar
    getSidebarData: () => api('/sidebar').catch(() => ({ data: null }))
  }
}

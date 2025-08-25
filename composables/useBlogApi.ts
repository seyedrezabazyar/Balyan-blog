export const useBlogApi = () => {
    const config = useRuntimeConfig()
    const isDev = import.meta.dev

    // Use internal API proxy routes
    const blogBase = '/api/v1/blog'

    // Create API instance
    const api = $fetch.create({
        baseURL: blogBase,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
        },
        // Add timeout to prevent hanging requests
        timeout: 10000, // 10 seconds
        onRequest({ options }) {
            if (isDev) {
                console.log('Blog API Request:', options.method, options.url)
            }

            // Add auth token if available
            if (process.client) {
                const tokenCookie = useCookie('auth-token')
                if (tokenCookie.value) {
                    if (!options.headers) {
                        options.headers = {}
                    }
                    options.headers.Authorization = `Bearer ${tokenCookie.value}`
                }
            }
        },
        onResponseError({ response, error }) {
            if (isDev) console.error('Blog API Error:', response?.status, error)
        }
    })

    return {
        // اصلی - کتاب‌ها
        getBooks: async (params = {}) => {
            try {
                return await api('/', { params })
            } catch (error) {
                console.error('Error fetching books:', error)
                throw error
            }
        },

        getBook: async (slug: string) => {
            try {
                return await api(`/${slug}`)
            } catch (error) {
                console.error('Error fetching book:', error)
                throw error
            }
        },

        // جستجو
        searchBooks: async (query: string, params = {}) => {
            try {
                return await api('/search', { params: { q: query, ...params } })
            } catch (error) {
                console.error('Error searching books:', error)
                throw error
            }
        },

        // دسته‌بندی‌ها
        getCategories: async (params = {}) => {
            try {
                // Force fresh data by adding timestamp
                const freshParams = { ...params, _fresh: Date.now() }
                return await api('/categories', { params: freshParams })
            } catch (error) {
                console.error('Error fetching categories:', error)
                throw error
            }
        },

        getBooksByCategory: async (slug: string, params = {}) => {
            try {
                return await api(`/category/${slug}`, { params })
            } catch (error) {
                console.error('Error fetching books by category:', error)
                throw error
            }
        },

        // نویسندگان - پشتیبانی از slug
        getAuthors: async (params = {}) => {
            try {
                return await api('/authors', { params })
            } catch (error) {
                console.error('Error fetching authors:', error)
                throw error
            }
        },

        getAuthor: async (slugOrId: string | number) => {
            try {
                return await api(`/author/${slugOrId}`)
            } catch (error) {
                console.error('Error fetching author:', error)
                throw error
            }
        },

        getBooksByAuthor: async (slugOrId: string | number, params = {}) => {
            try {
                return await api(`/author/${slugOrId}`, { params })
            } catch (error) {
                console.error('Error fetching books by author:', error)
                throw error
            }
        },

        // ناشران - پشتیبانی از slug
        getPublishers: async (params = {}) => {
            try {
                return await api('/publishers', { params })
            } catch (error) {
                console.error('Error fetching publishers:', error)
                throw error
            }
        },

        getPublisher: async (slugOrId: string | number) => {
            try {
                return await api(`/publisher/${slugOrId}`)
            } catch (error) {
                console.error('Error fetching publisher:', error)
                throw error
            }
        },

        getBooksByPublisher: async (slugOrId: string | number, params = {}) => {
            try {
                return await api(`/publisher/${slugOrId}`, { params })
            } catch (error) {
                console.error('Error fetching books by publisher:', error)
                throw error
            }
        },

        // داده‌های sidebar
        getSidebarData: async () => {
            try {
                return await api('/sidebar')
            } catch (error) {
                console.error('Error fetching sidebar data:', error)
                return { data: null }
            }
        }
    }
}

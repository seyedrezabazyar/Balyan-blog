export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const config = useRuntimeConfig()
    const apiBase = (config.public?.apiBase || 'http://127.0.0.1:8000/api').replace(/\/+$/, '')
    const targetUrl = `${apiBase}/v1/blog/search`

    try {
        const data = await $fetch(targetUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            params: query,
            timeout: 5000
        })

        return data
    } catch (error) {
        console.error('Error proxying search API:', error)

        // Return mock search results when API is not available
        const searchQuery = query.q as string || ''
        const page = Number(query.page || 1)
        const perPage = Number(query.per_page || 16)

        // Simulate search results based on query
        const totalResults = searchQuery.length > 0 ? Math.floor(Math.random() * 20) + 5 : 0

        const books = searchQuery.length > 0
            ? Array.from({ length: Math.min(perPage, totalResults - (page - 1) * perPage) }, (_, idx) => {
                const n = (page - 1) * perPage + idx + 1
                return {
                    id: n,
                    slug: `search-result-${n}`,
                    title: `نتیجه جستجو ${n} برای "${searchQuery}"`,
                    excerpt: `این کتاب حاوی اطلاعات مرتبط با "${searchQuery}" است و می‌تواند منبع مفیدی برای مطالعه باشد.`,
                    cover_image: null,
                    publication_year: 2018 + (n % 7),
                    pages_count: 180 + n,
                    language: n % 2 === 0 ? 'fa' : 'en',
                    view_count: Math.floor(Math.random() * 8000),
                    created_at: new Date(Date.now() - n * 12 * 60 * 60 * 1000).toISOString(),
                    formatted_date: `${n * 12} ساعت پیش`,
                    authors: [
                        { id: (n % 4) + 1, name: `نویسنده ${(n % 4) + 1}` }
                    ],
                    category: {
                        id: (n % 3) + 1,
                        name: n % 3 === 0 ? 'برنامه‌نویسی' : n % 3 === 1 ? 'طراحی وب' : 'هوش مصنوعی',
                        slug: n % 3 === 0 ? 'programming' : n % 3 === 1 ? 'web-design' : 'ai'
                    },
                    publisher: {
                        id: (n % 2) + 1,
                        name: n % 2 === 0 ? 'انتشارات نوین' : 'نشر دانش'
                    },
                    available_formats: ['pdf', 'epub']
                }
            })
            : []

        return {
            success: true,
            data: books,
            meta: {
                query: searchQuery,
                current_page: page,
                per_page: perPage,
                total: totalResults,
                last_page: Math.ceil(totalResults / perPage),
                has_more: page < Math.ceil(totalResults / perPage)
            },
            message: searchQuery.length > 0
                ? `${totalResults} نتیجه برای "${searchQuery}" یافت شد (داده‌های نمونه)`
                : 'لطفاً عبارت جستجو را وارد کنید'
        }
    }
})

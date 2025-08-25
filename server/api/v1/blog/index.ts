export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const config = useRuntimeConfig()
    const apiBase = (config.public?.apiBase || 'http://127.0.0.1:8000/api').replace(/\/+$/, '')
    const targetUrl = `${apiBase}/v1/blog`

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
        console.error('Error proxying main blog API:', error)

        // Return mock data when API is not available
        const page = Number(query.page || 1)
        const perPage = Number(query.per_page || 16)
        const total = 48

        const books = Array.from({ length: Math.min(perPage, total - (page - 1) * perPage) }, (_, idx) => {
            const n = (page - 1) * perPage + idx + 1
            return {
                id: n,
                slug: `sample-book-${n}`,
                title: `کتاب نمونه ${n}`,
                excerpt: `این یک کتاب نمونه است برای نمایش در رابط کاربری. محتوای کامل کتاب در صفحه جزئیات نمایش داده خواهد شد.`,
                cover_image: null,
                publication_year: 2020 + (n % 5),
                pages_count: 200 + n,
                language: n % 3 === 0 ? 'en' : 'fa',
                view_count: Math.floor(Math.random() * 10000),
                created_at: new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString(),
                formatted_date: `${n} روز پیش`,
                authors: [
                    { id: (n % 5) + 1, name: `نویسنده ${(n % 5) + 1}` }
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

        return {
            success: true,
            data: books,
            meta: {
                current_page: page,
                per_page: perPage,
                total,
                last_page: Math.ceil(total / perPage),
                has_more: page < Math.ceil(total / perPage)
            },
            message: 'کتاب‌ها با موفقیت دریافت شد (داده‌های نمونه)'
        }
    }
})

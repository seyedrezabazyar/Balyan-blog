export default defineEventHandler(async (event) => {
    const { slug } = event.context.params as { slug: string }
    const query = getQuery(event)

    const config = useRuntimeConfig()
    const apiBase = (config.public?.apiBase || 'http://127.0.0.1:8000/api').replace(/\/+$/, '')
    const targetUrl = `${apiBase}/v1/blog/category/${slug}`

    try {
        const data = await $fetch(targetUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            params: query
        })

        return data
    } catch (error) {
        console.error('Error proxying category books API:', error)

        // Return mock data when API is not available
        const page = Number(query.page || 1)
        const perPage = Number(query.per_page || 16)
        const total = 20

        const mockCategory = {
            id: 1,
            name: slug === 'programming' ? 'برنامه‌نویسی' : `دسته ${slug}`,
            slug,
            description: `توضیحات دسته ${slug}. این داده‌ها موقتی هستند.`,
            books_count: total
        }

        const books = Array.from({ length: Math.min(perPage, total - (page - 1) * perPage) }, (_, idx) => {
            const n = (page - 1) * perPage + idx + 1
            return {
                id: n,
                slug: `sample-book-${slug}-${n}`,
                title: `کتاب ${n} از دسته ${mockCategory.name}`,
                excerpt: `خلاصه‌ای کوتاه از کتاب نمونه ${n} در دسته ${mockCategory.name}...`,
                cover_image: null,
                publication_year: 2020 + (n % 5),
                pages_count: 100 + n,
                language: 'fa',
                view_count: Math.floor(Math.random() * 5000),
                created_at: new Date().toISOString(),
                formatted_date: 'چند روز پیش',
                authors: [{ id: 1, name: 'نویسنده نمونه' }],
                category: { id: mockCategory.id, name: mockCategory.name, slug: mockCategory.slug },
                publisher: { id: 1, name: 'ناشر نمونه' },
                available_formats: ['pdf', 'epub']
            }
        })

        return {
            success: true,
            data: {
                category: mockCategory,
                books
            },
            meta: {
                current_page: page,
                per_page: perPage,
                total,
                last_page: Math.ceil(total / perPage),
                has_more: page < Math.ceil(total / perPage)
            }
        }
    }
})

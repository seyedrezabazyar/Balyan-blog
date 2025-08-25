export default defineEventHandler(async (event) => {
    const { id } = event.context.params as { id: string }
    const query = getQuery(event)

    const config = useRuntimeConfig()
    const apiBase = (config.public?.apiBase || 'http://127.0.0.1:8000/api').replace(/\/+$/, '')
    const targetUrl = `${apiBase}/v1/blog/author/${id}`

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
        console.error('Error proxying author books API:', error)

        // Return mock data when API is not available
        const authorId = Number(id)
        const page = Number(query.page || 1)
        const perPage = Number(query.per_page || 16)
        const total = 15

        const mockAuthor = {
            id: authorId,
            name: `نویسنده شماره ${authorId}`,
            bio: 'توضیحات نمونه برای نویسنده. این داده‌ها موقتی هستند و از API واقعی دریافت خواهند شد.',
            website: 'https://example.com',
            is_verified: true,
            books_count: total
        }

        const books = Array.from({ length: Math.min(perPage, total - (page - 1) * perPage) }, (_, idx) => {
            const n = (page - 1) * perPage + idx + 1
            return {
                id: n,
                slug: `sample-book-${authorId}-${n}`,
                title: `کتاب نمونه ${n} از نویسنده ${authorId}`,
                excerpt: `خلاصه‌ای کوتاه از کتاب نمونه ${n}...`,
                cover_image: null,
                publication_year: 2020 + (n % 5),
                pages_count: 100 + n,
                language: 'fa',
                view_count: Math.floor(Math.random() * 5000),
                created_at: new Date().toISOString(),
                formatted_date: 'چند روز پیش',
                authors: [{ id: authorId, name: mockAuthor.name }],
                category: { id: 1, name: 'دسته نمونه', slug: 'sample-category' },
                publisher: { id: 1, name: 'ناشر نمونه' },
                available_formats: ['pdf', 'epub']
            }
        })

        return {
            success: true,
            data: {
                author: mockAuthor,
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

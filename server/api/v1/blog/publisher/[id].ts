// This file has been replaced by [slug].ts to support slug-based routing
// The new file properly proxies requests to the Laravel backend API
// and uses actual database data instead of mock data.

export default defineEventHandler(async (event) => {
    // Redirect to slug-based endpoint
    const { id } = event.context.params as { id: string }

    // If this is a numeric ID, we should ideally convert it to slug
    // For now, we'll just proxy the request as-is
    const query = getQuery(event)
    const config = useRuntimeConfig()
    const apiBase = (config.public?.apiBase || 'http://localhost:8000/api').replace(/\/+$/, '')
    const targetUrl = `${apiBase}/v1/blog/publisher/${id}`

    try {
        const data = await $fetch(targetUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            params: query,
            timeout: 10000
        })

        return data
    } catch (error: any) {
        console.error('Error proxying publisher books API:', error)

        return {
            success: false,
            data: {
                publisher: null,
                books: []
            },
            message: 'خطا در دریافت اطلاعات ناشر از سرور',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        }
    }
})

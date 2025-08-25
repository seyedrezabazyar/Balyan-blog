export default defineEventHandler(async (event) => {
    const { slug } = event.context.params as { slug: string }
    const query = getQuery(event)

    const config = useRuntimeConfig()
    const apiBase = (config.public?.apiBase || 'http://localhost:8000/api').replace(/\/+$/, '')
    const targetUrl = `${apiBase}/v1/blog/publisher/${slug}`

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

        // Return structured error response
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

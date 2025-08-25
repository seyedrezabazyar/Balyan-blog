// server/api/v1/blog/publishers.ts - نسخه ساده شده
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const config = useRuntimeConfig()
    const apiBase = (config.public?.apiBase || 'http://localhost:8000/api').replace(/\/+$/, '')
    const targetUrl = `${apiBase}/v1/blog/publishers`

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
    } catch (error) {
        console.error('Error fetching publishers:', error)

        // Return error response
        return {
            success: false,
            data: [],
            message: 'خطا در دریافت اطلاعات ناشران'
        }
    }
})

// server/api/v1/blog/[...path].ts - نسخه بهینه شده
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const method = getMethod(event)
    const path = event.context.params?.path || []
    const fullPath = Array.isArray(path) ? path.join('/') : path

    const config = useRuntimeConfig()
    const apiBase = (config.public?.apiBase || 'http://localhost:8000/api').replace(/\/+$/, '')
    const targetUrl = fullPath ? `${apiBase}/v1/blog/${fullPath}` : `${apiBase}/v1/blog`

    try {
        let body = null
        if (method !== 'GET' && method !== 'HEAD') {
            body = await readBody(event)
        }

        const options: any = {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        if (body) {
            options.body = body
        }

        if (Object.keys(query).length > 0) {
            options.params = query
        }

        // Forward Authorization header if exists
        const authHeader = getHeader(event, 'authorization')
        if (authHeader) {
            options.headers.Authorization = authHeader
        }

        const data = await $fetch(targetUrl, options)
        return data

    } catch (error: any) {
        console.error('Blog API Proxy Error:', {
            url: targetUrl,
            method,
            path: fullPath,
            error: error.message
        })

        // Return proper error response
        setResponseStatus(event, error.status || 500)
        return {
            success: false,
            message: error.data?.message || 'خطا در برقراری ارتباط با سرور',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        }
    }
})

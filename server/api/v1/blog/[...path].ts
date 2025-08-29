// server/api/v1/blog/[...path].ts - API مرکزی ساده
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const method = getMethod(event)
  const path = event.context.params?.path || []
  const fullPath = Array.isArray(path) ? path.join('/') : path

  const config = useRuntimeConfig()
  const apiBase = (config.public?.apiBase || 'http://localhost:8000/api').replace(/\/+$/, '')
  const targetUrl = fullPath ? `${apiBase}/v1/blog/${fullPath}` : `${apiBase}/v1/blog`

  try {
    const options: any = {
      method,
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    }

    // افزودن body برای درخواست‌های غیر GET
    if (method !== 'GET' && method !== 'HEAD') {
      options.body = await readBody(event)
    }

    // افزودن query parameters
    if (Object.keys(query).length > 0) {
      options.params = query
    }

    // انتقال Authorization header
    const authHeader = getHeader(event, 'authorization')
    if (authHeader) {
      options.headers.Authorization = authHeader
    }

    return await $fetch(targetUrl, options)

  } catch (error: any) {
    // log خطا در development
    if (process.env.NODE_ENV === 'development') {
      console.error('Blog API Error:', {
        url: targetUrl,
        method,
        path: fullPath,
        error: error.message
      })
    }

    // بازگرداندن خطای ساختاریافته
    setResponseStatus(event, error.status || 500)
    return {
      success: false,
      message: 'خطا در برقراری ارتباط با سرور',
      data: null
    }
  }
})

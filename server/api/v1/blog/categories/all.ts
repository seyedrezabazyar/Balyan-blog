export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const apiBase = (config.public?.apiBase || 'http://127.0.0.1:8000/api').replace(/\/+$/, '')
  const url = `${apiBase}/v1/blog/categories/all`

  try {
    const data = await $fetch(url, {
      headers: {
        Accept: 'application/json'
      }
    })

    return data
  } catch (error) {
    console.error('Error proxying categories/all:', error)
    return {
      success: false,
      data: [],
      message: 'خطا در دریافت دسته‌بندی‌ها'
    }
  }
})
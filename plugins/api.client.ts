export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const $api = $fetch.create({
        baseURL: config.public.apiBase,
        onRequest({ request, options }) {
            // Add auth token if available
            const tokenCookie = useCookie('auth-token')
            if (tokenCookie.value) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${tokenCookie.value}`
                }
            }
        },
        onResponseError({ response }) {
            // Handle 401 errors
            if (response.status === 401) {
                const tokenCookie = useCookie('auth-token')
                tokenCookie.value = null
                // Optional: redirect to login
                // navigateTo('/auth/login')
            }
        }
    })

    return {
        provide: {
            api: $api
        }
    }
})

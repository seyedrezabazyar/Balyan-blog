// composables/useAuth.ts
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

interface User {
    id: number
    name: string
    email?: string
    phone?: string
    country_code?: string
    email_verified_at?: string
    phone_verified_at?: string
    avatar?: string
    bio?: string
    created_at?: string
}

interface AuthForm {
    name?: string
    email?: string
    phone?: string
    country_code?: string
    code?: string
}

interface AuthResponse {
    success: boolean
    message?: string | null
    user?: User | null
    token?: string | null
}

export const useAuth = () => {
    // Use the auth store instead of local state
    const authStore = useAuthStore()

    const loading = ref(false)
    const error = ref<string | null>(null)

    const user = computed(() => authStore.user)
    const token = computed(() => authStore.token)
    const isAuthenticated = computed(() => authStore.isAuthenticated)

    const clearError = () => {
        error.value = null
    }

    const sendVerificationCode = async (data: AuthForm): Promise<AuthResponse> => {
        loading.value = true
        error.value = null

        try {
            if (data.email) {
                await authStore.sendLoginCode({ email: data.email })
            } else if (data.phone && data.country_code) {
                await authStore.sendLoginCode({
                    phone: data.phone,
                    country_code: data.country_code
                })
            }

            return {
                success: true,
                message: 'کد تأیید ارسال شد'
            }
        } catch (err: any) {
            error.value = err.response?.data?.message || 'خطایی رخ داده است'
            return {
                success: false,
                message: error.value || undefined
            }
        } finally {
            loading.value = false
        }
    }

    const verifyCode = async (data: AuthForm): Promise<AuthResponse> => {
        loading.value = true
        error.value = null

        try {
            let result
            if (data.email && data.code) {
                result = await authStore.login({
                    email: data.email,
                    email_code: data.code
                })
            } else if (data.phone && data.country_code && data.code) {
                result = await authStore.login({
                    phone: data.phone,
                    country_code: data.country_code,
                    phone_code: data.code
                })
            }

            return {
                success: true,
                user: result?.user || undefined,
                token: authStore.token || undefined
            }
        } catch (err: any) {
            error.value = err.response?.data?.message || 'کد تأیید نامعتبر است'
            return {
                success: false,
                message: error.value || undefined
            }
        } finally {
            loading.value = false
        }
    }

    const logout = async () => {
        await authStore.logout()
    }

    const updateProfile = async (data: Partial<User>): Promise<AuthResponse> => {
        try {
            const result = await authStore.updateProfile(data)
            return result
        } catch (err: any) {
            error.value = err.response?.data?.message || 'خطا در بروزرسانی پروفایل'
            return {
                success: false,
                message: error.value || undefined
            }
        }
    }

    return {
        user: user as Ref<User | null>,
        token: token as Ref<string | null>,
        loading: loading as Ref<boolean>,
        error: error as Ref<string | null>,
        isAuthenticated,
        clearError,
        sendVerificationCode,
        verifyCode,
        logout,
        updateProfile,
    }
}

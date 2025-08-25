// stores/auth.ts
import { defineStore } from 'pinia'

interface User {
    id: number
    name: string
    email?: string
    phone?: string
    country_code?: string
    username: string
    avatar?: string
    is_active: boolean
    registration_type: string
    has_google_account: boolean
    created_at: string
    updated_at: string
}

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    loading: boolean
    token: string | null
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        isAuthenticated: false,
        loading: false,
        token: null
    }),

    getters: {
        currentUser: (state) => state.user,
        isLoggedIn: (state) => state.isAuthenticated,
        userDisplayName: (state) => state.user?.name || 'کاربر',
        primaryContact: (state) => {
            if (state.user?.email) return state.user.email
            if (state.user?.phone) return `${state.user.country_code || ''}${state.user.phone}`
            return null
        }
    },

    actions: {
        // ثبت نام
        async sendRegisterCode(data: {
            email?: string
            phone?: string
            country_code?: string
            name: string
        }) {
            this.loading = true
            try {
                const { $api } = useNuxtApp()
                await $api.post('/auth/register/code', data)
                return { success: true }
            } catch (error: any) {
                throw error
            } finally {
                this.loading = false
            }
        },

        async register(data: {
            email?: string
            phone?: string
            country_code?: string
            name: string
            email_code?: string
            phone_code?: string
        }) {
            this.loading = true
            try {
                const { $api } = useNuxtApp()
                const deviceName = this.getDeviceName()

                const response = await $api.post('/auth/register', {
                    ...data,
                    device_name: deviceName
                })

                if (response.success) {
                    this.setAuthData(response.data)
                    return { success: true, user: this.user }
                }

                throw new Error('Registration failed')
            } catch (error: any) {
                throw error
            } finally {
                this.loading = false
            }
        },

        // ورود
        async sendLoginCode(data: {
            email?: string
            phone?: string
            country_code?: string
        }) {
            this.loading = true
            try {
                const { $api } = useNuxtApp()
                await $api.post('/auth/login/code', data)
                return { success: true }
            } catch (error: any) {
                throw error
            } finally {
                this.loading = false
            }
        },

        async login(data: {
            email?: string
            phone?: string
            country_code?: string
            email_code?: string
            phone_code?: string
        }) {
            this.loading = true
            try {
                const { $api } = useNuxtApp()
                const deviceName = this.getDeviceName()

                const response = await $api.post('/auth/login', {
                    ...data,
                    device_name: deviceName
                })

                if (response.success) {
                    this.setAuthData(response.data)
                    return { success: true, user: this.user }
                }

                throw new Error('Login failed')
            } catch (error: any) {
                throw error
            } finally {
                this.loading = false
            }
        },

        // Google OAuth
        async loginWithGoogle() {
            try {
                const { $api } = useNuxtApp()
                const response = await $api.get('/auth/google/redirect')

                if (response.success) {
                    // Redirect to Google
                    window.location.href = response.data.redirect_url
                }
            } catch (error: any) {
                throw error
            }
        },

        async handleGoogleCallback(code: string) {
            this.loading = true
            try {
                const { $api } = useNuxtApp()
                const deviceName = this.getDeviceName()

                const response = await $api.post('/auth/google/callback', {
                    code,
                    device_name: deviceName
                })

                if (response.success) {
                    this.setAuthData(response.data)
                    return { success: true, user: this.user }
                }

                throw new Error('Google authentication failed')
            } catch (error: any) {
                throw error
            } finally {
                this.loading = false
            }
        },

        // پروفایل
        async fetchProfile() {
            try {
                const { $api } = useNuxtApp()
                const response = await $api.get('/user/show')

                if (response.success) {
                    this.user = response.data
                    this.isAuthenticated = true
                }
            } catch (error: any) {
                this.clearAuth()
                throw error
            }
        },

        async updateProfile(data: any) {
            this.loading = true
            try {
                const { $api } = useNuxtApp()
                const response = await $api.post('/user/update', data)

                if (response.success) {
                    this.user = response.data
                    return { success: true }
                }

                throw new Error('Profile update failed')
            } catch (error: any) {
                throw error
            } finally {
                this.loading = false
            }
        },

        async uploadAvatar(file: File) {
            this.loading = true
            try {
                const { $api } = useNuxtApp()
                const formData = new FormData()
                formData.append('avatar', file)
                
                const response = await $api.post('/user/avatar', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                if (response.success) {
                    this.user = response.data
                    return { success: true }
                }

                throw new Error('Avatar upload failed')
            } catch (error: any) {
                throw error
            } finally {
                this.loading = false
            }
        },

        // خروج
        async logout() {
            this.loading = true
            try {
                const { $api } = useNuxtApp()
                await $api.get('/user/logout')
            } catch (error: any) {
                console.error('Logout error:', error)
            } finally {
                this.clearAuth()
                this.loading = false
                await navigateTo('/')
            }
        },

        // تنظیم داده‌های احراز هویت
        setAuthData(data: any) {
            this.user = data.user
            this.token = data.access_token
            this.isAuthenticated = true

            // ذخیره token در cookie
            const tokenCookie = useCookie('auth-token', {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 30 // 30 days
            })
            tokenCookie.value = this.token
        },

        // پاک کردن احراز هویت
        clearAuth() {
            this.user = null
            this.token = null
            this.isAuthenticated = false

            // پاک کردن token cookie
            const tokenCookie = useCookie('auth-token')
            tokenCookie.value = null
        },

        // بازیابی از cookie
        async initializeAuth() {
            const tokenCookie = useCookie('auth-token')

            if (tokenCookie.value) {
                this.token = tokenCookie.value
                try {
                    await this.fetchProfile()
                } catch (error) {
                    this.clearAuth()
                }
            }
        },

        // دریافت نام دستگاه
        getDeviceName(): string {
            if (process.client) {
                const userAgent = navigator.userAgent

                if (/Chrome/.test(userAgent)) return 'chrome-browser'
                if (/Firefox/.test(userAgent)) return 'firefox-browser'
                if (/Safari/.test(userAgent)) return 'safari-browser'
                if (/Edge/.test(userAgent)) return 'edge-browser'
            }

            return 'web-browser'
        }
    }
})

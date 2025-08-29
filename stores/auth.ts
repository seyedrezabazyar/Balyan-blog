// stores/auth.ts - نسخه خیلی ساده
import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email?: string
  phone?: string
  avatar?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    loading: false,
    token: null as string | null
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    userDisplayName: (state) => state.user?.name || 'کاربر'
  },

  actions: {
    // ورود
    async login(data: { email?: string; phone?: string; code: string }) {
      this.loading = true
      try {
        // فعلاً mock data
        this.user = {
          id: 1,
          name: 'کاربر تست',
          email: data.email
        }
        this.token = 'mock-token'
        this.isAuthenticated = true

        // ذخیره در cookie
        const tokenCookie = useCookie('auth-token', {
          maxAge: 60 * 60 * 24 * 30
        })
        tokenCookie.value = this.token

        return { success: true, user: this.user }
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    },

    // خروج
    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false

      const tokenCookie = useCookie('auth-token')
      tokenCookie.value = null

      navigateTo('/')
    },

    // بازیابی از cookie
    initializeAuth() {
      const tokenCookie = useCookie('auth-token')
      if (tokenCookie.value) {
        this.token = tokenCookie.value
        this.isAuthenticated = true
        this.user = {
          id: 1,
          name: 'کاربر',
          email: 'user@example.com'
        }
      }
    }
  }
})

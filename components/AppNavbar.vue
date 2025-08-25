<template>
    <nav class="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <NuxtLink to="/" class="flex items-center gap-3">
                        <img src="/images/logo.png" alt="بلیان" class="h-8 w-auto" />
                    </NuxtLink>
                </div>

                <div class="hidden md:flex items-center space-x-8 space-x-reverse">
                    <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-blue-50">
                        مقالات
                    </NuxtLink>
                    <NuxtLink to="/category" class="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-blue-50">
                        دسته‌بندی‌ها
                    </NuxtLink>
                    <NuxtLink to="/author" class="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-blue-50">
                        نویسندگان
                    </NuxtLink>
                    <NuxtLink to="/publisher" class="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-blue-50">
                        ناشران
                    </NuxtLink>
                    <NuxtLink to="/search" class="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-blue-50">
                        جستجو
                    </NuxtLink>

                    <!-- Auth Section -->
                    <div v-if="authStore.isLoggedIn" class="flex items-center gap-4">
                        <!-- User Dropdown -->
                        <div class="relative" ref="userMenuRef">
                            <button
                                @click="toggleUserMenu"
                                class="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-blue-50"
                            >
                                <div class="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                                    <img
                                        v-if="authStore.user?.avatar"
                                        :src="authStore.user.avatar"
                                        :alt="authStore.user.name"
                                        class="w-full h-full object-cover"
                                    />
                                    <div v-else class="w-full h-full flex items-center justify-center text-sm text-gray-600">
                                        {{ authStore.user?.name?.charAt(0).toUpperCase() }}
                                    </div>
                                </div>
                                <span class="hidden lg:block">{{ authStore.userDisplayName }}</span>
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </button>

                            <!-- Dropdown Menu -->
                            <transition
                                enter-active-class="transition ease-out duration-200"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95"
                            >
                                <div
                                    v-if="isUserMenuOpen"
                                    @click.stop
                                    class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                                >
                                    <button
                                        @click="logout"
                                        class="block w-full text-right px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        خروج
                                    </button>
                                </div>
                            </transition>
                        </div>
                    </div>

                    <!-- Login/Register Buttons - Removed (Authentication handled in frontend module) -->
                </div>

                <div class="md:hidden flex items-center">
                    <button
                        @click="isOpen = !isOpen"
                        class="text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                        <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path v-if="isOpen" d="M6 18L18 6M6 6l12 12" />
                            <path v-else d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile menu -->
        <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 transform -translate-y-4"
            enter-to-class="opacity-100 transform translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 transform translate-y-0"
            leave-to-class="opacity-0 transform -translate-y-4"
        >
            <div v-if="isOpen" class="md:hidden bg-white border-t border-gray-100">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <NuxtLink to="/" class="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium">
                        مقالات
                    </NuxtLink>
                    <NuxtLink to="/category" class="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium">
                        دسته‌بندی‌ها
                    </NuxtLink>
                    <NuxtLink to="/author" class="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium">
                        نویسندگان
                    </NuxtLink>
                    <NuxtLink to="/publisher" class="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium">
                        ناشران
                    </NuxtLink>
                    <NuxtLink to="/search" class="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium">
                        جستجو
                    </NuxtLink>

                    <!-- Mobile Auth Section -->
                    <div v-if="authStore.isLoggedIn" class="border-t border-gray-200 pt-4 mt-4">
                        <div class="flex items-center px-3 py-2 mb-2">
                            <div class="w-8 h-8 rounded-full overflow-hidden bg-gray-200 ml-3">
                                <img
                                    v-if="authStore.user?.avatar"
                                    :src="authStore.user.avatar"
                                    :alt="authStore.user.name"
                                    class="w-full h-full object-cover"
                                />
                                <div v-else class="w-full h-full flex items-center justify-center text-sm text-gray-600">
                                    {{ authStore.user?.name?.charAt(0).toUpperCase() }}
                                </div>
                            </div>
                            <span class="text-gray-900 font-medium">{{ authStore.userDisplayName }}</span>
                        </div>
                        <button
                            @click="logout"
                            class="block w-full text-right px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                        >
                            خروج
                        </button>
                    </div>

                    <!-- Mobile Login/Register - Removed (Authentication handled in frontend module) -->
                </div>
            </div>
        </transition>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const isUserMenuOpen = ref(false)
const userMenuRef = ref(null)
const route = useRoute()
const authStore = useAuthStore()

// Close menus when route changes
watch(() => route.path, () => {
    isOpen.value = false
    isUserMenuOpen.value = false
})

// Toggle user menu
const toggleUserMenu = () => {
    isUserMenuOpen.value = !isUserMenuOpen.value
}

// Close user menu when clicking outside
const closeUserMenu = (event: Event) => {
    if (isUserMenuOpen.value && userMenuRef.value) {
        const target = event.target as Node
        if (!userMenuRef.value.contains(target)) {
            isUserMenuOpen.value = false
        }
    }
}

// Logout method
const logout = async () => {
    await authStore.logout()
    isUserMenuOpen.value = false
    isOpen.value = false
}

onMounted(() => {
    document.addEventListener('click', closeUserMenu)
})

onUnmounted(() => {
    document.removeEventListener('click', closeUserMenu)
})
</script>

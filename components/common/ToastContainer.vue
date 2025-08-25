<!-- components/common/ToastContainer.vue -->
<template>
    <Teleport to="body">
        <div class="fixed top-4 left-4 z-50 space-y-2 pointer-events-none">
            <TransitionGroup name="toast" tag="div" class="space-y-2">
                <div
                    v-for="toast in toasts"
                    :key="toast.id"
                    :class="toastClasses(toast.type)"
                    class="pointer-events-auto max-w-sm w-full"
                >
                    <div class="flex items-start gap-3 p-4">
                        <component :is="getIcon(toast.type)" class="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div class="flex-1 min-w-0">
                            <h4 class="font-medium text-sm">{{ toast.title }}</h4>
                            <p v-if="toast.message" class="text-sm mt-1 opacity-90">
                                {{ toast.message }}
                            </p>
                        </div>
                        <button
                            @click="remove(toast.id)"
                            class="p-1 hover:bg-black/10 rounded transition-colors flex-shrink-0"
                        >
                            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { h } from 'vue'

const { toasts, remove } = useToast()

const toastClasses = (type: string) => {
    const base = 'bg-white rounded-lg shadow-lg border transition-all'
    
    const types: Record<string, string> = {
        success: 'border-r-4 border-green-500',
        error: 'border-r-4 border-red-500',
        warning: 'border-r-4 border-yellow-500',
        info: 'border-r-4 border-blue-500'
    }
    
    return [base, types[type]].join(' ')
}

const getIcon = (type: string) => {
    const icons: Record<string, any> = {
        success: () => h('svg', { class: 'w-5 h-5 text-green-500', fill: 'currentColor', viewBox: '0 0 20 20' }, [
            h('path', { 'fill-rule': 'evenodd', d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z', 'clip-rule': 'evenodd' })
        ]),
        error: () => h('svg', { class: 'w-5 h-5 text-red-500', fill: 'currentColor', viewBox: '0 0 20 20' }, [
            h('path', { 'fill-rule': 'evenodd', d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z', 'clip-rule': 'evenodd' })
        ]),
        warning: () => h('svg', { class: 'w-5 h-5 text-yellow-500', fill: 'currentColor', viewBox: '0 0 20 20' }, [
            h('path', { 'fill-rule': 'evenodd', d: 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z', 'clip-rule': 'evenodd' })
        ]),
        info: () => h('svg', { class: 'w-5 h-5 text-blue-500', fill: 'currentColor', viewBox: '0 0 20 20' }, [
            h('path', { 'fill-rule': 'evenodd', d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z', 'clip-rule': 'evenodd' })
        ])
    }
    
    return icons[type] || icons.info
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from {
    transform: translateX(-100%);
    opacity: 0;
}

.toast-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}

.toast-move {
    transition: transform 0.3s ease;
}
</style>
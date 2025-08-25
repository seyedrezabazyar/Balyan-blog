<!-- components/common/LoadingSpinner.vue -->
<template>
  <div :class="containerClasses">
    <div :class="spinnerClasses">
      <svg
        class="animate-spin"
        :class="sizeClasses"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span v-if="text" :class="textClasses">{{ text }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'white' | 'gray'
  fullScreen?: boolean
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
  fullScreen: false
})

const containerClasses = computed(() => {
  if (props.fullScreen) {
    return 'fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50'
  }
  return 'flex items-center justify-center p-4'
})

const spinnerClasses = computed(() => {
  const base = 'flex flex-col items-center gap-3'
  const colors = {
    primary: 'text-blue-600',
    white: 'text-white',
    gray: 'text-gray-600'
  }
  
  return [base, colors[props.color]].join(' ')
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  }
  
  return sizes[props.size]
})

const textClasses = computed(() => {
  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }
  
  return sizes[props.size]
})
</script>
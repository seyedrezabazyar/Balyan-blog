<!-- components/common/ErrorMessage.vue -->
<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 transform -translate-y-2"
    enter-to-class="opacity-100 transform translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 transform translate-y-0"
    leave-to-class="opacity-0 transform -translate-y-2"
  >
    <div
      v-if="message"
      :class="alertClasses"
      role="alert"
    >
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <component :is="iconComponent" class="h-5 w-5" aria-hidden="true" />
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium">
            {{ message }}
          </p>
          <p v-if="details" class="mt-1 text-sm opacity-90">
            {{ details }}
          </p>
        </div>
        <button
          v-if="dismissible"
          @click="$emit('dismiss')"
          type="button"
          class="mr-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 items-center justify-center hover:bg-black/10 transition-colors"
          aria-label="بستن"
        >
          <XMarkIcon class="h-4 w-4" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

interface Props {
  message: string
  details?: string
  type?: 'error' | 'warning' | 'success' | 'info'
  dismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'error',
  dismissible: false
})

defineEmits<{
  dismiss: []
}>()

const alertClasses = computed(() => {
  const base = 'rounded-lg p-4 mb-4'
  
  const types = {
    error: 'bg-red-50 text-red-800 border border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
    success: 'bg-green-50 text-green-800 border border-green-200',
    info: 'bg-blue-50 text-blue-800 border border-blue-200'
  }
  
  return [base, types[props.type]].join(' ')
})

const iconComponent = computed(() => {
  const icons = {
    error: XCircleIcon,
    warning: ExclamationTriangleIcon,
    success: CheckCircleIcon,
    info: InformationCircleIcon
  }
  
  return icons[props.type]
})
</script>
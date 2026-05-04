<!-- components/BaseInput.vue -->
<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-white/70 text-sm font-medium">
      {{ label }}
    </label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/30 outline-none focus:border-yellow-400/60 transition-all duration-300"
      :class="{ 'border-red-400/60': error }"
    />
    <span v-if="error" class="text-red-400 text-xs">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  type?: string
  error?: string
}>()

defineEmits(['update:modelValue'])
</script>
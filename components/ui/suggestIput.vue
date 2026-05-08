<!-- components/BaseInput.vue -->
<template>
  <div class="flex flex-col gap-1 sm:gap-2">
    <label v-if="label" class="text-xs sm:text-sm font-normal sm:font-medium">
      {{ label }}
    </label>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      class="bg-white border border-[#dde6f0] rounded-lg px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm outline-none focus:bg-[#f8fafc] transition-all duration-300"
      :class="{ 'border-red-400/60': error }"
    />
    <span v-if="error" class="text-red-400 text-xs">{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
}>();

defineEmits(["update:modelValue"]);
</script>

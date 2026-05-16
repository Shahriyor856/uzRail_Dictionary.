<!-- components/Ui/UiBaseInput.vue -->
<template>
  <div class="flex flex-col gap-1 sm:gap-1.5">

    <!-- Label -->
    <label
      v-if="label"
      class="text-xs sm:text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>

    <!-- Input wrapper (relative so eye-icon can be positioned inside) -->
    <div class="relative">
      <input
        v-bind="$attrs"
        :type="inputType"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="w-full bg-white border rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm outline-none transition-all duration-200 focus:bg-[#f8fafc]"
        :class="[
          error
            ? 'border-red-400/60 focus:border-red-400'
            : 'border-[#dde6f0] focus:border-[#012a4a]/40',
          isPassword ? 'pr-9' : ''
        ]"
      />

      <!-- Password visibility toggle -->
      <button
        v-if="isPassword"
        type="button"
        tabindex="-1"
        @click="showPassword = !showPassword"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150"
        :aria-label="showPassword ? 'Parolni yashirish' : 'Parolni ko\'rsatish'"
      >
        <!-- Eye open -->
        <svg v-if="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
        <!-- Eye closed -->
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
        </svg>
      </button>
    </div>

    <!-- Validation error message -->
    <span v-if="error" class="text-red-400 text-[11px]">{{ error }}</span>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Disable automatic attribute inheritance so we can bind $attrs manually to <input>
// This prevents duplicate attributes (e.g. autocomplete, disabled) from landing on the wrapper div
defineOptions({ inheritAttrs: false });

const props = defineProps<{
  modelValue: string;
  label?:       string;
  placeholder?: string;
  type?:        string; // defaults to "text"; pass "password" to enable toggle
  error?:       string;
}>();

defineEmits<{ (e: "update:modelValue", value: string): void }>();

// ── Password toggle ───────────────────────────────────────
const isPassword  = computed(() => props.type === "password");
const showPassword = ref(false);

// Switches between "password" and "text" when toggled; falls back to prop type otherwise
const inputType = computed(() => {
  if (isPassword.value) return showPassword.value ? "text" : "password";
  return props.type ?? "text";
});
</script>
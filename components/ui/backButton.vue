<template>
  <button
    @click="$emit('click')"
    class="flex items-center px-1 sm:px-2 py-1 sm:py-2 rounded-lg gap-1 text-xs sm:text-sm font-serif text-[#1a7a4a] bg-[#d4edda] transition-colors duration-300"
  >
    <span>←</span>
    <span>{{ $t("back") }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  (e: "click"): void;
}>();
</script>

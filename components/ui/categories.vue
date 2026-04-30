<template>
  <div
    class="max-w-[1200px] mx-auto flex flex-col gap-4 sm:gap-6 md:gap-8 transition-all duration-500"
  >
    <div class="flex flex-col items-start gap-0 sm:gap-2">
      <h1 class="text-base sm:text-lg md:text-2xl font-serif font-medium">
        {{ $t("termCategory") }}
      </h1>
      <p class="text-sm sm:text-base md:text-lg text-gray-500">
        {{ $t("pickOne") }}
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
      <div
        v-for="cat in categories"
        :key="cat.id"
        @click="$emit('select', cat.id)"
        class="px-3 sm:px-6 py-3 sm:py-6 flex flex-col items-start gap-2 sm:gap-4 border border-gray-300 hover:border-l-4 hover:border-b-4 hover:border-gray-800 hover:-translate-y-2 rounded-xl cursor-pointer transition-all duration-300"
      >
        <h1 class="text-base sm:text-xl font-medium">{{ cat.label }}</h1>
        <p class="text-sm sm:text-base text-gray-500">
          {{ wordCount[cat.id] }} {{ $t("terms") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  categories: { id: string; label: string }[];
  wordCount: Record<string, number>;
}>();

defineEmits<{
  select: [id: string];
}>();
</script>

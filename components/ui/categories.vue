<template>
  <div class="flex flex-col gap-4 transition-all duration-500">
    <div class="flex flex-col items-start gap-0 sm:gap-2">
      <h1
        class="text-sm sm:text-base font-medium sm:font-semibold text-[#1a2e44]"
      >
        {{ $t("termCategory") }}
      </h1>
      <p class="text-xs sm:text-sm text-[#7a96b0]">
        {{ $t("pickOne") }}
      </p>
    </div>

    <div class="grid grid-cols-1 gap-2 sm:gap-4">
      <div
        v-for="cat in categories"
        :key="cat.id"
        @click="$emit('select', cat.id)"
        class="flex flex-col gap-0 sm:gap-2 bg-white border border-[#dde6f0] rounded-xl w-full px-2 sm:px-4 py-1.5 sm:py-3 cursor-pointer hover:bg-[#f8fafc] hover:-translate-y-1 transition-all duration-350"
      >
        <h1 class="text-xs sm:text-sm md:text-base font-normal sm:font-medium">
          {{ cat.label }}
        </h1>
        <p class="text-xs sm:text-sm text-[#7a96b0]">
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

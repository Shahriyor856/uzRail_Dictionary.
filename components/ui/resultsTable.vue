<template>
  <div class="p-6 sm:p-8 w-full bg-white transition-all duration-500">
    <p class="text-sm text-gray-500 mb-4">
      {{ results.length }} {{ $t("terms") }}
    </p>

    <div class="border-t border-gray-200">
      <div
        v-for="(item, index) in results"
        :key="index"
        @click="selectWord(item)"
        class="flex items-start gap-2 sm:gap-4 py-2 sm:py-4 border-b border-gray-100 hover:border-l-2 hover:sm:border-l-4 border-l-[#012a4a] cursor-pointer"
      >
        <span class="text-xs text-gray-400 w-4 pt-1 pl-3 sm:pl-6 shrink-0">
          {{ index + 1 }}
        </span>

        <div class="flex flex-col">
          <span class="text-sm font-semibold text-gray-800">
            {{ item.word }}
          </span>
          <span class="text-xs text-gray-400 mt-0.5">
            {{ item.translations.map((t: any) => t.word).join(" · ") }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { results, selectWord, selectedCategory } = useSearch();
</script>

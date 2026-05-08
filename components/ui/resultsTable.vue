<template>
  <div class="w-full transition-all duration-500">
    <p class="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">
      {{ results.length }} {{ $t("terms") }}
    </p>

    <div class="border-t-2 border-gray-[#d4edda]">
      <div
        v-for="(item, index) in results"
        :key="index"
        @click="selectWord(item)"
        class="flex items-start gap-2 sm:gap-4 py-2 sm:py-4 hover:border-l-2 hover:sm:border-l-2 border-l-[#012a4a] hover:bg-[#f8fafc] cursor-pointer"
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
const { results, selectWord } = useSearch();
</script>

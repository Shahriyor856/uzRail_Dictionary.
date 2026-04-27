<template>
  <div
    class="flex flex-col p-6 sm:p-8 gap-8 w-full bg-white transition-all duration-500"
  >
    <div class="flex flex-col items-start gap-2">
      <button
        @click="goBack()"
        class="flex items-center gap-1 text-xs sm:text-sm font-serif text-gray-500 hover:text-gray-800 transition-all duration-300"
      >
        <span>←</span>
        <span>Orqaga qaytish</span>
      </button>
      <h1 class="text-lg sm:text-2xl font-medium font-serif">
        {{ selectedWord.word }}
      </h1>
      <p class="text-xs sm:text-sm text-gray-800">
        {{ selectedWord.pronunciation }} - {{ selectedWord.type }}
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
      <div
        class="flex flex-col gap-2 sm:gap-4 items-start"
        v-for="(item, index) in translations"
        :key="index"
      >
        <div class="flex items-center justify-center gap-2">
          <div
            class="w-2 h-2 rounded-full"
            :style="{ backgroundColor: item.color }"
          ></div>
          <h1 class="text-sm sm:text-base font-serif">{{ item.language }}</h1>
        </div>
        <p class="text-base sm:text-lg font-medium font-serif">
          {{ item.word }}
        </p>
        <p class="text-xs sm:text-sm font-medium font-serif">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { selectedWord, goBack } = useSearch();
const langMap: Record<string, { language: string; color: string }> = {
  uz: { language: "O'zbek", color: "#1b7a3b" },
  kk: { language: "Қазақша", color: "#8a6000" },
  en: { language: "English", color: "#1a4f8a" },
  ru: { language: "Русский", color: "#b92020" },
};

const translations = computed(
  () =>
    selectedWord.value?.translations.map((item: any) => ({
      ...item,
      ...langMap[item.lang],
    })) ?? [],
);
</script>

<template>
  <div class="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8">
    <!-- Category grid -->
    <UiCategories
      v-if="!selectedCategory && !selectedWord"
      :categories="categories"
      :wordCount="wordCountByCategory"
      @select="selectCategory"
    />

    <!-- Word list -->
    <div v-else-if="selectedCategory && !selectedWord">
      <div class="max-w-[1200px] px-6 sm:px-8 py-2 sm:py-4">
        <button
          @click="clearCategory()"
          class="flex items-center gap-1 text-xs sm:text-sm font-serif text-gray-500 hover:text-gray-800 transition-all duration-300"
        >
          <span>←</span>
          <span
            ><p class="text-xs sm:text-sm md:text-base">
              Kategoriyalarga qaytish
            </p></span
          >
        </button>
      </div>
      <UiResultsTable />
    </div>

    <!-- Word detail -->
    <ModulesConcept v-else-if="selectedWord" />
  </div>
</template>

<script setup lang="ts">
import data from "@/constants/data.json";

const {
  selectedCategory,
  selectedWord,
  selectCategory,
  clearCategory,
  resetAll,
} = useSearch();

const categories = data.categories;

const wordCountByCategory = computed(() =>
  Object.fromEntries(
    categories.map((c) => [
      c.id,
      data.words.filter((w) => w.category === c.id).length,
    ]),
  ),
);

resetAll();
</script>

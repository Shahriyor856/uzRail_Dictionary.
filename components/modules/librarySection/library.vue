<template>
  <div
    class="max-w-screen-md mx-auto px-4 py-6 sm:py-8 md:py-10 flex flex-col transition-all duration-500"
  >
    <!-- Category grid -->
    <UiCategories
      v-if="!selectedCategory && !selectedWord"
      :categories="categories"
      :wordCount="wordCountByCategory"
      @select="selectCategory"
    />

    <!-- Word list -->
    <div v-else-if="selectedCategory && !selectedWord">
      <div class="py-2 sm:py-4">
        <UiBackButton @click="clearCategory" />
      </div>
      <UiResultsTable />
    </div>

    <!-- Word detail -->
    <ModulesConceptSectionConcept v-else-if="selectedWord" />
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

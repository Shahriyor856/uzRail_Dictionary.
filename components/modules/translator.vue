<template>
  <div class="bg-[#013a63]">
    <div
      class="max-w-[1200px] mx-auto flex flex-col items-center gap-2 sm:gap-4 py-8 sm:py-12 transition-all duration-500"
    >
      <h3 class="text-white text-base sm:text-xl font-serif">
        {{ $t("findTerm") }}
      </h3>
      <h1 class="text-white/55 text-xs sm:text-sm font-serif">
        {{ $t("findIn") }}
      </h1>

      <UiMianInput />
    </div>
  </div>
  <UiEmptyState v-if="results.length === 0 && !selectedWord" />
  <UiResultsTable v-else-if="results.length > 0 && !selectedWord" />
  <ModulesConcept v-else-if="selectedWord" />
</template>

<script setup lang="ts">
const { selectedWord, results, resetAll } = useSearch();

resetAll();
</script>

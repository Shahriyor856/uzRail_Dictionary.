<template>
  <div class="bg-[#013a63]">
    <div
      class="max-w-[1200px] mx-auto flex flex-col items-center gap-2 sm:gap-4 py-8 sm:py-12 transition-all duration-500"
    >
      <h1
        v-if="isAuthenticated"
        class="text-yellow-400 text-xs sm:text-sm font-serif"
      >
        You are logged in
      </h1>

      <h3 class="text-white text-base sm:text-xl font-serif">
        {{ $t("findTerm") }}
      </h3>
      <h1 class="text-white/55 text-xs sm:text-sm font-serif hidden sm:block">
        {{ $t("findIn") }}
      </h1>

      <UiMainInput />
    </div>
  </div>

  <UiEmptyState v-if="!selectedWord" />
  <ModulesConceptSectionConcept v-else />
</template>

<script setup lang="ts">
import UiMainInput from "@/components/ui/mianInput.vue";

const { selectedWord, resetAll } = useSearch();
const { isAuthenticated } = useAuth();

resetAll();
</script>

<template>
  <div class="w-full px-10 sm:px-8 lg:px-6">
    <div
      class="flex flex-col sm:flex-row items-stretch sm:items-center w-full max-w-lg mx-auto rounded-lg overflow-hidden"
    >
      <input
        v-model="query"
        type="text"
        placeholder="Search..."
        class="flex-1 w-full px-2 sm:px-4 py-2 text-black bg-white outline-none text-sm sm:text-base placeholder:text-xs placeholder:sm:text-base"
      />
      <button
        @click="search"
        class="w-full sm:w-auto px-2 py-1 sm:py-2 bg-[#012a4a] hover:bg-opacity-60 transition-all duration-500 active:bg-[#0f3361] text-white flex items-center justify-center text-xs sm:text-base"
      >
        search
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { query, search } = useSearch();
</script>

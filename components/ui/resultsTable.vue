<template>
  <div class="p-6 sm:p-8 w-full bg-white transition-all duration-500">
    <p class="text-sm text-gray-500 mb-4">
      {{ results.length }} ta natijalar topildi
    </p>

    <div class="border-t border-gray-200">
      <div
        v-for="(item, index) in results"
        :key="index"
        @click="selectWord(item)"
        class="flex items-start gap-2 sm:gap-4 py-2 sm:py-4 border-b border-gray-100 hover:border-l-2 hover:sm:border-l-4 border-l-[#1a4f8a] cursor-pointer"
      >
        <!-- Left blue accent bar
          <div class="w-0.5 self-stretch bg-blue-700 rounded-full" /> -->

        <!-- order number -->
        <span class="text-xs text-gray-400 w-4 pt-1 pl-3 sm:pl-6 shrink-0">
          {{ index + 1 }}
        </span>

        <!-- Malumot -->
        <div class="flex flex-col">
          <span class="text-sm font-semibold text-gray-800">
            {{ item.word }}
          </span>
          <span class="text-xs text-gray-400 mt-0.5">
            {{ item.translations.map((t: any) => t.word).join(".") }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// const tableData = [
//   {
//     title: "Locomotive",
//     subtitle: "Lokomotiv · Локомотив · Локомотив",
//   },
//   {
//     title: "Diesel locomotive",
//     subtitle: "Dizel lokomotiv · Тепловоз · Дизельді локомотив",
//   },
//   {
//     title: "Electric locomotive",
//     subtitle: "Elektrovoz · Электровоз · Електрлі локомотив",
//   },
//   {
//     title: "Locomotive depot",
//     subtitle: "Lokomotiv deposi · Депо · Локомотив депосы",
//   },
//   {
//     title: "Locomotive driver",
//     subtitle: "Mashinachi · Машинист · Машинист",
//   },
// ];

// const props = defineProps<{
//   tableData?: { title: string; subtitle?: string };
// }>();

const { results, selectWord } = useSearch();
</script>

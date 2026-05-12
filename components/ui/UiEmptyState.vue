<template>
  <div class="flex flex-col items-center gap-8 py-12 px-4">
    <!-- If no history: illustration + text -->
    <template v-if="history.length === 0">
      <div class="flex flex-col items-center gap-4 text-center">
        <!-- SVG illustration (replace src with your actual file path) -->
        <!-- Option A: inline SVG (recommended — no extra request) -->
        <img :src="svg" alt="image" />

        <h2 class="text-base sm:text-lg font-serif text-gray-700">
          {{ $t("findTerm") }}
        </h2>
        <p class="text-xs sm:text-sm text-gray-400 max-w-xs">
          {{ $t("knowIn") }}
        </p>
      </div>
    </template>

    <!-- If history exists: history list -->
    <template v-else>
      <div class="w-full max-w-lg">
        <div class="flex items-center justify-between mb-3 px-1">
          <span
            class="text-xs font-medium text-gray-400 uppercase tracking-wide"
          >
            {{ $t("recentSearches") }}
          </span>
          <button
            class="text-xs text-[#1d6fa4] hover:underline transition-all"
            @click="clearHistory"
          >
            {{ $t("clearAll") }}
          </button>
        </div>

        <div class="flex flex-col gap-1.5">
          <div
            v-for="item in history"
            :key="item.id"
            class="flex items-center gap-3 px-4 py-2.5 bg-white rounded-lg border border-gray-100 cursor-pointer hover:bg-[#f0f5fa] transition-colors duration-150 group"
            @click="restoreSearch(item)"
          >
            <!-- clock icon (inline svg, no extra dep) -->
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#b0bec5"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="flex-shrink-0"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span class="flex-1 text-sm text-[#1a2e3d] truncate">{{
              item.word
            }}</span>
            <span
              v-if="item.category"
              class="text-[10px] px-2 py-0.5 rounded-full bg-[#e6f1fb] text-[#185fa5] whitespace-nowrap flex-shrink-0"
            >
              {{ item.category }}
            </span>
            <!-- remove button -->
            <button
              class="opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-gray-300 hover:text-gray-500"
              @click.stop="removeFromHistory(item.id)"
              :aria-label="`Remove ${item.word} from history`"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import svg from "@/assests/images/svgs/empty_state_svg.svg";
const { history, removeFromHistory, clearHistory } = useHistory();
const { query, search } = useSearch();

const restoreSearch = (item: any) => {
  query.value = item.word;
  search();
};
</script>

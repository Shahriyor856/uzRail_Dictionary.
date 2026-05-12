<template>
  <div class="w-full px-6 sm:px-8 lg:px-6">
    <div class="relative w-full max-w-lg mx-auto">
      <!-- Search input row -->
      <div
        class="flex items-center w-full bg-white rounded-xl overflow-hidden transition-all duration-200"
        :class="isFocused ? 'ring-2 ring-white/40' : 'ring-1 ring-white/10'"
      >
        <!-- search icon -->
        <svg
          class="w-4 h-4 ml-4 flex-shrink-0 transition-colors duration-200"
          :class="isFocused ? 'text-[#012a4a]' : 'text-gray-300'"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          v-model="query"
          type="text"
          :placeholder="$t('search') + '...'"
          class="flex-1 px-3 py-3 sm:py-3.5 text-[#012a4a] bg-transparent outline-none text-sm sm:text-base placeholder:text-gray-300"
          autocomplete="off"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
          @keydown.enter="onEnter"
          @keydown.arrow-down.prevent="moveDown"
          @keydown.arrow-up.prevent="moveUp"
          @keydown.escape="closeDropdown"
        />

        <!-- clear button -->
        <Transition name="fade">
          <button
            v-if="query.length > 0"
            @mousedown.prevent="clearQuery"
            class="mr-2 p-1 rounded-full text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition-all duration-150"
            aria-label="Clear search"
          >
            <svg
              width="14"
              height="14"
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
        </Transition>

        <!-- divider -->
        <div class="w-px h-6 bg-gray-200 flex-shrink-0"></div>

        <!-- search button -->
        <button
          @click="onSearch"
          class="px-4 sm:px-5 py-3 sm:py-3.5 bg-transparent hover:bg-[#f0f5fa] text-[#012a4a] font-medium text-xs sm:text-sm transition-colors duration-150 flex-shrink-0"
        >
          {{ $t("search") }}
        </button>
      </div>

      <!-- Autocomplete dropdown -->
      <Transition name="dropdown">
        <div
          v-if="showDropdown"
          class="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl overflow-hidden z-50"
          style="
            box-shadow: 0 8px 32px rgba(1, 42, 74, 0.13);
            border: 0.5px solid #dde4ea;
          "
        >
          <!-- results -->
          <template v-if="dropdownItems.length > 0">
            <div
              v-for="(item, i) in dropdownItems"
              :key="item.word"
              class="flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-50 last:border-b-0 transition-colors duration-100"
              :class="i === activeIndex ? 'bg-[#f0f5fa]' : 'hover:bg-[#f7fafb]'"
              @mousedown.prevent="selectItem(item)"
            >
              <!-- icon -->
              <svg
                class="w-3.5 h-3.5 text-[#1d6fa4] flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>

              <span class="flex-1 min-w-0">
                <span class="text-sm font-medium text-[#0d2d4a] block truncate">
                  <span
                    v-for="(part, pi) in highlight(item.word)"
                    :key="pi"
                    :class="
                      part.match
                        ? 'bg-[#d6eaf8] text-[#1056a0] rounded px-0.5'
                        : ''
                    "
                    >{{ part.text }}</span
                  >
                </span>
                <span class="text-xs text-gray-400 block truncate mt-0.5">
                  {{ item.translationPreview }}
                </span>
              </span>

              <span
                v-if="item.category"
                class="text-[10px] px-2 py-0.5 rounded-full bg-[#e6f1fb] text-[#185fa5] whitespace-nowrap flex-shrink-0"
              >
                {{ item.categoryLabel }}
              </span>
            </div>
          </template>

          <!-- no results state -->
          <div
            v-else
            class="flex items-center gap-3 px-4 py-4 text-sm text-gray-400"
          >
            <svg
              class="w-4 h-4 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {{ $t("noResults") ?? "No results found" }}
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const { query, search, results, selectWord } = useSearch();
const { addToHistory } = useHistory();

// ─── State ────────────────────────────────────────────────────────────────────

const isFocused = ref(false);
const activeIndex = ref(-1);

const showDropdown = computed(
  () => isFocused.value && query.value.trim().length > 0,
);

const categoryLabels: Record<string, string> = {
  "rolling-stock": "Rolling Stock",
  infrastructure: "Infrastructure",
  signalling: "Signalling & Safety",
  operations: "Operations",
  maintenance: "Maintenance",
  administration: "Administration",
};

const dropdownItems = computed(() =>
  results.value.slice(0, 6).map((w: any) => ({
    word: w.word,
    translationPreview: w.translations.map((t: any) => t.word).join(" · "),
    category: w.category ?? null,
    categoryLabel: categoryLabels[w.category] ?? w.category,
    raw: w,
  })),
);

// ─── Highlight ────────────────────────────────────────────────────────────────

const highlight = (word: string) => {
  const q = query.value.trim().toLowerCase();
  if (!q) return [{ text: word, match: false }];
  const idx = word.toLowerCase().indexOf(q);
  if (idx === -1) return [{ text: word, match: false }];
  return [
    { text: word.slice(0, idx), match: false },
    { text: word.slice(idx, idx + q.length), match: true },
    { text: word.slice(idx + q.length), match: false },
  ];
};

// ─── Events ───────────────────────────────────────────────────────────────────

const onInput = () => {
  activeIndex.value = -1;
  search();
};

const onFocus = () => {
  isFocused.value = true;
};

const onBlur = () => {
  setTimeout(() => {
    isFocused.value = false;
    activeIndex.value = -1;
  }, 150);
};

const closeDropdown = () => {
  isFocused.value = false;
  activeIndex.value = -1;
};

const clearQuery = () => {
  query.value = "";
  search();
  activeIndex.value = -1;
};

const moveDown = () => {
  if (activeIndex.value < dropdownItems.value.length - 1) activeIndex.value++;
};

const moveUp = () => {
  if (activeIndex.value > 0) activeIndex.value--;
};

const onEnter = () => {
  const active = dropdownItems.value[activeIndex.value];
  if (active) selectItem(active);
  else onSearch();
};

// Dropdown click → Concept directly
const selectItem = (item: any) => {
  query.value = item.word;
  addToHistory(item.word, item.categoryLabel);
  closeDropdown();
  selectWord(item.raw);
  console.log(item.raw);
};

// Search button → same as picking first dropdown item if results exist
const onSearch = () => {
  if (!query.value.trim()) return;
  search();
  const first = results.value[0];
  if (first) {
    addToHistory(first.word, categoryLabels[first.category] ?? first.category);
    closeDropdown();
    selectWord(first);
  }
};
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

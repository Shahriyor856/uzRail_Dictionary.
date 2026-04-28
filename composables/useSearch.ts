import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import data from "@/constants/data.json";

// ─── State ───────────────────────────────────────────────────────────────────

// Current search input value
const query = ref("");

// List of words matching the current search or selected category
const results = ref<any[]>([]);

// The word the user clicked to view in detail (Concept page)
const selectedWord = ref<any>(null);

// The category the user clicked to browse (Library page)
const selectedCategory = ref<string | null>(null);

// ─── Search ───────────────────────────────────────────────────────────────────

// Filters words by selectedCategory first, then by query string
// If no query → shows all words in the category (library mode)
// If no category → shows nothing until user types (translator mode)
const search = () => {
  const pool = selectedCategory.value
    ? data.words.filter((w: any) => w.category === selectedCategory.value)
    : data.words;

  if (!query.value.trim()) {
    results.value = selectedCategory.value ? pool : [];
    return;
  }

  results.value = pool.filter((item: any) =>
    item.translations.some((t: any) =>
      t.word.toLowerCase().includes(query.value.toLowerCase()),
    ),
  );
};

// ─── Category ─────────────────────────────────────────────────────────────────

// Called when user clicks a category card in Library
// Sets the active category and immediately loads all its words
const selectCategory = (id: string) => {
  selectedCategory.value = id;
  selectedWord.value = null;
  query.value = "";
  search();
};

// Called when user clicks "← Kategoriyalarga qaytish" in Library
// Clears category and results, returns to category grid
const clearCategory = () => {
  selectedCategory.value = null;
  results.value = [];
  selectedWord.value = null;
  query.value = "";
};

// ─── Word ─────────────────────────────────────────────────────────────────────

// Called when user clicks a word row in ResultsTable
// Opens the Concept (word detail) view
const selectWord = (word: any) => {
  selectedWord.value = word;
};

// Called when user clicks "← Orqaga qaytish" in Concept view
// Returns to the results list (works in both Translator and Library)
const goBack = () => {
  selectedWord.value = null;
};

// ─── Reset ────────────────────────────────────────────────────────────────────

// Clears all state — called automatically on route/page change
// Prevents stale state leaking between Translator and Library pages
const resetAll = () => {
  query.value = "";
  results.value = [];
  selectedWord.value = null;
  selectedCategory.value = null;
};

// ─── Watchers ─────────────────────────────────────────────────────────────────

// Re-runs search whenever query or selectedCategory changes
watch([query, selectedCategory], () => search());

// ─── Composable ───────────────────────────────────────────────────────────────

export const useSearch = () => {
  const route = useRoute();

  // Resets all state when navigating between pages (e.g. Translator ↔ Library)
  watch(
    () => route.path,
    () => resetAll(),
  );

  return {
    query,           // v-model on search input
    results,         // list rendered in ResultsTable
    selectedWord,    // drives Concept view visibility
    selectedCategory,// drives Library drill-down visibility
    search,          // manual trigger if needed
    selectCategory,  // called from CategoriesGrid @select
    clearCategory,   // called from back button in Library
    selectWord,      // called from ResultsTable row click
    goBack,          // called from back button in Concept
    resetAll,        // called on route change, can also call manually
  };
};
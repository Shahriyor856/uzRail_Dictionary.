import { ref } from "vue";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface HistoryItem {
  id: string;
  word: string;
  category?: string;
  searchedAt: number;
}

// ─── State ────────────────────────────────────────────────────────────────────

const STORAGE_KEY = "uzrail_search_history";
const MAX_ITEMS = 8;

const loadFromStorage = (): HistoryItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const history = ref<HistoryItem[]>(loadFromStorage());

const saveToStorage = () => {
  // TODO(backend): replace with POST /api/history
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value));
};

// ─── Actions ──────────────────────────────────────────────────────────────────

const addToHistory = (word: string, category?: string) => {
  // TODO(backend): replace body with await api.post('/history', { word, category })

  // avoid duplicates — remove existing entry with same word
  history.value = history.value.filter(
    (h) => h.word.toLowerCase() !== word.toLowerCase(),
  );

  const item: HistoryItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    word,
    category,
    searchedAt: Date.now(),
  };

  history.value.unshift(item);

  if (history.value.length > MAX_ITEMS) {
    history.value = history.value.slice(0, MAX_ITEMS);
  }

  saveToStorage();
};

const removeFromHistory = (id: string) => {
  // TODO(backend): replace with await api.delete(`/history/${id}`)
  history.value = history.value.filter((h) => h.id !== id);
  saveToStorage();
};

const clearHistory = () => {
  // TODO(backend): replace with await api.delete('/history')
  history.value = [];
  saveToStorage();
};

// ─── Composable ───────────────────────────────────────────────────────────────

export const useHistory = () => ({
  history,
  addToHistory,
  removeFromHistory,
  clearHistory,
});
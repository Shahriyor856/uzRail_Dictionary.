import { ref, watch } from "vue";
import data from "@/constants/data.json";

const query = ref("");
const results = ref<any[]>([]);
const selectedWord = ref<any>(null);

export const useSearch = () => {
  const search = () => {
    if (!query.value.trim()) {
      results.value = [];
      return;
    }
    results.value = data.words.filter((item) =>
      item.translations.some((t) =>
        t.word.toLowerCase().includes(query.value.toLowerCase()),
      ),
    );
  };

  watch(query, () => {
    search();
  });

  const selectWord = (word: any) => {
    selectedWord.value = word;
  };

  const goBack = () => {
    selectedWord.value = null;
  };

  return { query, results, selectedWord, search, selectWord, goBack };
};

<!-- components/Ui/LangDropdown.vue -->
<template>
  <div class="relative" ref="dropdownRef">
    <!-- Trigger button -->
    <button
      type="button"
      @click="open = !open"
      class="flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium transition-all"
      :class="
        open
          ? 'border-yellow-400 text-yellow-400 bg-yellow-400/10'
          : 'border-white/15 text-slate-400'
      "
    >
      {{ current.label }}
      <svg
        class="w-3 h-3 transition-transform"
        :class="open ? 'rotate-180' : ''"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>

    <!-- Dropdown -->
    <div
      v-if="open"
      class="absolute top-full mt-2 left-0 bg-[#0d2137] border border-white/10 rounded-xl overflow-hidden z-50 min-w-[140px] shadow-xl"
    >
      <button
        v-for="lang in langs"
        :key="lang.code"
        type="button"
        @click="select(lang)"
        class="w-full text-left px-4 py-2.5 text-xs transition-all flex items-center justify-between"
        :class="
          current.code === lang.code
            ? 'text-yellow-400 bg-yellow-400/10'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        "
      >
        {{ lang.label }}
        <svg
          v-if="current.code === lang.code"
          class="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="m5 12 5 5L20 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["change"]);

const open = ref(false);
const dropdownRef = ref(null);

const langs = [
  { code: "uz", label: "O'zbekcha" },
  { code: "oz", label: "Ўзбекча" },
  { code: "kz", label: "Қазақша" },
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
];

const current = ref(langs[0]);

const select = (lang) => {
  current.value = lang;
  open.value = false;
  emit("change", lang.code); // 👈 fixed: lang.code not lang, code
};

// close on outside click — no VueUse needed
const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    open.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>

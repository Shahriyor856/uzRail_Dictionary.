<!-- pages/suggest.vue (user-facing suggest a word form) -->
<template>
  <div class="flex items-center justify-center px-4 py-6 sm:py-8 md:py-10">
    <div class="max-w-screen-md w-full flex flex-col gap-4 sm:gap-6">
      <!-- Warning banner -->
      <div
        class="bg-[#fde8e6] rounded-xl p-3 sm:p-4 flex items-start gap-2 sm:gap-3"
      >
        <el-icon class="text-red-600 shrink-0 mt-0.5 text-base sm:text-lg">
          <Warning />
        </el-icon>
        <p class="text-[#b03a2e] text-xs sm:text-sm leading-relaxed">
          Faqat temir yo'l sohasiga oid atama va terminlarni yuboring. Umumiy
          so'zlar, shaxs nomlari yoki mavzuga aloqasiz so'zlar qabul qilinmaydi.
        </p>
      </div>

      <!-- Form -->
      <form class="flex flex-col gap-3 sm:gap-4" @submit.prevent="handleSubmit">
        <!-- Required fields -->
        <UiBaseInput
          v-model="form.word"
          label="So'z / Atama"
          placeholder="Masalan: Lokomotiv"
          :error="errors.word"
        />
        <UiBaseInput
          v-model="form.meaning"
          label="Ma'nosi"
          placeholder="Masalan: Poyezdni tortuvchi harakat birligi"
          :error="errors.meaning"
        />

        <!-- Category dropdown (optional) -->
        <div class="flex flex-col gap-1 sm:gap-2">
          <label
            class="text-xs sm:text-sm font-medium flex items-center gap-1.5"
          >
            Turkimini tanlang
            <span class="text-[10px] text-gray-400 font-normal"
              >(ixtiyoriy)</span
            >
          </label>

          <div ref="dropdownRef" class="relative">
            <!-- Trigger button -->
            <button
              type="button"
              @click="isDropdownOpen = !isDropdownOpen"
              class="flex items-center justify-between w-full bg-white border border-[#dde6f0] rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm hover:bg-[#f8fafc] transition-colors duration-200 outline-none text-left"
            >
              <span
                :class="selectedCategory ? 'text-gray-800' : 'text-gray-400'"
              >
                {{ selectedCategory || "Bilsangiz tanlang..." }}
              </span>
              <div class="flex items-center gap-2">
                <!-- Clear button — only visible when a category is selected -->
                <span
                  v-if="selectedCategory"
                  @click.stop="clearCategory"
                  class="text-gray-300 hover:text-gray-500 text-xs transition-colors duration-150"
                  title="Tozalash"
                  >✕</span
                >
                <span
                  class="text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': isDropdownOpen }"
                  >▼</span
                >
              </div>
            </button>

            <!-- Options list -->
            <Transition name="dropdown">
              <div
                v-if="isDropdownOpen"
                class="absolute top-full left-0 right-0 mt-1 bg-white border border-[#dde6f0] rounded-xl shadow-lg z-50 overflow-hidden"
              >
                <div class="max-h-60 overflow-y-auto py-1">
                  <button
                    v-for="option in CATEGORIES"
                    :key="option.value"
                    type="button"
                    @click="selectCategory(option)"
                    class="w-full text-left px-4 py-2.5 text-xs sm:text-sm hover:bg-[#f8fafc] transition-colors duration-150"
                    :class="{
                      'bg-blue-50 text-blue-600':
                        selectedCategory === option.label,
                    }"
                  >
                    {{ option.label }}
                  </button>
                </div>
              </div>
            </Transition>
          </div>

          <p class="text-[11px] text-gray-400 leading-relaxed">
            Aniq bilmasangiz bo'sh qoldiring — mutaxassis belgilaydi.
          </p>
        </div>

        <button
          type="submit"
          class="bg-[#d4edda] text-[#1a7a4a] font-semibold text-xs sm:text-sm rounded-lg py-2 sm:py-2.5 transition-colors duration-200 hover:bg-[#c2e0cb]"
        >
          Yuborish
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { Warning } from "@element-plus/icons-vue";
import { onClickOutside } from "@vueuse/core";

// ── Constants ─────────────────────────────────────────────
const CATEGORIES = [
  { value: "rolling_stock", label: "Rolling Stock" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "signalling", label: "Signalling & Safety" },
  { value: "operations", label: "Operations" },
  { value: "maintenance", label: "Maintenance" },
  { value: "administration", label: "Administration" },
];

// ── Dropdown state ────────────────────────────────────────
const isDropdownOpen = ref(false);
const selectedCategory = ref("");
const dropdownRef = ref<HTMLElement | null>(null);

// Close dropdown when clicking outside
onClickOutside(dropdownRef, () => {
  isDropdownOpen.value = false;
});

function selectCategory(option: { value: string; label: string }) {
  selectedCategory.value = option.label;
  isDropdownOpen.value = false;
}

function clearCategory() {
  selectedCategory.value = "";
}

// ── Form state ────────────────────────────────────────────
const form = reactive({ word: "", meaning: "" });
const errors = reactive({ word: "", meaning: "" });

function handleSubmit() {
  errors.word = "";
  errors.meaning = "";

  if (!form.word.trim()) errors.word = "So'z kiritilmadi";
  if (!form.meaning.trim()) errors.meaning = "Ma'nosi kiritilmadi";

  if (errors.word || errors.meaning) return;

  // TODO: POST /api/suggestions  { word, meaning, category: selectedCategory || null }
  console.log({
    word: form.word,
    meaning: form.meaning,
    category: selectedCategory.value || null,
  });
}
</script>

<style scoped>
/* Dropdown fade + slide */
.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

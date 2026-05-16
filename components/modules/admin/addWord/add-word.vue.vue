<!-- pages/admin/addWord.vue -->
<template>
  <div class="min-h-full bg-[#f0f4f8] px-4 sm:px-6 py-6 sm:py-8">
    <div class="max-w-2xl mx-auto flex flex-col gap-6">
      <!-- Page title -->
      <div>
        <h1 class="text-lg sm:text-xl font-semibold text-[#012a4a]">
          So'z qo'shish
        </h1>
        <p class="text-xs sm:text-sm text-gray-400 mt-0.5">
          Lug'atga yangi temir yo'l atamasi qo'shing
        </p>
      </div>

      <!-- Warning banner -->
      <div
        class="bg-[#fde8e6] rounded-xl p-3 sm:p-4 flex items-start gap-2 sm:gap-3"
      >
        <el-icon class="text-red-500 shrink-0 mt-0.5 text-base">
          <Warning />
        </el-icon>
        <p class="text-[#b03a2e] text-xs sm:text-sm leading-relaxed">
          Faqat temir yo'l sohasiga oid atama va terminlarni kiriting. Umumiy
          so'zlar yoki mavzuga aloqasiz atamalar qabul qilinmaydi.
        </p>
      </div>

      <!-- Form -->
      <form
        class="bg-white rounded-xl border border-[#dde6f0] flex flex-col gap-5 p-4 sm:p-6"
        @submit.prevent="handleSubmit"
      >
        <!-- Main term (Uzbek word + meaning) -->
        <div>
          <p
            class="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3"
          >
            Asosiy atama
          </p>
          <div class="flex flex-col gap-3">
            <UiBaseInput
              v-model="form.word"
              label="So'z / Atama (o'zbek)"
              placeholder="Masalan: Lokomotiv"
              :error="errors.word"
            />
            <UiBaseInput
              v-model="form.meaning"
              label="Ma'nosi"
              placeholder="Masalan: Poyezdni tortuvchi harakat birligi"
              :error="errors.meaning"
            />
          </div>
        </div>

        <div class="border-t border-[#f0f4f8]" />

        <!-- Optional translations -->
        <div>
          <p
            class="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3"
          >
            Tarjimalar
            <span class="text-gray-300 font-normal normal-case tracking-normal"
              >(ixtiyoriy)</span
            >
          </p>
          <div class="flex flex-col gap-3">
            <UiBaseInput
              v-model="form.russian"
              label="Ruscha"
              placeholder="Masalan: Локомотив"
            />
            <UiBaseInput
              v-model="form.kazakh"
              label="Qozoqcha"
              placeholder="Masalan: Локомотив"
            />
            <UiBaseInput
              v-model="form.english"
              label="Inglizcha"
              placeholder="Masalan: Locomotive"
            />
          </div>
        </div>

        <div class="border-t border-[#f0f4f8]" />

        <!-- Category dropdown -->
        <div>
          <p
            class="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3"
          >
            Kategoriya <span class="text-red-400">*</span>
          </p>

          <div class="flex flex-col gap-1">
            <label class="text-xs sm:text-sm font-medium text-gray-700"
              >Turkimini tanlang</label
            >

            <div ref="dropdownRef" class="relative">
              <!-- Trigger button -->
              <button
                type="button"
                @click="isDropdownOpen = !isDropdownOpen"
                class="flex items-center justify-between w-full border rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm transition-colors duration-200 outline-none text-left"
                :class="
                  errors.category
                    ? 'bg-[#fff5f5] border-red-300 text-gray-700'
                    : 'bg-white border-[#dde6f0] hover:bg-[#f8fafc] text-gray-700'
                "
              >
                <span
                  :class="selectedCategory ? 'text-gray-800' : 'text-gray-400'"
                >
                  {{ selectedCategory || "Kategoriya tanlang..." }}
                </span>
                <span
                  class="text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': isDropdownOpen }"
                  >▼</span
                >
              </button>

              <p v-if="errors.category" class="text-red-400 text-[11px] mt-1">
                {{ errors.category }}
              </p>

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
          </div>
        </div>

        <div class="border-t border-[#f0f4f8]" />

        <!-- Actions -->
        <div class="flex gap-3">
          <button
            type="button"
            @click="resetForm"
            class="px-4 py-2 rounded-lg text-xs sm:text-sm text-gray-400 border border-[#dde6f0] hover:bg-[#f8fafc] transition-colors duration-200"
          >
            Tozalash
          </button>
          <button
            type="submit"
            class="flex-1 bg-[#012a4a] text-white font-semibold text-xs sm:text-sm rounded-lg py-2 sm:py-2.5 transition-all duration-200 hover:bg-[#01355e]"
          >
            Lug'atga qo'shish
          </button>
        </div>
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
  errors.category = "";
  isDropdownOpen.value = false;
}

// ── Form state ────────────────────────────────────────────
const form = reactive({
  word: "",
  meaning: "",
  russian: "",
  kazakh: "",
  english: "",
});

const errors = reactive({
  word: "",
  meaning: "",
  category: "",
});

function resetForm() {
  form.word = "";
  form.meaning = "";
  form.russian = "";
  form.kazakh = "";
  form.english = "";
  selectedCategory.value = "";
  errors.word = "";
  errors.meaning = "";
  errors.category = "";
}

function handleSubmit() {
  // Reset errors
  errors.word = "";
  errors.meaning = "";
  errors.category = "";

  // Validate required fields
  if (!form.word.trim()) errors.word = "So'z kiritilmadi";
  if (!form.meaning.trim()) errors.meaning = "Ma'nosi kiritilmadi";
  if (!selectedCategory.value) errors.category = "Kategoriya tanlanmadi";

  if (errors.word || errors.meaning || errors.category) return;

  // TODO: POST /api/words  { ...form, category: selectedCategory.value }
  console.log({ ...form, category: selectedCategory.value });
  resetForm();
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

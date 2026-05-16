<!-- pages/admin/suggestions.vue -->
<template>
  <div class="min-h-full bg-[#f0f4f8] px-4 sm:px-6 py-6 sm:py-8">
    <div class="max-w-2xl mx-auto flex flex-col gap-6">
      <!-- Page title -->
      <div>
        <h1 class="text-lg sm:text-xl font-semibold text-[#012a4a]">
          Takliflar
        </h1>
        <p class="text-xs sm:text-sm text-gray-400 mt-0.5">
          Foydalanuvchilar tomonidan yuborilgan yangi atama takliflari
        </p>
      </div>

      <!-- Stats row -->
      <div class="grid grid-cols-3 gap-3">
        <div class="bg-white rounded-xl p-3 sm:p-4 border border-[#dde6f0]">
          <p class="text-[10px] sm:text-xs text-gray-400 mb-1">Kutilayotgan</p>
          <p class="text-xl sm:text-2xl font-semibold text-[#c8920a]">
            {{ pendingCount }}
          </p>
        </div>
        <div class="bg-white rounded-xl p-3 sm:p-4 border border-[#dde6f0]">
          <p class="text-[10px] sm:text-xs text-gray-400 mb-1">Tasdiqlangan</p>
          <p class="text-xl sm:text-2xl font-semibold text-[#1a7a4a]">
            {{ approvedCount }}
          </p>
        </div>
        <div class="bg-white rounded-xl p-3 sm:p-4 border border-[#dde6f0]">
          <p class="text-[10px] sm:text-xs text-gray-400 mb-1">Rad etilgan</p>
          <p class="text-xl sm:text-2xl font-semibold text-red-500">
            {{ rejectedCount }}
          </p>
        </div>
      </div>

      <!-- Suggestions list -->
      <div class="flex flex-col gap-3">
        <!-- Empty state -->
        <div
          v-if="pendingSuggestions.length === 0"
          class="bg-white rounded-xl border border-[#dde6f0] p-8 text-center"
        >
          <p class="text-gray-400 text-sm">Hozircha yangi takliflar yo'q</p>
        </div>

        <!-- Suggestion card -->
        <div
          v-for="item in pendingSuggestions"
          :key="item.id"
          class="bg-white rounded-xl border border-[#dde6f0] overflow-hidden transition-all duration-200"
        >
          <!-- Header row — click to expand/collapse -->
          <button
            type="button"
            class="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-[#f8fafc] transition-colors duration-150"
            @click="toggleItem(item.id)"
          >
            <div>
              <p class="text-sm font-semibold text-[#012a4a]">
                {{ item.word }}
              </p>
              <p class="text-[11px] text-gray-400 mt-0.5">
                {{ item.user }} · {{ item.time }}
              </p>
            </div>
            <span
              class="text-gray-300 transition-transform duration-200 text-xs"
              :class="{ 'rotate-180': openId === item.id }"
              >▼</span
            >
          </button>

          <!-- Expanded body -->
          <Transition name="expand">
            <div v-if="openId === item.id" class="border-t border-[#f0f4f8]">
              <div class="px-4 py-3 flex flex-col gap-3">
                <!-- Meaning -->
                <div>
                  <p
                    class="text-[10px] text-gray-400 mb-1 font-medium uppercase tracking-wide"
                  >
                    Ma'nosi
                  </p>
                  <p class="text-sm text-gray-700">{{ item.meaning }}</p>
                </div>

                <!-- Category selector -->
                <div>
                  <p
                    class="text-[10px] text-gray-400 mb-1 font-medium uppercase tracking-wide flex items-center gap-1"
                  >
                    Kategoriya
                    <!-- Warn admin if no category selected yet -->
                    <span
                      v-if="!item.selectedCategory"
                      class="text-[#c8920a] text-[10px]"
                      >* Majburiy</span
                    >
                    <span v-else class="text-[#1a7a4a] text-[10px]"
                      >✓ Tanlandi</span
                    >
                  </p>

                  <!-- Show user's suggested category if they provided one -->
                  <div
                    v-if="item.suggestedCategory"
                    class="flex items-center gap-2 mb-2"
                  >
                    <span class="text-[11px] text-gray-500"
                      >Foydalanuvchi taklifi:</span
                    >
                    <span
                      class="text-[11px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full"
                    >
                      {{ item.suggestedCategory }}
                    </span>
                  </div>
                  <p v-else class="text-[11px] text-gray-400 mb-2">
                    Foydalanuvchi kategoriya tanlamagan — siz tanlashingiz
                    shart.
                  </p>

                  <!-- Category dropdown -->
                  <div class="relative">
                    <button
                      type="button"
                      @click="toggleCategoryDropdown(item.id)"
                      class="flex items-center justify-between w-full bg-[#f8fafc] border rounded-lg px-3 py-2 text-xs transition-colors duration-150 outline-none text-left"
                      :class="
                        item.selectedCategory
                          ? 'border-[#1a7a4a]/40 text-[#1a7a4a]'
                          : 'border-[#dde6f0] text-gray-400'
                      "
                    >
                      <span>{{
                        item.selectedCategory || "Kategoriya tanlang..."
                      }}</span>
                      <span
                        class="text-gray-300 transition-transform duration-200"
                        :class="{ 'rotate-180': categoryOpenId === item.id }"
                        >▼</span
                      >
                    </button>

                    <Transition name="dropdown">
                      <div
                        v-if="categoryOpenId === item.id"
                        class="absolute top-full left-0 right-0 mt-1 bg-white border border-[#dde6f0] rounded-xl shadow-lg z-50 overflow-hidden"
                      >
                        <div class="max-h-48 overflow-y-auto py-1">
                          <button
                            v-for="cat in CATEGORIES"
                            :key="cat.value"
                            type="button"
                            @click="selectCategory(item, cat)"
                            class="w-full text-left px-4 py-2 text-xs hover:bg-[#f8fafc] transition-colors duration-150"
                            :class="{
                              'bg-blue-50 text-blue-600':
                                item.selectedCategory === cat.label,
                            }"
                          >
                            {{ cat.label }}
                          </button>
                        </div>
                      </div>
                    </Transition>
                  </div>
                </div>

                <!-- Approve / Reject actions -->
                <div class="flex gap-2 pt-1">
                  <button
                    type="button"
                    :disabled="!item.selectedCategory"
                    @click="approve(item.id)"
                    class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                    :class="
                      item.selectedCategory
                        ? 'bg-[#d4edda] text-[#1a7a4a] hover:bg-[#c2e0cb]'
                        : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    "
                  >
                    <span>✓</span> Tasdiqlash
                  </button>
                  <button
                    type="button"
                    @click="reject(item.id)"
                    class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-[#fde8e6] text-red-500 hover:bg-red-100 transition-all duration-200"
                  >
                    <span>✕</span> Rad etish
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// ── Types ─────────────────────────────────────────────────
interface Suggestion {
  id: number;
  word: string;
  meaning: string;
  user: string;
  time: string;
  status: "pending" | "approved" | "rejected";
  suggestedCategory: string | null; // null = user skipped category
  selectedCategory: string | null; // admin must fill if suggestedCategory is null
}

// ── Constants ─────────────────────────────────────────────
const CATEGORIES = [
  { value: "rolling_stock", label: "Rolling Stock" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "signalling", label: "Signalling & Safety" },
  { value: "operations", label: "Operations" },
  { value: "maintenance", label: "Maintenance" },
  { value: "administration", label: "Administration" },
];

// ── State — replace with API fetch ────────────────────────
const suggestions = ref<Suggestion[]>([
  {
    id: 1,
    word: "Lokomotiv",
    meaning: "Poyezdni tortuvchi harakat birligi",
    user: "user_482",
    time: "2 soat oldin",
    status: "pending",
    suggestedCategory: "Rolling Stock",
    selectedCategory: "Rolling Stock",
  },
  {
    id: 2,
    word: "Shpallar",
    meaning:
      "Relslarni ushlab turuvchi ko'ndalang yog'och yoki beton qo'yimlar",
    user: "user_119",
    time: "5 soat oldin",
    status: "pending",
    suggestedCategory: null, // user skipped — admin must pick
    selectedCategory: null,
  },
  {
    id: 3,
    word: "Semafor",
    meaning: "Temir yo'lda signallar beruvchi qurilma",
    user: "user_007",
    time: "1 kun oldin",
    status: "pending",
    suggestedCategory: "Signalling & Safety",
    selectedCategory: "Signalling & Safety",
  },
]);

// ── Computed counts for stats row ─────────────────────────
const pendingCount = computed(
  () => suggestions.value.filter((s) => s.status === "pending").length,
);
const approvedCount = computed(
  () => suggestions.value.filter((s) => s.status === "approved").length,
);
const rejectedCount = computed(
  () => suggestions.value.filter((s) => s.status === "rejected").length,
);

const pendingSuggestions = computed(() =>
  suggestions.value.filter((s) => s.status === "pending"),
);

// ── Accordion state ───────────────────────────────────────
const openId = ref<number | null>(null);
const categoryOpenId = ref<number | null>(null);

function toggleItem(id: number) {
  openId.value = openId.value === id ? null : id;
  categoryOpenId.value = null; // close any open category dropdown
}

function toggleCategoryDropdown(id: number) {
  categoryOpenId.value = categoryOpenId.value === id ? null : id;
}

function selectCategory(
  item: Suggestion,
  cat: { value: string; label: string },
) {
  item.selectedCategory = cat.label;
  categoryOpenId.value = null;
}

// ── Actions — add API calls when backend is ready ─────────
function approve(id: number) {
  const item = suggestions.value.find((s) => s.id === id);
  if (!item?.selectedCategory) return;
  item.status = "approved";
  openId.value = null;
  // TODO: POST /api/suggestions/:id/approve  { category: item.selectedCategory }
}

function reject(id: number) {
  const item = suggestions.value.find((s) => s.id === id);
  if (!item) return;
  item.status = "rejected";
  openId.value = null;
  // TODO: POST /api/suggestions/:id/reject
}
</script>

<style scoped>
/* Accordion expand/collapse */
.expand-enter-active,
.expand-leave-active {
  transition:
    max-height 0.25s ease,
    opacity 0.2s ease;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.expand-enter-to,
.expand-leave-from {
  max-height: 500px;
  opacity: 1;
}

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

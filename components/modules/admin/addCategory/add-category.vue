<!-- pages/admin/addCategory.vue -->
<template>
  <div class="min-h-full bg-[#f0f4f8] px-4 sm:px-6 py-6 sm:py-8">
    <div class="max-w-2xl mx-auto flex flex-col gap-6">
      <!-- Page title -->
      <div>
        <h1 class="text-lg sm:text-xl font-semibold text-[#012a4a]">
          Kategoriya qo'shish
        </h1>
        <p class="text-xs sm:text-sm text-gray-400 mt-0.5">
          Lug'atga yangi kategoriya qo'shing
        </p>
      </div>

      <!-- Existing categories list -->
      <div class="bg-white rounded-xl border border-[#dde6f0] p-4 sm:p-5">
        <p
          class="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3"
        >
          Mavjud kategoriyalar
        </p>
        <div class="flex flex-wrap gap-2">
          <!-- Category badge with delete button -->
          <span
            v-for="cat in existingCategories"
            :key="cat.id"
            class="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border"
            :style="{
              borderColor: cat.color + '40',
              backgroundColor: cat.color + '15',
              color: cat.color,
            }"
          >
            {{ cat.label }}
            <button
              type="button"
              @click="deleteCategory(cat.id)"
              class="opacity-40 hover:opacity-100 transition-opacity duration-150 text-[10px] leading-none"
            >
              ✕
            </button>
          </span>

          <span
            v-if="existingCategories.length === 0"
            class="text-xs text-gray-400"
          >
            Hali kategoriya qo'shilmagan
          </span>
        </div>
      </div>

      <!-- Add category form -->
      <form
        class="bg-white rounded-xl border border-[#dde6f0] flex flex-col gap-5 p-4 sm:p-6"
        @submit.prevent="handleSubmit"
      >
        <!-- Name inputs (Uzbek required, Russian & English optional) -->
        <div>
          <p
            class="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3"
          >
            Kategoriya nomi <span class="text-red-400">*</span>
          </p>
          <div class="flex flex-col gap-3">
            <UiBaseInput
              v-model="form.nameUz"
              label="O'zbekcha nom"
              placeholder="Masalan: Harakatlanuvchi tarkib"
              :error="errors.nameUz"
            />
            <UiBaseInput
              v-model="form.nameRu"
              label="Ruscha nom (ixtiyoriy)"
              placeholder="Masalan: Подвижной состав"
            />
            <UiBaseInput
              v-model="form.nameEn"
              label="Inglizcha nom (ixtiyoriy)"
              placeholder="Masalan: Rolling Stock"
            />
          </div>
        </div>

        <div class="border-t border-[#f0f4f8]" />

        <!-- Color picker with live badge preview -->
        <div>
          <p
            class="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-3"
          >
            Rang tanlang
          </p>
          <div class="flex items-center gap-3 flex-wrap">
            <button
              v-for="color in COLOR_OPTIONS"
              :key="color"
              type="button"
              @click="form.color = color"
              class="w-7 h-7 rounded-full border-2 transition-all duration-150"
              :style="{ backgroundColor: color }"
              :class="
                form.color === color
                  ? 'border-[#012a4a] scale-110 shadow-md'
                  : 'border-transparent hover:scale-105'
              "
            />

            <!-- Live preview badge — only shown when a name is typed -->
            <div
              v-if="form.nameEn || form.nameUz"
              class="ml-2 text-xs px-3 py-1.5 rounded-full border transition-all duration-200"
              :style="{
                borderColor: form.color + '60',
                backgroundColor: form.color + '20',
                color: form.color,
              }"
            >
              {{ form.nameEn || form.nameUz }}
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
            Kategoriya qo'shish
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

// ── Types ─────────────────────────────────────────────────
interface Category {
  id: number;
  label: string;
  color: string;
}

// ── Constants ─────────────────────────────────────────────
const COLOR_OPTIONS = [
  "#c8920a", // gold  (brand accent)
  "#1a7a4a", // green
  "#012a4a", // navy
  "#2563eb", // blue
  "#7c3aed", // violet
  "#dc2626", // red
  "#ea580c", // orange
  "#0891b2", // cyan
];

// ── Existing categories — replace with API fetch ──────────
const existingCategories = ref<Category[]>([
  { id: 1, label: "Rolling Stock", color: "#c8920a" },
  { id: 2, label: "Infrastructure", color: "#1a7a4a" },
  { id: 3, label: "Signalling & Safety", color: "#2563eb" },
  { id: 4, label: "Operations", color: "#7c3aed" },
  { id: 5, label: "Maintenance", color: "#ea580c" },
  { id: 6, label: "Administration", color: "#0891b2" },
]);

// TODO: call DELETE /api/categories/:id, then remove from list
function deleteCategory(id: number) {
  existingCategories.value = existingCategories.value.filter(
    (c) => c.id !== id,
  );
}

// ── Form state ────────────────────────────────────────────
const form = reactive({
  nameUz: "",
  nameRu: "",
  nameEn: "",
  color: COLOR_OPTIONS[0],
});

const errors = reactive({ nameUz: "" });

function resetForm() {
  form.nameUz = "";
  form.nameRu = "";
  form.nameEn = "";
  form.color = COLOR_OPTIONS[0];
  errors.nameUz = "";
}

function handleSubmit() {
  errors.nameUz = "";

  if (!form.nameUz.trim()) {
    errors.nameUz = "O'zbekcha nom kiritilmadi";
    return;
  }

  // TODO: POST /api/categories  { nameUz, nameRu, nameEn, color }
  const newCategory: Category = {
    id: Date.now(),
    label: form.nameEn || form.nameUz, // prefer English label for display
    color: form.color,
  };

  existingCategories.value.push(newCategory);
  resetForm();
}
</script>

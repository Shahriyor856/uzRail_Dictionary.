<!-- pages/takliflar.vue -->
<template>
  <div
    class="h-full flex items-center justify-center px-4 py-6 sm:py-8 md:py-10"
  >
    <div class="max-w-screen-md w-full flex flex-col gap-2 sm:gap-4 md:gap-6">
      <!-- Info box -->
      <div
        class="bg-[#fde8e6]  rounded-xl p-2 sm:p-4 flex items-center gap-2 sm:gap-3"
      >
        <span
          class="text-red-600 mt-0.5 shrink-0 text-base sm:text-lg md:text-xl"
        >
          <el-icon><Warning /></el-icon>
        </span>

        <p class="text-[#b03a2e] text-xs sm:text-sm leading-relaxed">
          Faqat temir yo'l sohasiga oid atama va terminlarni yuboring. Umumiy
          so'zlar, shaxs nomlari yoki mavzuga aloqasiz so'zlar qabul qilinmaydi.
        </p>
      </div>

      <!-- Form -->
      <form class="flex flex-col gap-3 sm:gap-4" @submit.prevent="handleSubmit">
        <UiSuggestIput
          v-model="form.word"
          label="So'z / Atama"
          placeholder="Masalan: Lokomotiv"
          :error="errors.word"
        />
        <UiSuggestIput
          v-model="form.meaning"
          label="Ma'nosi"
          placeholder="Masalan: Poyezdni tortuvchi harakat birligi"
          :error="errors.meaning"
        />

        <button
          type="submit"
          class="bg-[#d4edda] text-[#1a7a4a] font-medium sm:font-semibold text-xs sm:text-sm rounded-lg py-1.5 sm:py-2.5 transition-all duration-300"
        >
          Yuborish
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Warning } from "@element-plus/icons-vue";
import { reactive } from "vue";

const form = reactive({ word: "", meaning: "" });
const errors = reactive({ word: "", meaning: "" });

function handleSubmit() {
  errors.word = "";
  errors.meaning = "";

  if (!form.word.trim()) errors.word = "So'z kiritilmadi";
  if (!form.meaning.trim()) errors.meaning = "Ma'nosi kiritilmadi";

  if (errors.word || errors.meaning) return;

  // send to API
  console.log(form);
}
</script>

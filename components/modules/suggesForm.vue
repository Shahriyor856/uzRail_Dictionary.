<!-- pages/takliflar.vue -->
<template>
  <div
    class="bg-[#0f2a47] min-h-[60vh] flex items-center justify-center px-4 py-10 border-b border-b-gray-600"
  >
    <div class="w-full max-w-[560px] flex flex-col gap-5">
      <!-- Info box -->
      <div
        class="bg-[#0d2a4a] border border-yellow-400/30 rounded-xl p-4 flex gap-3"
      >
        <span class="text-yellow-400 mt-0.5 shrink-0 text-lg">
          <el-icon><Warning /></el-icon>
        </span>

        <p class="text-white/70 text-sm leading-relaxed">
          Faqat
          <span class="text-white font-medium">temir yo'l sohasiga oid</span>
          atama va terminlarni yuboring. Umumiy so'zlar, shaxs nomlari yoki
          mavzuga aloqasiz so'zlar
          <span class="text-red-400 font-medium">qabul qilinmaydi</span>.
        </p>
      </div>

      <!-- Form -->
      <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
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
          class="bg-yellow-400 hover:bg-yellow-300 text-[#0d2a4a] font-semibold text-sm rounded-lg py-2.5 transition-all duration-300"
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

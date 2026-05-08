<!-- pages/admin/index.vue -->
<template>
  <div
    class="max-w-screen-md mx-auto px-4 py-6 sm:py-8 md:py-10 flex flex-col gap-4 sm:gap-6 transition-all duration-500"
  >
    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white border border-[#dde6f0] rounded-xl px-2 sm:px-4 py-1.5 sm:py-3"
      >
        <p class="text-xs sm:text-sm text-[#7a96b0] mb-1">{{ stat.label }}</p>
        <p
          class="text-lg sm:text-xl md:text-2xl font-medium sm:font-semibold"
          :class="stat.color"
        >
          {{ stat.value }}
        </p>
      </div>
    </div>

    <!-- Suggestions -->
    <div>
      <h2
        class="text-xs sm:text-sm font-medium sm:font-semibold text-[#1a2e44] mb-2 sm:mb-4 flex items-center gap-2"
      >
        Yangi takliflar
        <span
          class="bg-[#fef3cd] text-[#a07000] text-xs font-semibold px-2 py-0.5 rounded-full"
        >
          {{ pending.length }} ta
        </span>
      </h2>

      <div class="flex flex-col gap-1.5 sm:gap-2.5">
        <div
          v-for="item in suggestions"
          :key="item.id"
          class="bg-white border rounded-xl overflow-hidden transition-all duration-200"
          :class="item.open ? 'border-[#b8d0f0] shadow-md' : 'border-[#dde6f0]'"
        >
          <!-- Header -->
          <div
            class="px-2 sm:px-4 py-2 sm:py-4 flex items-center justify-between cursor-pointer hover:bg-[#f8fafc]"
            @click="item.open = !item.open"
          >
            <div>
              <p class="text-sm sm:text-base font-semibold text-[#1a2e44]">
                {{ item.word }}
              </p>
              <p class="text-[10px] sm:text-xs text-[#a0b4c8] mt-0.5">
                {{ item.submittedBy }} · {{ item.time }}
              </p>
            </div>
            <el-icon
              class="text-[#b0c4d8] transition-transform duration-250"
              :class="{ 'rotate-180': item.open }"
            >
              <ArrowDown />
            </el-icon>
          </div>

          <!-- Body -->
          <div
            v-if="item.open"
            class="border-t sm:border-t-2 border-[#eef3f9] px-2 sm:px-4 py-2 sm:py-4 flex flex-col gap-1.5 sm:gap-3"
          >
            <div>
              <p class="text-xs sm:text-sm text-[#7a96b0] mb-1">Ma'nosi</p>
              <p class="text-xs sm:text-sm text-[#2a4a64] leading-relaxed">
                {{ item.meaning }}
              </p>
            </div>

            <!-- Actions -->
            <div v-if="!item.status" class="flex gap-2.5">
              <button
                class="flex-1 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-normal sm:font-medium bg-[#d4edda] text-[#1a7a4a] hover:opacity-80 transition-opacity"
                @click="decide(item, 'approved')"
              >
                ✓ Tasdiqlash
              </button>
              <button
                class="flex-1 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-normal sm:font-medium bg-[#fde8e6] text-[#b03a2e] hover:opacity-80 transition-opacity"
                @click="decide(item, 'rejected')"
              >
                ✕ Rad etish
              </button>
            </div>

            <!-- Result -->
            <div
              v-else
              class="py-1.5 sm:py-2 px-2.5 sm:px-3 rounded-lg text-xs sm:text-sm font-medium flex items-center gap-2"
              :class="
                item.status === 'approved'
                  ? 'bg-[#d4edda] text-[#1a7a4a]'
                  : 'bg-[#fde8e6] text-[#b03a2e]'
              "
            >
              {{
                item.status === "approved" ? "✓ Tasdiqlandi" : "✕ Rad etildi"
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
import { computed, reactive } from "vue";

const suggestions = reactive([
  {
    id: 1,
    word: "Lokomotiv",
    meaning: "Poyezdni tortuvchi, o'z motoriga ega bo'lgan harakat birligi",
    submittedBy: "user_482",
    time: "2 soat oldin",
    open: false,
    status: "",
  },
  {
    id: 2,
    word: "Shpallar",
    meaning:
      "Relslarni ushlab turuvchi ko'ndalang yog'och yoki beton qo'yimlar",
    submittedBy: "user_119",
    time: "5 soat oldin",
    open: false,
    status: "",
  },
  {
    id: 3,
    word: "Semafor",
    meaning:
      "Temir yo'lda harakatni boshqarish uchun ishlatiladigan signal qurilmasi",
    submittedBy: "user_007",
    time: "1 kun oldin",
    open: false,
    status: "",
  },
  {
    id: 4,
    word: "Semafor",
    meaning:
      "Temir yo'lda harakatni boshqarish uchun ishlatiladigan signal qurilmasi",
    submittedBy: "user_007",
    time: "1 kun oldin",
    open: false,
    status: "",
  },
  {
    id: 5,
    word: "Semafor",
    meaning:
      "Temir yo'lda harakatni boshqarish uchun ishlatiladigan signal qurilmasi",
    submittedBy: "user_007",
    time: "1 kun oldin",
    open: false,
    status: "",
  },
  {
    id: 6,
    word: "Semafor",
    meaning:
      "Temir yo'lda harakatni boshqarish uchun ishlatiladigan signal qurilmasi",
    submittedBy: "user_007",
    time: "1 kun oldin",
    open: false,
    status: "",
  },
]);

const pending = computed(() => suggestions.filter((s) => !s.status));

const stats = computed(() => [
  {
    label: "Kutilayotgan",
    value: pending.value.length,
    color: "text-[#c8920a]",
  },
  {
    label: "Tasdiqlangan",
    value: suggestions.filter((s) => s.status === "approved").length,
    color: "text-[#1a7a4a]",
  },
  {
    label: "Rad etilgan",
    value: suggestions.filter((s) => s.status === "rejected").length,
    color: "text-[#b03a2e]",
  },
]);

function decide(item: any, status: string) {
  item.status = status;
  // call your API here
}
</script>

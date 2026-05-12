<template>
  <div class="w-full transition-all duration-500">
    <!-- ── Hero strip — full viewport width background ───────────── -->
    <div class="w-full bg-[#f2f4f6]">
      <div
        class="max-w-[780px] mx-auto px-6 sm:px-8 py-8 sm:py-10 flex flex-col items-start gap-2 sm:gap-4"
      >
        <!-- Back button -->
        <!-- <button
          @click="goBack"
          class="flex items-center gap-1.5 text-xs sm:text-sm transition-colors duration-150 mb-6"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          {{ $t("goBack") ?? "Orqaga qaytish" }}
        </button> -->

        <UiBackButton @click="clearCategory" />

        <!-- Category pill -->
        <div
          class="bg-white w-full rounded-xl border border-[#dde4ea] p-5 sm:p-6"
        >
          <div
            v-if="selectedWord.category"
            class="inline-flex items-center gap-1.5 bg-[#e6f1fb] border border-white/15 text-xs px-3 py-1 rounded-full mb-3"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path
                d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"
              />
            </svg>
            {{ categoryLabels[selectedWord.category] ?? selectedWord.category }}
          </div>

          <!-- Word title -->
          <h1 class="text-2xl sm:text-3xl font-medium font-serif mb-2">
            {{ selectedWord.word }}
          </h1>

          <!-- Pronunciation + type -->
          <p class="text-xs sm:text-sm font-serif">
            {{ selectedWord.pronunciation }}
            <span v-if="selectedWord.pronunciation && selectedWord.type">
              ·
            </span>
            {{ selectedWord.type }}
          </p>
        </div>
      </div>
    </div>

    <!-- ── Body ──────────────────────────────────────────────────── -->
    <div class="w-full bg-[#f2f4f6]">
      <div
        class="max-w-[780px] mx-auto px-6 sm:px-8 py-6 sm:py-8 flex flex-col gap-3"
      >
        <!-- Uzbek card (always visible, primary) -->
        <div
          v-if="uzTranslation"
          class="bg-white rounded-xl border border-[#dde4ea] p-5 sm:p-6"
        >
          <div class="flex items-center gap-2 mb-3">
            <span
              class="w-2 h-2 rounded-full bg-[#1b7a3b] flex-shrink-0"
            ></span>
            <span
              class="text-xs font-medium text-[#1b7a3b] uppercase tracking-wide"
              >O'zbek</span
            >
          </div>

          <p
            class="text-xl sm:text-2xl font-medium font-serif text-[#0d2d4a] mb-2"
          >
            {{ uzTranslation.word }}
          </p>
          <p class="text-sm text-[#4a6272] leading-relaxed">
            {{ uzTranslation.description }}
          </p>

          <div class="flex justify-end mt-4 pt-3 border-t border-[#eef1f4]">
            <button
              @click="copy(uzTranslation.word, 'uz')"
              class="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all duration-150"
              :class="
                copied === 'uz'
                  ? 'bg-[#eaf3de] text-[#3b6d11]'
                  : 'bg-[#e6f1fb] text-[#185fa5] hover:bg-[#d0e8f7]'
              "
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <template v-if="copied === 'uz'">
                  <polyline points="20 6 9 17 4 12" />
                </template>
                <template v-else>
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path
                    d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                  />
                </template>
              </svg>
              {{
                copied === "uz"
                  ? ($t("copied") ?? "Nusxalandi!")
                  : ($t("copy") ?? "Nusxalash")
              }}
            </button>
          </div>
        </div>

        <!-- Toggle: other languages -->
        <button
          @click="showOthers = !showOthers"
          class="w-full flex items-center justify-center gap-2 py-3 bg-white border border-[#dde4ea] rounded-xl text-sm text-[#4a6272] hover:bg-[#f0f5fa] transition-colors duration-150"
        >
          {{ $t("otherLanguages") ?? "Boshqa tillarda ko'rish" }}
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="transition-transform duration-200"
            :style="showOthers ? 'transform:rotate(180deg)' : ''"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <!-- Other language cards -->
        <Transition name="langs">
          <div v-if="showOthers" class="flex flex-col gap-3">
            <div
              v-for="item in otherTranslations"
              :key="item.lang"
              class="bg-white rounded-xl border border-[#dde4ea] p-4 sm:p-5"
            >
              <div class="flex items-center justify-between mb-3">
                <span
                  class="text-xs font-medium px-2.5 py-1 rounded-full"
                  :style="{
                    background: langStyle[item.lang]?.bg,
                    color: langStyle[item.lang]?.text,
                  }"
                >
                  {{ item.language }}
                </span>
                <button
                  @click="copy(item.word, item.lang)"
                  class="inline-flex items-center gap-1.5 text-xs border border-[#dde4ea] px-2.5 py-1 rounded-md transition-all duration-150"
                  :class="
                    copied === item.lang
                      ? 'bg-[#eaf3de] text-[#3b6d11] border-[#c0dd97]'
                      : 'text-[#8a97a3] hover:bg-[#f7fafb]'
                  "
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    aria-hidden="true"
                  >
                    <template v-if="copied === item.lang">
                      <polyline points="20 6 9 17 4 12" />
                    </template>
                    <template v-else>
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path
                        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                      />
                    </template>
                  </svg>
                  {{
                    copied === item.lang
                      ? ($t("copied") ?? "Copied!")
                      : ($t("copy") ?? "Copy")
                  }}
                </button>
              </div>

              <p
                class="text-lg sm:text-xl font-medium font-serif text-[#0d2d4a] mb-1.5"
              >
                {{ item.word }}
              </p>
              <p class="text-sm text-[#4a6272] leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const { selectedWord, clearCategory } = useSearch();

const showOthers = ref(false);
const copied = ref<string | null>(null);

const categoryLabels: Record<string, string> = {
  "rolling-stock": "Rolling Stock",
  infrastructure: "Infrastructure",
  signalling: "Signalling & Safety",
  operations: "Operations",
  maintenance: "Maintenance",
  administration: "Administration",
};

const langMap: Record<string, { language: string }> = {
  uz: { language: "O'zbek" },
  kk: { language: "Қазақша" },
  en: { language: "English" },
  ru: { language: "Русский" },
};

const langStyle: Record<string, { bg: string; text: string }> = {
  kk: { bg: "#faeeda", text: "#854f0b" },
  en: { bg: "#e6f1fb", text: "#185fa5" },
  ru: { bg: "#fcebeb", text: "#a32d2d" },
};

const translations = computed(
  () =>
    selectedWord.value?.translations.map((item: any) => ({
      ...item,
      ...langMap[item.lang],
    })) ?? [],
);

const uzTranslation = computed(
  () => translations.value.find((t: any) => t.lang === "uz") ?? null,
);

const otherTranslations = computed(() =>
  translations.value.filter((t: any) => t.lang !== "uz"),
);

const copy = async (text: string, lang: string) => {
  try {
    await navigator.clipboard.writeText(text);
    copied.value = lang;
    setTimeout(() => {
      copied.value = null;
    }, 2000);
  } catch {
    // clipboard unavailable in non-https dev environments
  }
};
</script>

<style scoped>
.langs-enter-active,
.langs-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.langs-enter-from,
.langs-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

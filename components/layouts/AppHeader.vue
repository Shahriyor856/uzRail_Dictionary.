<template>
  <nav
    class="bg-[#0f3361] sticky top-0 z-[100] shadow-[0_1px_8px_rgba(0,0,0,0.2)]"
  >
    <div
      class="flex items-center justify-between px-4 sm:px-6 h-[54px] max-w-[1200px] mx-auto"
    >
      <!-- Brand -->
      <NuxtLink to="/" class="flex items-center gap-2 no-underline shrink-0">
        <div
          class="w-[30px] h-[30px] bg-[#c8920a] rounded-[5px] flex items-center justify-center"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="1" y="3" width="15" height="13" rx="1" />
            <path d="M16 8h4l3 5v3h-7V8z" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
        </div>

        <div class="leading-tight">
          <div class="text-white text-[13px] font-medium">
            Temir yo‘l lug‘ati
          </div>
          <div class="text-white/40 text-[11px]">
            O'zbekiston Temir Yo'llari
          </div>
        </div>
      </NuxtLink>

      <!-- Desktop nav -->
      <div class="hidden md:flex h-[54px]">
        <NuxtLink
          to="/translator"
          class="h-full px-[18px] flex items-center gap-[6px] text-[13px] text-white no-underline border-b-2 border-transparent transition-all duration-500 hover:text-white"
          active-class=" border-b-[#c8920a] bg-white/5"
        >
          <el-icon><Search /></el-icon>
          Tarjimon
        </NuxtLink>

        <NuxtLink
          to="/librarySection"
          class="h-full px-[18px] flex items-center gap-[6px] text-[13px] text-white no-underline border-b-2 border-transparent transition-all duration-500 hover:text-white"
          active-class=" border-b-[#c8920a] bg-white/5"
        >
          <el-icon><Reading /></el-icon>
          Kutubxona
        </NuxtLink>
      </div>

      <button
        class="md:hidden p-2 text-[#4D4D52]"
        @click="menuOpen = !menuOpen"
        aria-label="Toggle menu"
      >
        <!-- X icon when open, hamburger when closed -->
        <svg
          v-if="menuOpen"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <svg
          v-else
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <transition name="slide">
      <div
        v-if="menuOpen"
        class="flex flex-col bg-[#0a2548] py-2 border-t border-white/10"
      >
        <NuxtLink
          to="/translator"
          class="flex items-center gap-2 px-6 py-3 text-[14px] text-white/70 no-underline hover:bg-white/5 hover:text-white"
          active-class="text-[#c8920a]"
          @click="menuOpen = false"
        >
          <el-icon><Search /></el-icon>
          Tarjimon
        </NuxtLink>

        <NuxtLink
          to="/librarySection"
          class="flex items-center gap-2 px-6 py-3 text-[14px] text-white/70 no-underline hover:bg-white/5 hover:text-white"
          active-class="text-[#c8920a]"
          @click="menuOpen = false"
        >
          <el-icon><Reading /></el-icon>
          Kutubxona
        </NuxtLink>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { Search, Reading, Expand, Close } from "@element-plus/icons-vue";
const menuOpen = ref(false);
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition:
    max-height 0.2s ease,
    opacity 0.2s;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 200px;
  opacity: 1;
}
</style>

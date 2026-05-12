<template>
  <nav
    class="bg-[#012a4a] sticky top-0 z-[100] shadow-[0_1px_8px_rgba(0,0,0,0.2)] transition-all duration-500"
  >
    <div
      class="flex items-center justify-between px-4 sm:px-6 h-[54px] sm:h-[64px] max-w-[1200px] mx-auto"
    >
      <!-- Brand -->
      <NuxtLink to="/" class="flex items-center gap-2 no-underline shrink-0">
        <div class="flex items-center justify-center">
          <img
            :src="logo"
            alt="image"
            class="object-contain max-w-8 sm:max-w-10 w-ful h-full rounded-lg"
          />
        </div>

        <div class="leading-tight hidden sm:block">
          <div class="text-white text-sm sm:text-base md:text-lg font-medium">
            {{ $t("railTranslator") }}
          </div>
          <div class="text-white/40 text-xs sm:text-sm">
            {{ $t("uzRail") }}
          </div>
        </div>
      </NuxtLink>

      <!-- Desktop nav -->
      <div class="flex items-center gap-4 sm:gap-6 md:gap-8">
        <div class="hidden md:flex h-[54px] sm:h-[64px]">
          <NuxtLink
            v-for="(link, index) in navlinks"
            :key="index"
            :to="link.to"
            class="h-full px-[18px] flex items-center gap-[6px] text-[13px] text-white no-underline border-b-2 border-transparent transition-all duration-500 hover:text-white"
            active-class=" border-b-[#c8920a] bg-white/5"
          >
            <el-icon><component :is="link.icon" /></el-icon>
            {{ $t(link.label) }}
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
        <!-- <button v-if="!isAuthenticated" @click="goToLogin">
          <p class="text-gray-400 text-sm sm:text-base">Login</p>
        </button>
        <button v-else @click="logout">
          <p class="text-gray-400 text-sm sm:text-base">Logout</p>
        </button> -->

        <button
          class="text-gray-400 text-sm sm:text-base"
          @click="isAuthenticated ? logout() : goToLogin()"
        >
          {{ isAuthenticated ? "Logout" : "Login" }}
        </button>

        <div class="relative inline-block" ref="wrapper">
          <!-- Full button on md+ screens -->
          <button
            @click="toggle"
            class="hidden md:flex items-center gap-2 bg-black/10 border border-gray-400 rounded-xl px-2 py-2 text-sm font-medium text-gray-200 hover:bg-black/20 transition"
          >
            <img
              :src="current.flag"
              :alt="current.label"
              class="w-5 h-5 rounded-full object-cover"
            />
            <span>{{ current.label }}</span>
            <svg
              class="w-4 h-4 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': open }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <!-- Icon-only button on small screens -->
          <button
            @click="toggle"
            class="flex md:hidden items-center justify-center bg-black/10 border border-gray-400 rounded-xl w-10 h-10 text-lg hover:bg-black/10 transition"
          >
            <img
              :src="current.flag"
              :alt="current.label"
              class="w-5 h-5 rounded-full object-cover"
            />
          </button>

          <!-- Dropdown -->
          <div
            v-if="open"
            class="absolute right-0 mt-2 w-32 sm:w-36 md:w-44 bg-black/50 border border-gray-400 rounded-xl overflow-hidden z-50 shadow-lg"
          >
            <div
              v-for="lang in languages"
              :key="lang.code"
              @click="pick(lang)"
              class="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 text-sm cursor-pointer hover:bg-black/10 transition"
              :class="
                current.code === lang.code
                  ? 'bg-black/25 text-gray-100 font-medium'
                  : 'text-gray-200'
              "
            >
              <img
                :src="lang.flag"
                :alt="lang.label"
                class="w-3 sm:w-5 h-3 sm:h-5 rounded-full object-cover"
              />
              <span>{{ lang.label }}</span>
              <span class="ml-auto text-xs text-gray-300 hidden sm:block">{{
                lang.code.toUpperCase()
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition name="slide">
      <div
        v-if="menuOpen"
        class="flex flex-col bg-[#0a2548] border-t border-white/10"
      >
        <NuxtLink
          v-for="(link, index) in navlinks"
          :key="index"
          :to="link.to"
          class="flex items-center gap-2 px-4 py-3 text-sm text-white/70 no-underline hover:bg-white/5 hover:text-white"
          active-class="text-[#c8920a]"
          @click="menuOpen = false"
        >
          <el-icon><component :is="link.icon" /></el-icon>
          {{ $t(link.label) }}
        </NuxtLink>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import logo from "@/assests/images/emptyState/logo.png";
import { Search, Menu, Opportunity, User } from "@element-plus/icons-vue";
import uz from "@/assests/images/flags/uz.png";
import kz from "@/assests/images/flags/kz.png";
import ru from "@/assests/images/flags/ru.webp";
import eng from "@/assests/images/flags/britan.png";

const { isAuthenticated, logout } = useAuth();
const goToLogin = () => {
  navigateTo("/login");
};

type LocaleCode = "uz" | "oz" | "kz" | "ru" | "en";

interface Language {
  code: LocaleCode;
  flag: string;
  label: string;
}

const { locale, setLocale } = useI18n();
const localeCookie = useCookie<LocaleCode>("i18n_locale", {
  default: () => "uz" as LocaleCode,
  maxAge: 60 * 60 * 24 * 365,
});

const menuOpen = ref<boolean>(false);
const open = ref<boolean>(false);
const wrapper = ref<HTMLElement | null>(null);

const languages: Language[] = [
  { code: "uz", flag: uz, label: "O'zbekcha" },
  { code: "oz", flag: uz, label: "Ўзбекча" },
  { code: "kz", flag: kz, label: "Қазақша" },
  { code: "ru", flag: ru, label: "Русский" },
  { code: "en", flag: eng, label: "English" },
];

const current = computed<Language>(() => {
  const code = (locale.value ?? "uz") as LocaleCode;
  return languages.find((l) => l.code === code) ?? languages[0];
});

const navlinks = [
  { to: "/translator", icon: Search, label: "translator" },
  { to: "/librarySection", icon: Menu, label: "categories" },
  // { to: "/suggestions", icon: Opportunity, label: "Takliflar" },
  ...(isAuthenticated.value
    ? []
    : [{ to: "/suggestions", icon: Opportunity, label: "Takliflar" }]),
  ...(isAuthenticated.value
    ? [{ to: "/admin", icon: User, label: "Admin" }]
    : []),
];

function toggle(): void {
  open.value = !open.value;
}

function pick(lang: Language): void {
  localeCookie.value = lang.code;
  setLocale(lang.code);
  open.value = false;
}

function handleClickOutside(e: MouseEvent): void {
  if (wrapper.value && !wrapper.value.contains(e.target as Node)) {
    open.value = false;
  }
}

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
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

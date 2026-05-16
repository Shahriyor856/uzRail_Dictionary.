<template>
  <footer class="bg-[#012a4a]">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-6 px-4 sm:px-6 py-8 max-w-[1200px] mx-auto"
    >
      <!-- About -->
      <div>
        <div
          class="flex justify-between border-b border-white/10 mb-0 pb-0 sm:mb-3 sm:pb-2 transition-all duration-500"
        >
          <h4 class="text-white text-[12px] font-medium">Asoschilar</h4>
          <button
            class="md:hidden text-lg text-white font-semibold"
            @click="menuOpen = !menuOpen"
          >
            {{ menuOpen ? "-" : "+" }}
          </button>
        </div>
        <div class="hidden md:flex">
          <p class="text-[12px] text-white/50 leading-7">
            {{ $t("creators") }}
          </p>
        </div>
        <transition>
          <div v-if="menuOpen">
            <p class="text-[12px] text-white/50 leading-7">
              {{ $t("creators") }}
            </p>
          </div>
        </transition>
      </div>

      <!-- Navigation -->
      <div>
        <div
          class="flex justify-between border-b border-white/10 mb-0 pb-0 sm:mb-3 sm:pb-2 transition-all duration-500"
        >
          <h4 class="text-white text-[12px] font-medium">Sahifalar</h4>
          <button
            class="md:hidden text-lg text-white font-semibold"
            @click="menuOpenTwo = !menuOpenTwo"
          >
            {{ menuOpenTwo ? "-" : "+" }}
          </button>
        </div>

        <div class="hidden md:flex">
          <ul class="space-y-1">
            <li v-for="link in navLinks" :key="link.label">
              <NuxtLink
                :to="link.to"
                class="text-[12px] text-white/50 no-underline hover:text-white/80 transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <transition>
          <div v-if="menuOpenTwo">
            <ul class="space-y-1">
              <li v-for="link in navLinks" :key="link.label">
                <NuxtLink
                  :to="link.to"
                  class="text-[12px] text-white/50 no-underline hover:text-white/80 transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </transition>
      </div>

      <!-- Categories -->
      <div>
        <div
          class="flex justify-between border-b border-white/10 mb-0 pb-0 sm:mb-3 sm:pb-2 transition-all duration-500"
        >
          <h4 class="text-white text-[12px] font-medium">Kategoriyalar</h4>
          <button
            class="md:hidden text-lg text-white font-semibold"
            @click="menuOpenThree = !menuOpenThree"
          >
            {{ menuOpenThree ? "-" : "+" }}
          </button>
        </div>

        <div class="hidden md:flex">
          <ul class="space-y-1">
            <li
              v-for="cat in categories"
              :key="cat"
              class="text-[12px] text-white/50 hover:text-white/80 transition-colors cursor-pointer"
            >
              {{ cat }}
            </li>
          </ul>
        </div>
        <transition>
          <div v-if="menuOpenThree">
            <ul class="space-y-1">
              <li
                v-for="cat in categories"
                :key="cat"
                class="text-[12px] text-white/50 hover:text-white/80 transition-colors cursor-pointer"
              >
                {{ cat }}
              </li>
            </ul>
          </div></transition
        >
      </div>

      <!-- Contact -->
      <div>
        <div
          class="flex justify-between border-b border-white/10 mb-0 pb-0 sm:mb-3 sm:pb-2 transition-all duration-500"
        >
          <h4 class="text-white text-[12px] font-medium">Contact</h4>
          <button
            class="md:hidden text-lg text-white font-semibold"
            @click="menuOpenFour = !menuOpenFour"
          >
            {{ menuOpenFour ? "-" : "+" }}
          </button>
        </div>

        <div class="hidden md:block">
          <div
            v-for="item in contacts"
            :key="item.text"
            class="flex gap-2 mb-2"
          >
            <span class="text-[#c8920a] text-[10px] mt-[3px] flex-shrink-0">
              ◆
            </span>

            <span
              class="text-[12px] text-white/50 leading-6"
              v-html="item.text"
            />
          </div>
        </div>
        <transition>
          <div v-if="menuOpenFour">
            <div
              v-for="item in contacts"
              :key="item.text"
              class="flex gap-2 mb-2"
            >
              <span class="text-[#c8920a] text-[10px] mt-[3px] flex-shrink-0">
                ◆
              </span>

              <span
                class="text-[12px] text-white/50 leading-6"
                v-html="item.text"
              />
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Bottom bar -->
    <div
      class="border-t border-white/10 px-4 sm:px-6 py-3 max-w-[1200px] mx-auto flex flex-col items-center gap-2 text-[11px] text-white/30"
    >
      <span>© 2026 DasUty</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n();

const navLinks = computed(() => [
  { label: t("translator"), to: "/translator" },
  { label: t("categories"), to: "/library-section" },
]);

const categories = [
  "Rolling Stock ",
  "Infrastructure",
  "Signalling & Safety",
  "Operations",
  "Maintenance",
  "Administration",
];

const contacts = [
  { text: "Example loaction" },
  {
    text: " Example phone number: 99 789 77 77",
  },
  { text: "DasUty@.gamil.com" },
  { text: "www.uzRail_Dictionary" },
];

const menuOpen = ref(false);
const menuOpenTwo = ref(false);
const menuOpenThree = ref(false);
const menuOpenFour = ref(false);
</script>

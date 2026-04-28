<template>
  <footer class="bg-[#012a4a]">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-6 px-4 sm:px-6 py-8 max-w-[1200px] mx-auto"
    >
      <!-- About -->
      <div>
        <h4
          class="text-white text-[12px] font-medium mb-3 pb-2 border-b border-white/10"
        >
          O'zbekiston Temir Yo'llari
        </h4>
        <p class="text-[12px] text-white/50 leading-7">
          Rasmiy ko‘p tilli temir yo‘l terminologiyasi lug‘ati xizmat ko‘rsatish
          muhandislari, operatorlari va o‘qituvchilari butun Markaziy Osiyo
          bo‘ylab.
        </p>
      </div>

      <!-- Navigation -->
      <div>
        <h4
          class="text-white text-[12px] font-medium mb-3 pb-2 border-b border-white/10"
        >
          Navigation
        </h4>
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

      <!-- Categories -->
      <div>
        <h4
          class="text-white text-[12px] font-medium mb-3 pb-2 border-b border-white/10"
        >
          Categories
        </h4>
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

      <!-- Contact -->
      <div>
        <h4
          class="text-white text-[12px] font-medium mb-3 pb-2 border-b border-white/10"
        >
          Contact
        </h4>

        <div v-for="item in contacts" :key="item.text" class="flex gap-2 mb-2">
          <span class="text-[#c8920a] text-[10px] mt-[3px] flex-shrink-0">
            ◆
          </span>

          <span
            class="text-[12px] text-white/50 leading-6"
            v-html="item.text"
          />
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div
      class="border-t border-white/10 px-4 sm:px-6 py-3 max-w-[1200px] mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-[11px] text-white/30"
    >
      <span>© 2026 DasUty</span>

      <div class="flex gap-4">
        <a
          v-for="link in legalLinks"
          :key="link"
          class="text-white/30 hover:text-white/60 cursor-pointer transition-colors"
        >
          {{ link }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const navLinks = [
  { label: "Translator", to: "/translator" },
  { label: "Term Library", to: "/librarySection" },
];

const categories = ["Example ", "Example ", "Example ", "Example ", "Example "];

const contacts = [
  { text: "Example loaction" },
  {
    text: " Example phone number: 99 789 77 77",
  },
  { text: "DasUty@.gamil.com" },
  { text: "www.uzRail_Dictionary" },
];

const legalLinks = ["Example ", "Example ", "Example "];
</script>

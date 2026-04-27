<template>
  <div
    class="flex flex-col  items-center justify-center gap-6 py-16 px-4 bg-white"
  >
    <img :src="image" alt="train" class="w-40 sm:w-80 opacity-90" />

    <div class="flex flex-col items-center gap-2 text-center">
      <h2 class="text-base sm:text-xl font-serif text-gray-700">
        Temir yo'l atamalarini qidiring
      </h2>
      <p class="text-xs sm:text-sm text-gray-400">
        Ingliz, O'zbek, Rus yoki Qozog'cha ma'nolarini bilib olasz
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import image from "@/assests/images/5bfdbbc1-f71a-43a7-a43b-55d62f5a3f25.png";
</script>

<template>
  <div class="bg-[#013a63]">
    <div
      class="max-w-[1200px] mx-auto flex flex-col items-center py-4 sm:py-6 md:py-8 gap-4 sm:gap-6 md:gap-8 transition-all duration-500"
    >
      <h1
        class="text-white/90 font-medium sm:font-semibold text-sm sm:text-lg md:text-xl group"
      >
        <span class="md:hidden"> Bilgan sozlaringizni ulashing </span>
        <span class="hidden md:inline"
          >Temir yo'l sohasiga oid bilgan atama va terminlaringizni biz bilan
          ulashing</span
        >

        <span class="text-yellow-400">
          <el-icon><Opportunity /></el-icon>
        </span>
        <div
          class="w-full sm:w-[25%] group-hover:w-full h-[1px] sm:h-[2px] md:h-[3px] bg-yellow-400 rounded mt-2 transition-all duration-700"
        />
      </h1>

      <p class="text-gray-400 font-normal sm:font-medium text-xs sm:text-sm">
        <span class="md:hidden"> Tasdiqlansa — lug'atga qo'shiladi! </span>
        <span class="hidden md:inline">
          Siz taklif qilgan atama UzRail Dictionary mutaxassislari tomonidan
          tasdiqlanganidan so'ng, u lug'at ro'yxatiga qo'shiladi. Bundan mamnun
          bo'lamiz!
        </span>
      </p>
    </div>
  </div>

  <ModulesSuggesForm />
</template>

<script setup lang="ts">
import { Opportunity } from "@element-plus/icons-vue";
</script>

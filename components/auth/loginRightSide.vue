<!-- page.vue -->
<template>
  <div class="flex items-center justify-center px-0 md:px-4">
    <div class="flex items-center gap-16 w-full max-w-4xl">
      <!-- Left branding side -->
      <div class="flex-1 hidden md:flex flex-col gap-8">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <img
            :src="logo"
            alt="image"
            class="object-contain max-w-8 sm:max-w-10 w-ful h-full rounded-lg"
          />
          <div>
            <p class="text-white font-semibold text-sm">
              {{ $t("brand_name") }}
            </p>
            <p class="text-slate-400 text-xs">{{ $t("brand_sub") }}</p>
          </div>
        </div>

        <!-- Headline -->
        <div>
          <h1 class="text-white font-bold text-5xl leading-tight">
            {{ $t("headline_1") }}<br />
            <span class="text-yellow-400">{{ $t("headline_2") }}</span
            ><br />
            {{ $t("headline_3") }}
          </h1> 
          <p class="text-slate-400 text-sm mt-4 leading-relaxed max-w-xs">
            {{ $t("brand_desc") }}
          </p>
        </div>
      </div>

      <!-- Divider -->
      <div class="hidden md:block w-px h-80 bg-white/10" />
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assests/images/logo.png";
</script>

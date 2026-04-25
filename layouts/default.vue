<script setup lang="ts">
import AppHeader from "@/components/layouts/AppHeader.vue";
import AppFooter from "@/components/layouts/AppFooter.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#f5f7fa]">
    <AppHeader />

    <main class="flex-1">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

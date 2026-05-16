<!-- layouts/default.vue -->
<script setup lang="ts">
import AppHeader from "@/components/layouts/AppHeader.vue";
import AppFooter from "@/components/layouts/AppFooter.vue";
import AdminSidebar from "@/components/layouts/AdminSidebar.vue";

const { isAdmin } = useAuth();
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />

    <div class="flex flex-1">
      <!-- Admin sidebar: only shown for admin users -->
      <AdminSidebar v-if="isAdmin" />

      <!-- Main content -->
      <main
        class="flex-1 transition-all duration-300"
        :class="isAdmin ? 'ml-0' : ''"
      >
        <slot />
      </main>
    </div>

    <!-- Hide footer on admin pages -->
    <AppFooter v-if="!isAdmin" />
  </div>
</template>

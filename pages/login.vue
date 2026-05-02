<template>
  <div
    class="flex min-h-screen items-center justify-center bg-[#0d2137]"
    style="
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
      background-size: 60px 60px;
    "
  >
    <!-- <div class="w-full max-w-2xl">
      <AuthLoginForm />
    </div> -->

    <AuthLoginRightSide />

    <div class="w-full max-w-md px-6 md:px-0">
      <AuthLoginForm />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>

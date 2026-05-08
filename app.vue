<template>
  <div class="bg-[#f0f4f8]">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { locale, setLocale } = useI18n();
const localeCookie = useCookie("i18n_locale");

watchEffect(() => {
  if (localeCookie.value && localeCookie.value !== locale.value) {
    setLocale(localeCookie.value);
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
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

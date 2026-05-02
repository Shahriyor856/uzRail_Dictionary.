<template>
  <form
    @submit.prevent="handleLogin"
    class="w-full flex flex-col py-8 sm:py-10 px-6 sm:px-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur gap-4 sm:gap-6"
  >
    <!-- Header -->
    <div class="flex justify-between">
      <div class="flex flex-col items-start group">
        <h1 class="text-white font-semibold sm:font-bold text-lg sm:text-2xl">
          {{ $t("welcome") }}
        </h1>
        <p class="text-slate-400 text-xs sm:text-sm mt-1">
          {{ $t("signin_sub") }}
        </p>
        <div
          class="w-[30%] group-hover:w-full h-[2px] sm:h-[3px] bg-yellow-400 rounded mt-3 transition-all duration-500"
        />
      </div>
      <UiLanguageDropDown @change="switchLang" />
    </div>

    <!-- Inputs -->
    <div class="flex flex-col gap-3 sm:gap-4">
      <UiLoginInput
        :label="t('userName')"
        type="text"
        :placeholder="t('userName') + '.....'"
        v-model="username"
        :autocomplete="username"
      />
      <UiLoginInput
        :label="t('password')"
        type="password"
        :placeholder="t('password') + '.....'"
        v-model="password"
        :autocomplete="password"
      />
    </div>

    <!-- Error message -->
    <p v-if="error" class="text-red-400 text-sm -mt-2">{{ error }} :)</p>

    <!-- Button -->
    <button
      type="submit"
      :disabled="loading"
      class="w-full py-2 sm:py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-xs sm:text-sm md:text-base text-white font-semibold rounded-xl transition-all"
    >
      {{ t("signin") + " " + (loading ? "...." : "→") }}
    </button>

    <!-- Forgot -->
    <p class="text-center text-xs sm:text-sm">
      <a href="#" class="text-yellow-400 hover:underline">{{ $t("forgot") }}</a>
    </p>

    <!-- Footer -->
    <p
      class="text-center text-white/20 text-xs border-t border-white/5 pt-2 sm:pt-4"
    >
      © 2026 DasUty · uzRail_Dictionary
    </p>
  </form>
</template>

<script setup lang="ts">
const username = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const { login } = useAuth();

const handleLogin = async () => {
  error.value = "";
  loading.value = true;
  try {
    await login(username.value, password.value);
  } catch (e) {
    error.value = t("error");
  } finally {
    loading.value = false;
  }
};

const { t, setLocale } = useI18n({ useScope: "global" });
const localCookie = useCookie<string>("i18n_locale");

const switchLang = (code: string) => {
  localCookie.value = code;
  setLocale(code as any);
};
</script>

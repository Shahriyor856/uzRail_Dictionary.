<!-- pages/admin/createUser.vue -->
<script setup lang="ts">
import UiEmptyState from "~/components/ui/UiEmptyState.vue";

definePageMeta({ middleware: "auth" });

const { authHeader } = useAuth();

// ── Form state ────────────────────────────────────────────
const form = reactive({
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  isActive: true,
  // Role is locked to ADMIN on this page — no need to make it dynamic
  role: "ADMIN" as const,
});

const loading = ref(false);
const success = ref(false);
const error = ref("");
// Stores the name of the just-created admin to show in the success message
const createdFullName = ref("");

// ── Submit ────────────────────────────────────────────────
async function handleSubmit() {
  error.value = "";
  success.value = false;

  // Client-side validation
  if (
    !form.fullName ||
    !form.username ||
    !form.password ||
    !form.confirmPassword
  ) {
    error.value = "Barcha majburiy maydonlarni to'ldiring";
    return;
  }
  if (form.password.length < 6) {
    error.value = "Parol kamida 6 ta belgidan iborat bo'lishi kerak";
    return;
  }
  if (form.password !== form.confirmPassword) {
    error.value = "Parol va parolni tasdiqlash mos kelmadi";
    return;
  }

  loading.value = true;
  try {
    await $fetch("/api/users", {
      method: "POST",
      headers: authHeader.value,
      body: {
        fullName: form.fullName,
        username: form.username,
        password: form.password,
        role: form.role,
        isActive: form.isActive,
      },
    });

    success.value = true;
    createdFullName.value = form.fullName; // capture before resetForm() clears it
    resetForm();
    setTimeout(() => {
      success.value = false;
      createdFullName.value = "";
    }, 4000);
  } catch (e: any) {
    error.value = e?.data?.message || "Admin yaratib bo'lmadi";
  } finally {
    loading.value = false;
  }
}

function resetForm() {
  form.fullName = "";
  form.username = "";
  form.password = "";
  form.confirmPassword = "";
  form.isActive = true;
  error.value = "";
  success.value = false;
}
</script>

<template>
  <div class="p-6 max-w-xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Admin qo'shish</h1>
      <p class="text-gray-500 text-sm mt-1">Yangi administrator yarating</p>
    </div>

    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <!-- Success banner -->
      <div
        v-if="success"
        class="mb-5 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3"
      >
        <svg
          class="w-5 h-5 text-green-500 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <p class="text-sm text-green-700 font-medium">
          "{{ createdFullName }}" admini yaratildi!
        </p>
      </div>

      <!-- Error banner -->
      <div
        v-if="error"
        class="mb-5 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3"
      >
        <svg
          class="w-5 h-5 text-red-500 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="text-sm text-red-600">{{ error }}</p>
      </div>

      <!-- Fields -->
      <div class="space-y-5">
        <UiBaseInput
          v-model="form.fullName"
          label="To'liq ism *"
          placeholder="Masalan: John Doe"
        />

        <UiBaseInput
          v-model="form.username"
          label="Foydalanuvchi nomi *"
          placeholder="Masalan: johndoe"
          autocomplete="off"
        />

        <UiBaseInput
          v-model="form.password"
          type="password"
          label="Parol *"
          placeholder="Kamida 6 ta belgi"
          autocomplete="new-password"
        />

        <UiBaseInput
          v-model="form.confirmPassword"
          type="password"
          label="Parolni tasdiqlash *"
          placeholder="Parolni qayta kiriting"
          autocomplete="new-password"
        />

        <!-- Role display (read-only, always ADMIN on this page) -->
        <div>
          <label class="block text-xs font-semibold text-gray-600 mb-1.5"
            >Rol</label
          >
          <div
            class="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50"
          >
            <span class="w-2 h-2 rounded-full bg-[#c8920a]"></span>
            <span class="text-sm text-gray-700 font-medium">ADMIN</span>
            <span class="ml-auto text-[10px] text-gray-400"
              >O'zgartirib bo'lmaydi</span
            >
          </div>
        </div>

        <!-- isActive toggle -->
        <div
          class="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50"
        >
          <div>
            <p class="text-sm font-medium text-gray-700">Faol holat</p>
            <p class="text-xs text-gray-400">Admin darhol tizimga kira oladi</p>
          </div>
          <button
            type="button"
            @click="form.isActive = !form.isActive"
            class="relative w-11 h-6 rounded-full transition-colors duration-200"
            :class="form.isActive ? 'bg-[#012a4a]' : 'bg-gray-300'"
            :aria-label="form.isActive ? 'Nofaol qilish' : 'Faol qilish'"
          >
            <span
              class="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
              :class="form.isActive ? 'translate-x-5' : 'translate-x-0'"
            />
          </button>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 mt-6">
        <button
          @click="resetForm"
          class="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
        >
          Tozalash
        </button>
        <button
          @click="handleSubmit"
          :disabled="loading"
          class="flex-1 py-2.5 rounded-xl bg-[#012a4a] text-white text-sm font-medium hover:bg-[#012a4a]/90 transition disabled:opacity-60 flex items-center justify-center gap-2"
        >
          <svg
            v-if="loading"
            class="w-4 h-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          {{ loading ? "Yaratilmoqda..." : "Admin yaratish" }}
        </button>
      </div>
    </div>
  </div>
</template>

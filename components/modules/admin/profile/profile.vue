<!-- pages/admin/profile.vue -->
<script setup lang="ts">
definePageMeta({ middleware: "auth" });

const {
  userName,
  userFullName,
  userRole,
  updateProfile,
  changePassword,
  fetchMe,
} = useAuth();

// ── Avatar (local preview only — no upload API yet) ───────
const avatarPreview = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

function triggerFileInput() {
  fileInput.value?.click();
}

function onFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  avatarPreview.value = URL.createObjectURL(file);
  // TODO: upload file to server when API is available
}

// ── Profile form ──────────────────────────────────────────
const profileForm = reactive({ fullName: userFullName.value || "" });
const profileLoading = ref(false);
const profileSuccess = ref(false);
const profileError = ref("");

async function saveProfile() {
  profileLoading.value = true;
  profileError.value = "";
  profileSuccess.value = false;
  try {
    await updateProfile(profileForm.fullName);
    profileSuccess.value = true;
    setTimeout(() => (profileSuccess.value = false), 3000);
  } catch (e: any) {
    profileError.value = e?.data?.message || "Xatolik yuz berdi";
  } finally {
    profileLoading.value = false;
  }
}

// ── Password form ─────────────────────────────────────────
const passwordForm = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
const passwordLoading = ref(false);
const passwordSuccess = ref(false);
const passwordError = ref("");

async function savePassword() {
  passwordError.value = "";
  passwordSuccess.value = false;

  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordError.value = "Yangi parollar mos kelmadi";
    return;
  }
  if (passwordForm.newPassword.length < 6) {
    passwordError.value = "Parol kamida 6 ta belgidan iborat bo'lishi kerak";
    return;
  }

  passwordLoading.value = true;
  try {
    await changePassword(
      passwordForm.currentPassword,
      passwordForm.newPassword,
    );
    passwordSuccess.value = true;
    passwordForm.currentPassword = "";
    passwordForm.newPassword = "";
    passwordForm.confirmPassword = "";
    setTimeout(() => (passwordSuccess.value = false), 3000);
  } catch (e: any) {
    passwordError.value = e?.data?.message || "Parolni o'zgartirib bo'lmadi";
  } finally {
    passwordLoading.value = false;
  }
}

// Fetch fresh user data when the page loads
onMounted(() => fetchMe());
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto">
    <!-- Page title -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Profil sozlamalari</h1>
      <p class="text-gray-500 text-sm mt-1">Ma'lumotlaringizni yangilang</p>
    </div>

    <!-- Avatar card -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
      <h2
        class="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide"
      >
        Avatar
      </h2>
      <div class="flex items-center gap-5">
        <!-- Avatar preview -->
        <div
          class="w-20 h-20 rounded-2xl bg-[#c8920a]/15 border-2 border-[#c8920a]/30 flex items-center justify-center overflow-hidden"
        >
          <img
            v-if="avatarPreview"
            :src="avatarPreview"
            alt="avatar"
            class="w-full h-full object-cover"
          />
          <svg
            v-else
            class="w-9 h-9 text-[#c8920a]/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        <div>
          <p class="text-sm font-semibold text-gray-800">
            {{ userFullName || userName }}
          </p>
          <p class="text-xs text-gray-400 mb-3">
            {{ userRole === "ADMIN" ? "Super Admin" : userRole }}
          </p>
          <button
            @click="triggerFileInput"
            class="text-xs px-4 py-2 rounded-xl border border-[#012a4a]/20 text-[#012a4a] hover:bg-[#012a4a]/5 transition font-medium"
          >
            Rasm yuklash
          </button>
          <p class="text-[10px] text-gray-400 mt-1">
            Faqat mahalliy ko'rinish (backend API keyinroq)
          </p>
          <!-- Hidden file input, triggered by the button above -->
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="onFileChange"
          />
        </div>
      </div>
    </div>

    <!-- Profile info form -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
      <h2
        class="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide"
      >
        Asosiy ma'lumotlar
      </h2>

      <div class="space-y-4">
        <!-- Username is read-only -->
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1.5"
            >Foydalanuvchi nomi</label
          >
          <div
            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500 select-all"
          >
            {{ userName }}
          </div>
          <p class="text-[10px] text-gray-400 mt-1">
            Username o'zgartirilmaydi
          </p>
        </div>

        <UiBaseInput
          v-model="profileForm.fullName"
          label="To'liq ism"
          placeholder="Masalan: John Doe"
        />
      </div>

      <!-- Feedback messages -->
      <div
        v-if="profileError"
        class="mt-3 text-xs text-red-500 bg-red-50 rounded-xl px-4 py-2.5"
      >
        {{ profileError }}
      </div>
      <div
        v-if="profileSuccess"
        class="mt-3 text-xs text-green-600 bg-green-50 rounded-xl px-4 py-2.5"
      >
        ✓ Muvaffaqiyatli saqlandi
      </div>

      <button
        @click="saveProfile"
        :disabled="profileLoading"
        class="mt-5 w-full py-2.5 rounded-xl bg-[#012a4a] text-white text-sm font-medium hover:bg-[#012a4a]/90 transition disabled:opacity-60"
      >
        {{ profileLoading ? "Saqlanmoqda..." : "Saqlash" }}
      </button>
    </div>

    <!-- Password form -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2
        class="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide"
      >
        Parolni o'zgartirish
      </h2>

      <div class="space-y-4">
        <UiBaseInput
          v-model="passwordForm.currentPassword"
          type="password"
          label="Joriy parol"
          placeholder="Joriy parolingiz"
        />
        <UiBaseInput
          v-model="passwordForm.newPassword"
          type="password"
          label="Yangi parol"
          placeholder="Kamida 6 ta belgi"
        />
        <UiBaseInput
          v-model="passwordForm.confirmPassword"
          type="password"
          label="Yangi parolni tasdiqlang"
          placeholder="Parolni qayta kiriting"
        />
      </div>

      <!-- Feedback messages -->
      <div
        v-if="passwordError"
        class="mt-3 text-xs text-red-500 bg-red-50 rounded-xl px-4 py-2.5"
      >
        {{ passwordError }}
      </div>
      <div
        v-if="passwordSuccess"
        class="mt-3 text-xs text-green-600 bg-green-50 rounded-xl px-4 py-2.5"
      >
        ✓ Parol muvaffaqiyatli o'zgartirildi
      </div>

      <button
        @click="savePassword"
        :disabled="passwordLoading"
        class="mt-5 w-full py-2.5 rounded-xl bg-[#012a4a] text-white text-sm font-medium hover:bg-[#012a4a]/90 transition disabled:opacity-60"
      >
        {{ passwordLoading ? "Saqlanmoqda..." : "Parolni o'zgartirish" }}
      </button>
    </div>
  </div>
</template>

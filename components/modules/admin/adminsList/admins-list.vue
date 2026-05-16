<!-- pages/admin/adminList.vue -->
<script setup lang="ts">
definePageMeta({ middleware: "auth" });

const { authHeader } = useAuth();

// ── Types ─────────────────────────────────────────────────
interface AdminUser {
  id:        string;
  fullName:  string;
  username:  string;
  role:      string;
  isActive:  boolean;
  createdAt: string;
}

// ── State ─────────────────────────────────────────────────
const users   = ref<AdminUser[]>([]);
const loading = ref(true);
const error   = ref("");

// ── Data fetching ─────────────────────────────────────────
async function fetchUsers() {
  loading.value = true;
  error.value   = "";
  try {
    users.value = await $fetch<AdminUser[]>("/api/users", {
      headers: authHeader.value,
    });
  } catch (e: any) {
    error.value = e?.data?.message || "Ma'lumotlarni yuklashda xatolik";
  } finally {
    loading.value = false;
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("uz-UZ", {
    year: "numeric", month: "short", day: "numeric",
  });
}

onMounted(() => fetchUsers());
</script>

<template>
  <div class="p-6">

    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Foydalanuvchilar ro'yxati</h1>
        <p class="text-gray-500 text-sm mt-1">Tizimdagi barcha foydalanuvchilar</p>
      </div>
      <button
        @click="fetchUsers"
        class="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition"
      >
        <svg
          class="w-4 h-4"
          :class="{ 'animate-spin': loading }"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        Yangilash
      </button>
    </div>

    <!-- Error state -->
    <div
      v-if="error"
      class="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 text-sm text-red-600 mb-6"
    >
      {{ error }}
    </div>

    <!-- Loading skeleton -->
    <div v-if="loading" class="space-y-3">
      <div v-for="i in 4" :key="i" class="h-16 bg-gray-100 rounded-2xl animate-pulse" />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="users.length === 0 && !error"
      class="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center"
    >
      <svg class="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
      <p class="text-gray-500 text-sm">Hech qanday foydalanuvchi topilmadi</p>
    </div>

    <!-- Users table -->
    <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      <!-- Summary row -->
      <div class="px-6 py-4 border-b border-gray-100 flex items-center gap-6">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#012a4a]"></span>
          <span class="text-sm text-gray-600">Jami: <strong>{{ users.length }}</strong></span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-green-400"></span>
          <span class="text-sm text-gray-600">Faol: <strong>{{ users.filter(u => u.isActive).length }}</strong></span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-gray-300"></span>
          <span class="text-sm text-gray-600">Nofaol: <strong>{{ users.filter(u => !u.isActive).length }}</strong></span>
        </div>
      </div>

      <!-- Table header -->
      <div class="grid grid-cols-[2fr_2fr_1fr_1fr_1fr] gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100">
        <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">To'liq ism</span>
        <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Username</span>
        <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Rol</span>
        <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Holat</span>
        <span class="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">Yaratilgan</span>
      </div>

      <!-- Table rows -->
      <div
        v-for="user in users"
        :key="user.id"
        class="grid grid-cols-[2fr_2fr_1fr_1fr_1fr] gap-4 px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition items-center"
      >
        <!-- Full name with avatar icon -->
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-xl bg-[#c8920a]/15 border border-[#c8920a]/20 flex items-center justify-center shrink-0">
            <svg class="w-4 h-4 text-[#c8920a]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <span class="text-sm font-medium text-gray-800 truncate">{{ user.fullName || '—' }}</span>
        </div>

        <!-- Username -->
        <span class="text-sm text-gray-600 font-mono truncate">{{ user.username }}</span>

        <!-- Role badge -->
        <span class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg bg-[#012a4a]/8 text-[#012a4a] w-fit">
          <span class="w-1.5 h-1.5 rounded-full bg-[#c8920a]"></span>
          {{ user.role }}
        </span>

        <!-- Active / Inactive badge -->
        <span
          class="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg w-fit"
          :class="user.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'"
        >
          <span class="w-1.5 h-1.5 rounded-full" :class="user.isActive ? 'bg-green-400' : 'bg-gray-400'"></span>
          {{ user.isActive ? 'Faol' : 'Nofaol' }}
        </span>

        <!-- Created date -->
        <span class="text-xs text-gray-400">{{ formatDate(user.createdAt) }}</span>
      </div>
    </div>

  </div>
</template>
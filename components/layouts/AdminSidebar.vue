<!-- components/layouts/AdminSidebar.vue -->
<template>
  <aside
    class="admin-sidebar fixed left-0 top-[54px] sm:top-[64px] h-[calc(100vh-54px)] sm:h-[calc(100vh-64px)] z-50 flex flex-col"
    :class="collapsed ? 'w-[64px]' : 'w-[220px]'"
  >
    <!-- Toggle button -->
    <button
      @click="collapsed = !collapsed"
      class="absolute -right-3 top-6 w-6 h-6 bg-[#012a4a] border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all duration-200 z-10"
      :title="collapsed ? 'Expand' : 'Collapse'"
    >
      <svg
        class="w-3 h-3 transition-transform duration-300"
        :class="collapsed ? 'rotate-0' : 'rotate-180'"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2.5"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>

    <!-- User card — clickable → goes to profile page -->
    <NuxtLink
      to="/admin/profile"
      class="flex items-center gap-3 px-3 py-4 border-b border-white/10 no-underline hover:bg-white/5 transition-all duration-200 cursor-pointer"
      :class="collapsed ? 'justify-center' : ''"
      :title="collapsed ? userFullName || 'Admin' : ''"
    >
      <!-- Avatar with person icon -->
      <div
        class="shrink-0 w-9 h-9 rounded-xl bg-[#c8920a]/20 border border-[#c8920a]/40 flex items-center justify-center text-[#c8920a]"
      >
        <el-icon size="16"><User /></el-icon>
      </div>

      <!-- Name & role -->
      <Transition name="fade-slide">
        <div v-if="!collapsed" class="overflow-hidden">
          <p class="text-white text-xs font-semibold leading-tight truncate">
            {{ userFullName }}
          </p>
          <p class="text-white/40 text-[10px] leading-tight truncate">
            {{ userRole }}
          </p>
        </div>
      </Transition>
    </NuxtLink>

    <!-- Nav links -->
    <nav class="flex-1 flex flex-col gap-1 px-2 py-3 overflow-y-auto">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="sidebar-link flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-white/60 hover:text-white hover:bg-white/8 transition-all duration-200 no-underline group"
        :class="[
          collapsed ? 'justify-center' : '',
          activePath === link.to ? 'bg-white/10 text-white' : '',
        ]"
        active-class="!bg-white/10 !text-white"
        :title="collapsed ? link.label : ''"
      >
        <span class="shrink-0 text-base">
          <el-icon><component :is="link.icon" /></el-icon>
        </span>
        <Transition name="fade-slide">
          <span
            v-if="!collapsed"
            class="text-xs font-medium truncate leading-tight"
          >
            {{ link.label }}
          </span>
        </Transition>
        <span
          v-if="collapsed && activePath === link.to"
          class="absolute left-[54px] w-1.5 h-1.5 rounded-full bg-[#c8920a]"
        />
      </NuxtLink>
    </nav>

    <!-- Logout -->
    <div class="px-2 pb-4 border-t border-white/10 pt-3">
      <button
        @click="handleLogout"
        class="flex items-center gap-3 w-full rounded-xl px-2.5 py-2.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        :class="collapsed ? 'justify-center' : ''"
        :title="collapsed ? 'Chiqish' : ''"
      >
        <span class="shrink-0 text-base">
          <el-icon><SwitchButton /></el-icon>
        </span>
        <Transition name="fade-slide">
          <span v-if="!collapsed" class="text-xs font-medium">Chiqish</span>
        </Transition>
      </button>
    </div>
  </aside>

  <!-- Spacer -->
  <div
    class="shrink-0 transition-all duration-300"
    :class="collapsed ? 'w-[64px]' : 'w-[220px]'"
  />
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import {
  Search,
  Opportunity,
  Plus,
  Collection,
  SwitchButton,
  User,
  UserFilled,
} from "@element-plus/icons-vue";

const collapsed = ref(false);
const route = useRoute();
const activePath = computed(() => route.path);

const { logout, userName, userRole, userFullName } = useAuth();

async function handleLogout() {
  await logout();
}

const navLinks = [
  { to: "/translator", icon: Search, label: "Tarjimon" },
  { to: "/admin/acceptSuggestion", icon: Opportunity, label: "Takliflar" },
  { to: "/admin/addWord", icon: Plus, label: "So'z qo'shish" },
  { to: "/admin/addCategory", icon: Collection, label: "Kategoriya qo'shish" },
  { to: "/admin/createAdmin", icon: User, label: "Admin qo'shish" },
  {
    to: "/admin/adminsList",
    icon: UserFilled,
    label: "Foydalanuvchilar ro'yxati",
  },
];
</script>

<style scoped>
.admin-sidebar {
  background: #012a4a;
  border-right: 1px solid rgba(255, 255, 255, 0.08);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.sidebar-link {
  position: relative;
}
.hover\:bg-white\/8:hover {
  background-color: rgba(255, 255, 255, 0.08);
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-6px);
}
.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>

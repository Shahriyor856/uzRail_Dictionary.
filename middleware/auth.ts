// middleware/auth.ts
// Protects routes based on authentication and role.
// Apply this middleware to pages via definePageMeta({ middleware: 'auth' })

export default defineNuxtRouteMiddleware((to) => {
  const accessToken = useCookie("auth_access_token");
  const userRole    = useCookie<"ADMIN" | "USER" | null>("auth_role");

  const isAuthenticated = !!accessToken.value;
  const isAdmin         = userRole.value === "ADMIN";

  // ── Not logged in ─────────────────────────────────────────────────
  if (!isAuthenticated) {
    // Allow access to login page only
    if (to.path === "/login") return;
    return navigateTo("/login");
  }

  // ── Logged in but trying to visit login page ───────────────────────
  if (to.path === "/login") {
    return navigateTo(isAdmin ? "/admin" : "/translator");
  }

  // ── Admin-only routes ─────────────────────────────────────────────
  // Any route starting with /admin is restricted to ADMIN role only
  if (to.path.startsWith("/admin") && !isAdmin) {
    // Regular users get redirected to their home page
    return navigateTo("/translator");
  }

  // ── User-only guard (optional) ────────────────────────────────────
  // If you ever want to prevent admins from accessing user pages, add here
  // For now, admins can view user pages too
});
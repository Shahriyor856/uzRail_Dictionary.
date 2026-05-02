export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("auth_login");

  if (!token.value && to.path !== "/login") {
    return navigateTo("/login");
  }
});

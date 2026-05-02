export const useAuth = () => {
  const token = useCookie("auth_token");

  const login = async (username: string, password: string) => {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: { username, password },
    });

    token.value = response.token;
    return navigateTo("/translator");
  };

  const logout = () => {
    token.value = null;
    navigateTo("/login");
  };

  const isAuthenticated = computed(() => !!token.value);

  return {
    login,
    logout,
    isAuthenticated,
  };
};

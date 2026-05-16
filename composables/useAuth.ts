// composables/useAuth.ts

export const useAuth = () => {
  const accessToken = useCookie("auth_access_token", { maxAge: 60 * 15 });
  const refreshToken = useCookie("auth_refresh_token", {
    maxAge: 60 * 60 * 24 * 7,
  });
  const userRole = useCookie<"ADMIN" | "USER" | null>("auth_role", {
    maxAge: 60 * 60 * 24 * 7,
  });
  const userName = useCookie("auth_username", { maxAge: 60 * 60 * 24 * 7 });
  const userFullName = useCookie("auth_fullname", { maxAge: 60 * 60 * 24 * 7 });
  const userId = useCookie("auth_user_id", { maxAge: 60 * 60 * 24 * 7 });

  const isAuthenticated = computed(() => !!accessToken.value);
  const isAdmin = computed(() => userRole.value === "ADMIN");
  const config = useRuntimeConfig();
  const apiBase = config.public?.apiBase || config.apiBase;

  const authHeader = computed(() => ({
    Authorization: `Bearer ${accessToken.value}`,
  }));

  // ─── Login ────────────────────────────────────────────────────────
  const login = async (username: string, password: string) => {
    if (!apiBase) {
      throw createError({
        statusCode: 500,
        statusMessage: "Backend API base URL is not configured",
      });
    }

    const response = await $fetch<{
      accessToken: string;
      refreshToken: string;
      user: {
        id: string;
        fullName: string;
        username: string;
        role: "ADMIN" | "USER";
      };
    }>(`${apiBase}/api/auth/login`, {
      method: "POST",
      body: { username, password },
    });

    accessToken.value = response.accessToken;
    refreshToken.value = response.refreshToken;
    userRole.value = response.user.role;
    userName.value = response.user.username;
    userFullName.value = response.user.fullName;
    userId.value = response.user.id;

    return navigateTo(
      response.user.role === "ADMIN" ? "/admin" : "/translator",
    );
  };

  // ─── Logout ───────────────────────────────────────────────────────
  const logout = async () => {
    if (!apiBase) {
      throw createError({
        statusCode: 500,
        statusMessage: "Backend API base URL is not configured",
      });
    }
    if (accessToken.value) {
      await $fetch(`${apiBase}/api/auth/logout`, {
        method: "POST",
        body: { accessToken: accessToken.value },
      }).catch(() => {});
    }
    accessToken.value = null;
    refreshToken.value = null;
    userRole.value = null;
    userName.value = null;
    userFullName.value = null;
    userId.value = null;

    return navigateTo("/login");
  };

  // ─── Refresh ──────────────────────────────────────────────────────
  const refresh = async (): Promise<boolean> => {
    if (!refreshToken.value) return false;
    try {
      const response = await $fetch<{
        accessToken: string;
        refreshToken: string;
      }>(`${apiBase}/api/auth/refresh`, {
        method: "POST",
        body: { refreshToken: refreshToken.value },
      });
      accessToken.value = response.accessToken;
      refreshToken.value = response.refreshToken;
      return true;
    } catch {
      await logout();
      return false;
    }
  };

  // ─── Fetch /me — call this on admin pages to get fresh data ───────
  const fetchMe = async () => {
    if (!accessToken.value) return;
    const me = await $fetch<{
      id: string;
      fullName: string;
      username: string;
      role: "ADMIN" | "USER";
    }>(`${apiBase}/api/users/me`, { headers: authHeader.value }).catch(
      () => null,
    );

    if (me) {
      userRole.value = me.role;
      userName.value = me.username;
      userFullName.value = me.fullName;
      userId.value = me.id;
    }
  };

  // ─── Update fullName ──────────────────────────────────────────────
  const updateProfile = async (fullName: string) => {
    const result = await $fetch<{ fullName: string; username: string }>(
      `${apiBase}/api/users/me`,
      {
        method: "PATCH",
        headers: authHeader.value,
        body: { fullName },
      },
    );
    userFullName.value = result.fullName;
    return result;
  };

  // ─── Change password ──────────────────────────────────────────────
  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    await $fetch(`${apiBase}/api/users/me/password`, {
      method: "PATCH",
      headers: authHeader.value,
      body: { currentPassword, newPassword },
    });
  };

  return {
    isAuthenticated,
    isAdmin,
    userRole,
    userName,
    userFullName,
    userId,
    accessToken,
    authHeader,
    login,
    logout,
    refresh,
    fetchMe,
    updateProfile,
    changePassword,
  };
};

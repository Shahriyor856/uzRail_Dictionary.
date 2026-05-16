// server/api/users/me.get.ts
// Fetches the currently logged-in admin's profile from the backend

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiBase = config.public?.apiBase || config.apiBase;

  // Read access token from Authorization header sent by the client
  const authorization = getHeader(event, "authorization");

  if (!authorization) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }

  if (!apiBase) {
    throw createError({ statusCode: 500, statusMessage: "Backend API base URL is not configured" });
  }

  const response = await $fetch<{
    id: string;
    fullName: string;
    username: string;
    role: "ADMIN" | "USER";
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }>(`${apiBase}/api/users/me`, {
    headers: { Authorization: authorization },
  }).catch((err) => {
    throw createError({
      statusCode: err?.response?.status || 401,
      statusMessage: "Failed to fetch profile",
    });
  });

  return response;
});
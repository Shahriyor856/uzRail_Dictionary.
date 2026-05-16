// server/api/auth/refresh.post.ts

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { refreshToken } = body;

  if (!refreshToken) {
    throw createError({ statusCode: 400, statusMessage: "Refresh token required" });
  }

  const config = useRuntimeConfig();
  const apiBase = config.public?.apiBase || config.apiBase;

  if (!apiBase) {
    throw createError({ statusCode: 500, statusMessage: "Backend API base URL is not configured" });
  }

  const response = await $fetch<{
    accessToken: string;
    refreshToken: string;
  }>(`${apiBase}/api/auth/refresh`, {
    method: "POST",
    body: { refreshToken },
  }).catch((err) => {
    throw createError({
      statusCode: err?.response?.status || 401,
      statusMessage: "Session expired. Please log in again.",
    });
  });

  return response;
});
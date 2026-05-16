// @ts-nocheck
// server/api/users/index.get.ts
// Gets all users (ADMIN only)

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiBase = config.apiBase || config.public?.apiBase;
  const authorization = getHeader(event, "authorization");

  if (!authorization) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  if (!apiBase) {
    throw createError({ statusCode: 500, statusMessage: "Backend API base URL is not configured" });
  }

  const response = await $fetch(`${apiBase}/api/users`, {
    headers: { Authorization: authorization },
  }).catch((err) => {
    throw createError({
      statusCode: err?.response?.status || 403,
      statusMessage: "Failed to fetch users",
    });
  });

  return response;
});
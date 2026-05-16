// @ts-nocheck
// server/api/users/index.post.ts
// Creates a new user (ADMIN only)

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiBase = config.apiBase || config.public?.apiBase;
  const authorization = getHeader(event, "authorization");
  const body = await readBody(event);

  if (!authorization) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  if (!apiBase) {
    throw createError({ statusCode: 500, statusMessage: "Backend API base URL is not configured" });
  }

  const response = await $fetch(`${apiBase}/api/users`, {
    method: "POST",
    headers: { Authorization: authorization },
    body,
  }).catch((err) => {
    throw createError({
      statusCode: err?.response?.status || 400,
      statusMessage: err?.data?.message || "Failed to create user",
    });
  });

  return response;
});
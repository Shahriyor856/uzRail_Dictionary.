// @ts-nocheck
// server/api/users/me.patch.ts
// Updates the currently logged-in admin's profile (fullName)

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiBase = config.public?.apiBase || config.apiBase;
  const authorization = getHeader(event, "authorization");
  const body = await readBody(event);

  if (!authorization) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  if (!apiBase) {
    throw createError({ statusCode: 500, statusMessage: "Backend API base URL is not configured" });
  }

  const response = await $fetch(`${apiBase}/api/users/me`, {
    method: "PATCH",
    headers: { Authorization: authorization },
    body,
  }).catch((err) => {
    throw createError({
      statusCode: err?.response?.status || 400,
      statusMessage: "Failed to update profile",
    });
  });

  return response;
});

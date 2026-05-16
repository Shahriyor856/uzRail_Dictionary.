// server/api/users/me/password.patch.ts
// Changes the currently logged-in admin's password

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const apiBase = config.public?.apiBase || config.apiBase;
  const authorization = getHeader(event, "authorization");
  const body = await readBody(event); // { currentPassword, newPassword }

  if (!authorization) {
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
  }
  if (!apiBase) {
    throw createError({ statusCode: 500, statusMessage: "Backend API base URL is not configured" });
  }

  await $fetch(`${apiBase}/api/users/me/password`, {
    method: "PATCH",
    headers: { Authorization: authorization },
    body,
  }).catch((err) => {
    throw createError({
      statusCode: err?.response?.status || 400,
      statusMessage: err?.data?.message || "Failed to change password",
    });
  });

  return { success: true };
});

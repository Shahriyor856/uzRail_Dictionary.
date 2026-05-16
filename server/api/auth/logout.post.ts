// server/api/auth/logout.post.ts
// Logout requires the access token in the Authorization header (🔒 secured endpoint)

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { accessToken } = body;

  const config = useRuntimeConfig();
  const apiBase = config.public?.apiBase || config.apiBase;

  if (!apiBase) {
    throw createError({ statusCode: 500, statusMessage: "Backend API base URL is not configured" });
  }

  await $fetch(`${apiBase}/api/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).catch(() => {
    // Even if backend logout fails, we clear cookies on client side
    // So we silently ignore errors here
  });

  // Return 204-style success
  return { success: true };
});

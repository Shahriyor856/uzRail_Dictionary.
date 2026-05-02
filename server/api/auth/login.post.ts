export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;

  if (username === "testUser" && password === "0000") {
    return {
      token: "sample-jwt-token",
    };
  }

  throw createError({
    statusCode: 401,
    statusMessage: "Invalid credentials",
  });
});

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // some endpoints might require headers
  });

  console.log(session, " Session Data");
  return session?.user || null;
};
//@ts-nocheck
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await $fetch(`${process.env.NUXT_API_URL}/api/isadora`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: {
      ...body,
    },
  })
    .then((res) => res)
    .catch((err) => err);
  return { ...res };
});

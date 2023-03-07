//@ts-nocheck
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // const res = await $fetch(`${process.env.NUXT_API_URL}/api/isadora`, {
  const res = await $fetch(`http://api:9988/api/isadora`, {
    method: "PATCH",
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

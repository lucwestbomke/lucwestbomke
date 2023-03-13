//@ts-nocheck
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // console.log(process.env);
  // const res = await $fetch(`${process.env.NUXT_API_URL}/api/isadora`, {
  const res = await $fetch(`http://api:9988/api/isadora`, {
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
  console.log(res);
  return { ...res };
});

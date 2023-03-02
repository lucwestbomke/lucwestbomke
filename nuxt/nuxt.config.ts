// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Luc Westbomke",
      meta: [{ hid: "description", name: "description", content: "luc westbomke" }],
      htmlAttrs: {
        lang: "en-US",
      },
      // link: [{ rel: "icon", type: "image/svg", href: "/favicon.svg" }],
    },
  },
  css: ["@/assets/styles/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/_variables.scss";',
        },
      },
    },
  },
});


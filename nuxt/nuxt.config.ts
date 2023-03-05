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
      link: [
        // { rel: "icon", type: "image/svg", href: "/favicon.svg" },
        // { rel: "preload", type: "font/ttf", href: "assets/styles/fonts/comfortaa-variable.ttf", as: "font" },
      ],
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.SITE_URL || "https://lucwestbomke.dev",
    },
  },
  modules: ["@nuxtjs/robots", "nuxt-simple-sitemap"],
  robots: {},
  sitemap: {
    hostname: process.env.SITE_URL || "https://lucwestbomke.dev",
    defaults: {
      // @ts-ignore
      changefreq: "daily",
      priority: 1,
      lastmod: new Date().toISOString(),
    },
  },
  nuxtIcon: {
    size: "24px",
    class: "icon",
    aliases: {
      nuxt: "logos:nuxt-icon",
    },
  },
  css: ["@/assets/styles/main.scss"],
  vite: {
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/_variables.scss";',
        },
      },
    },
  },
  nitro: {
    // logLevel: 1,
    compressPublicAssets: {
      gzip: true,
      brotli: true,
    },
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
});

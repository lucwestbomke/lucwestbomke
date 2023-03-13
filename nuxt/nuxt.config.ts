// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Luc Westbomke",
      meta: [
        { hid: "description", name: "description", content: "luc westbomke" },
        { name: "keywords", content: "luc westbomke, artificial intelligence, developer, personal website" },
        { name: "author", content: "Luc Westbomke" },
        { name: "robots", content: "index, follow" },
        { property: "og:url", content: "https://lucwestbomke.dev" },
        { property: "og:type", content: "website" },
        { property: "og:site:name", content: "Luc Westbomke" },
        { property: "og:title", content: "Luc Westbomke" },
        { property: "og:description", content: "" },
        { property: "og:image", content: "" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:creator", content: "@LucWestbomke" },
        { name: "twitter:site", content: "@LucWestbomke" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "black" },
        { name: "apple-mobile-web-app-title", content: "Luc Westbomke" },
        { name: "theme-color", content: "#101013" },
        { name: "color-scheme", content: "dark" },
      ],
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
    apiUrl: "http://api:9988",
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
  routeRules: {
    "/legal": { sitemap: { priority: 0.1 } },
    "/privacy": { sitemap: { priority: 0.1 } },
    "/sitemap": { sitemap: { priority: 0.1 } },
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

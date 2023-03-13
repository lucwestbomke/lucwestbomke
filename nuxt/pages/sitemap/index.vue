<template>
  <main id="SitemapPage">
    <h1>Sitemap</h1>
    <ul>
      <li>
        <NuxtLink to="/" rel="canonical"><h2>Langing Page</h2></NuxtLink>
      </li>
      <li>
        <h2>Melissa</h2>
      </li>
      <li>
        <h2>Isadora</h2>
      </li>
      <li>
        <NuxtLink to="/legal" rel="canonical"><h2>Legal</h2></NuxtLink>
      </li>
      <li>
        <NuxtLink to="/privacy" rel="canonical"><h2>Privacy Policy</h2></NuxtLink>
      </li>
      <li>
        <NuxtLink to="/sitemap" rel="canonical"><h2>Sitemap</h2></NuxtLink>
      </li>
    </ul>
  </main>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
#SitemapPage {
  h1 {
    margin: 50px 0px 100px;
    text-align: center;
  }
  h2 {
    line-height: 30px;
  }
  li {
    list-style-type: disclosure-closed;
    margin-bottom: 30px;
    margin-left: 20px;
  }
}
</style>

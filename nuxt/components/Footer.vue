<template>
  <footer id="FooterComponent" aria-label="footer navigation">
    <p>&#169; {{ new Date().getUTCFullYear() }} Luc Westbomke</p>
      <ul>
        <li>
          <NuxtLink to="/legal">Legal</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/privacy">Privacy</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/sitemap">Sitemap</NuxtLink>
        </li>
      </ul>
  </footer>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
#FooterComponent {
  align-items: center;
  background-color: $black;
  // outline: 2px solid $white;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-left: -20px;
  padding: 20px;
  width: calc(100% + 40px);
  ul {
    align-items: center;
    gap: 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
@media (min-width: 768px) {
  #FooterComponent {
    justify-content: flex-start;
    margin-left: -60px;
    padding: 20px 60px;
    width: calc(100% + 120px);
  }
}
@media (min-width: 1024px) {
  #FooterComponent {
    margin-left: -80px;
    padding: 20px 80px;
    width: calc(100% + 160px);
  }
}
</style>

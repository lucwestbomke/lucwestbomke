<template>
  <div id="DefaultLayout">
    <Header />
    <slot />
    <div id="FooterComponent">sadfasf</div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
#DefaultLayout {
  display: flex;
  flex-flow: column;
  overflow: hidden;
  min-height: 100vh;
  // height: 100%;
  padding: 0 20px;
  #HeaderComponent {
    flex: 0 1 auto;
  }
  // [id$="Page"] {
  //   flex: 1 1 auto;
  // }
  #FooterComponent {
    flex: 0 1 40px;
    color: $white;
  }
}
@media (min-width: 768px) {
  #DefaultLayout {
    padding: 0 60px;
  }
}
@media (min-width: 1024px) {
  #DefaultLayout {
    padding: 0 80px;
  }
}
</style>

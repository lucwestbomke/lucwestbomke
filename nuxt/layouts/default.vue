<template>
  <div id="DefaultLayout">
    <Header />
    <slot />
  </div>
</template>
<script setup lang="ts">
// import Header from "@/components/Header.vue";
</script>
<style scoped lang="scss">
#DefaultLayout {
  padding: 0 20px;
  overflow: hidden;
}
</style>

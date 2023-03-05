<template>
  <div id="IsadoraPage"></div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.cards {
  display: grid;
  gap: 4px;
  grid-template-areas:
    "nav nav nav nav"
    "main main main main"
    "title title slide_left slide_right";
  grid-template-columns: 2fr 2fr 1fr 1fr;
  grid-template-rows: 150px auto 250px;
  height: 100vh;
  width: 100vw;

  .card {
    background-color: $black-lighten;
    border-radius: $border-radius;
    position: relative;
    &:hover::before {
      opacity: 1;
    }

    &::before,
    .card-border {
      border-radius: inherit;
      content: "";
      height: 100%;
      left: 0px;
      opacity: 0;
      position: absolute;
      top: 0px;
      transition: opacity 300ms;
      width: 100%;
    }
    &::before {
      background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), #24243680, transparent 40%);
      // z-index: 3;
    }
    .card-border {
      background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), #72728b, transparent 60%);
      z-index: 1;
    }
    .card-content {
      background-color: $black-lighten;
      border: 1px solid #242436;
      border-radius: inherit;
      height: calc(100% - 2px);
      margin: 1px;
      position: relative;
      width: calc(100% - 2px);
      z-index: 2;
    }
  }
  &:hover .card .card-border {
    opacity: 1;
  }
}
</style>

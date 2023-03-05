<template>
  <div id="ProjectTilesComponent">
    <span class="cards" @mousemove="moveRadialHover">
      <div class="card">
        <div class="card-border"></div>
        <div class="card-content">1</div>
      </div>
      <div class="card">
        <div class="card-border"></div>
        <div class="card-content">2</div>
      </div>
      <div class="card">
        <div class="card-border"></div>
        <div class="card-content">3</div>
      </div>
      <div class="card">
        <div class="card-border"></div>
        <div class="card-content">4</div>
      </div>
      <!-- <div class="card">
        <div class="card-border"></div>
        <div class="card-content">5</div>
      </div>
      <div class="card">
        <div class="card-border"></div>
        <div class="card-content">6</div>
      </div> -->
    </span>
  </div>
</template>
<script setup lang="ts">
function moveRadialHover(e: MouseEvent) {
  for (const el of document.getElementsByClassName("card")) {
    const card = el as HTMLDivElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
}
</script>
<style scoped lang="scss">
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  max-width: 616px;
  .card {
    background-color: $black-lighten;
    border-radius: $border-radius;
    cursor: pointer;
    height: 260px;
    position: relative;
    width: 300px;

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
      z-index: 3;
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

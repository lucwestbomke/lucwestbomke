<template>
  <header id="HeaderComponent">
    <h1>Luc Westbomke</h1>
    <nav :class="{ active: nav_active }">
      <img id="menu_background" src="@/assets/images/menu_slide_radial.svg" aria-hidden="true" alt="menu_background" />
      <div class="bg_darken"></div>
      <div id="nav_menu_btn" @click="nav_active = !nav_active">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul>
        <li>Home</li>
        <li>Isadora</li>
        <li>Melissa</li>
        <li>Taylor</li>
        <li>Projects</li>
        <li>About</li>
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
const nav_active = ref(false);
</script>
<style scoped lang="scss">
#HeaderComponent {
  height: 100px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 28px;
    z-index: 4;
  }
  nav {
    // position: relative;
    overflow: hidden;
    #nav_menu_btn {
      cursor: pointer;
      height: 33px;
      position: relative;
      transform: rotate(0deg);
      transition: 0.5s ease-in-out;
      width: 40px;
      z-index: 4;
      span {
        background-color: $white;
        border-radius: 9px;
        display: block;
        height: 5px;
        left: 0;
        opacity: 1;
        position: absolute;
        transform: rotate(0deg);
        transition: 0.25s ease-in-out;
        transform-origin: left center;
        width: 100%;
        &:nth-child(1) {
          top: 0px;
        }
        &:nth-child(2) {
          top: 12px;
        }
        &:nth-child(3) {
          top: 24px;
        }
      }
    }
    #menu_background {
      height: 0;
      position: fixed;
      top: 0;
      right: 0;
      // right: -400px;
      // transform: scale(2);
      transition: all 500ms;
      // top: -400px;
      overflow: hidden;
      // background: rgba(0 0 0 / 0.5);
      z-index: 4;
    }
    .bg_darken {
      background-color: transparent;
      height: 100vh;
      left: 0;
      position: fixed;
      top: 0;
      transition: all 300ms;
      width: 100vw;
      z-index: 0;
    }
    ul {
      transition: all 300ms;
      display: flex;
      flex-direction: column;
      margin-top: -80px;
      position: fixed;
      right: -160px;
      row-gap: 52px;
      text-align: center;
      transform: rotate(20deg);
      // margin-top: 80px;
      // right: 40px;
      z-index: 4;
      li {
        font-size: 24px;
      }
    }
    &.active {
      #nav_menu_btn {
        span {
          &:nth-child(1) {
            transform: rotate(45deg);
            top: 0px;
            left: 8px;
          }
          &:nth-child(2) {
            width: 0%;
            opacity: 0;
          }
          &:nth-child(3) {
            transform: rotate(-45deg);
            top: 29px;
            left: 8px;
          }
        }
      }
      #menu_background {
        height: 100vh;
        // right: -00px;
        // top: -00px;
        // background: rgba(0 0 0 / 0.2);
        transform: scale(1.5);
      }
      .bg_darken {
        background-color: rgba(0 0 0 / 0.9);
        z-index: 3;
      }
      ul {
        margin-top: 80px;
        right: 40px;
        transform: rotate(0deg);
        position: absolute;
      }
    }
  }
}
@media (min-width: 425px) {
  #HeaderComponent {
    h1 {
      font-size: 32px;
    }
  }
}
</style>

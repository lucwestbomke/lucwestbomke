<template>
  <header id="HeaderComponent">
    <h1>Luc Westbomke</h1>
    <nav :class="{ open: nav_open }">
      <div id="nav_menu_btn" @click="nav_open = !nav_open">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul>
        <li>About Me</li>
        <li>Projects</li>
        <li>Contact</li>
        <li>Github</li>
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
const nav_open = ref(false);
</script>
<style scoped lang="scss">
#HeaderComponent {
  align-items: center;
  background-image: linear-gradient(to bottom, transparent 50%, $storm 50%);
  background-size: 100% 200%;
  display: flex;
  justify-content: space-between;
  margin-left: -20px;
  padding: 20px;
  transition: all 300ms;
  width: calc(100% + 40px);
  nav {
    #nav_menu_btn {
      cursor: pointer;
      height: 33px;
      position: relative;
      transform: rotate(0deg);
      transition: 0.5s ease-in-out;
      width: 40px;
      span {
        background-color: $black;
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
    ul {
      display: flex;
      flex-direction: column;
      right: -600px;
      row-gap: 52px;
      position: fixed;
      top: 160px;
      text-align: center;
      transition: all 300ms;
      width: 100%;
      li {
        font-size: 24px;
      }
    }
    &.open {
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
      ul {
        right: 0;
        position: fixed;
      }
    }
  }
  &:has(nav.open) {
    align-items: start;
    background-position: 0% -100%;
    height: 100vh;
  }
}

@media (min-width: 1024px) {
  #HeaderComponent {
    nav {
      #nav_menu_btn {
        display: none;
      }
      ul {
        flex-direction: row;
        position: static;
        column-gap: 24px;
      }
    }
  }
}
</style>

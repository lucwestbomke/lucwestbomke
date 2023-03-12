<template>
  <header id="HeaderComponent" ref="header">
    <h1>Luc Westbomke</h1>
    <nav :class="{ open: nav_open }">
      <div id="nav_menu_btn" @click="toggleNav">
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
const header = ref();
function toggleNav() {
  if (nav_open.value) {
    header.value.classList.remove("animate-open");
    header.value.classList.add("animate-close");
    // setTimeout(() => {
    //   header.value.classList.remove("animate-close");
    // }, 500);
  } else {
    header.value.classList.remove("animate-close");
    header.value.classList.add("animate-open");
    // setTimeout(() => {
    //   header.value.classList.remove("animate-open");
    // }, 500);
  }
  nav_open.value = !nav_open.value;
}
</script>
<style scoped lang="scss">
#HeaderComponent {
  align-items: flex-start;
  background-image: linear-gradient(to right, transparent 50%, $storm 50%);
  background-size: 200% 100%;
  display: flex;
  justify-content: space-between;
  margin-left: -20px;
  margin-bottom: 40px;
  padding: 20px;
  transition: all 300ms;
  width: calc(100% + 40px);
  h1 {
    font-size: 28px;
    position: relative;
  }
  nav {
    #nav_menu_btn {
      cursor: pointer;
      height: 26px;
      position: relative;
      transform: rotate(0deg);
      transition: 0.5s ease-in-out;
      width: 26px;
      span {
        background-color: $white;
        border-radius: 9px;
        display: block;
        height: 2px;
        left: 0;
        opacity: 1;
        position: absolute;
        transform: rotate(0deg);
        transition: 0.25s ease-in-out;
        transform-origin: left center;
        width: 100%;
        &:nth-child(1) {
          top: 5px;
        }
        &:nth-child(2) {
          top: 12px;
        }
        &:nth-child(3) {
          top: 19px;
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
      transition: all 500ms;
      width: 100%;
      li {
        font-size: 24px;
      }
    }
    &.open {
      #nav_menu_btn {
        width: 36px;
        span {
          &:nth-child(1) {
            transform: rotate(45deg);
            top: 0px;
            left: 0px;
          }
          &:nth-child(2) {
            width: 0%;
            opacity: 0;
          }
          &:nth-child(3) {
            transform: rotate(-45deg);
            top: 26px;
            left: 0px;
          }
        }
      }
      ul {
        right: 0;
        position: fixed;
      }
    }
  }
  // &:has(nav.open) {
  // }
  &.animate-close {
    animation-name: nav-close;
    animation-duration: 500ms;
    background-position: 0% 0%;
  }
  &.animate-open {
    animation-name: nav-open;
    animation-duration: 500ms;
    background-position: 100% 0%;
    height: 100vh;
    align-items: start;
  }
}

@media (min-width: 768px) {
  #HeaderComponent {
    margin-left: -60px;
    padding: 20px 60px;
    width: calc(100% + 120px);
  }
}
@media (min-width: 1024px) {
  #HeaderComponent {
    margin-bottom: 0px;
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
@keyframes nav-close {
  from {
    background-position: 100% 0%;
    height: 100vh;
    margin-bottom: 40px;
  }
  99% {
    height: 100vh;
  }
  to {
    background-position: 0% 0%;
    height: auto;
    margin-bottom: -86vh;
  }
}
@keyframes nav-open {
  from {
    height: auto;
    background-position: 0% 0%;
  }
  1% {
    height: 100vh;
    margin-bottom: -85vh;
  }
  to {
    background-position: 100% 0%;
    height: 100vh;
    margin-bottom: 40px;
  }
}
</style>

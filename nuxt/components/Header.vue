<template>
  <header id="HeaderComponent">
    <div class="name_wrapper">
      <h1>Luc Westbomke</h1>
    </div>
    <nav class="nav_wrapper">
      <div id="nav_menu" :class="{ open: nav_open }">
        <div id="nav_menu_btn" @click="nav_open = !nav_open">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="nav_burger_links">
          <ul>
            <li>Home</li>
            <li>Isadora</li>
            <li>RNN GAN</li>
            <li>CNN GAN</li>
            <li>About Me</li>
          </ul>
        </div>
      </div>
      <div id="nav_menu_bg" :class="{ open: nav_open }"></div>
      <div id="nav_links_wrapper">
        <ul>
          <li>Projects</li>
          <li>About Me</li>
        </ul>
      </div>
    </nav>
  </header>
</template>
<script setup lang="ts">
const nav_open = ref(false);
</script>
<style scoped lang="scss">
#HeaderComponent {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .name_wrapper {
    text-align: center;
    color: $white;
    z-index: 2;
  }
  .nav_wrapper {
    #nav_menu {
      display: flex;
      flex-direction: column;
      #nav_menu_btn {
        z-index: 2;
        width: 40px;
        height: 33px;
        position: relative;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: 0.5s ease-in-out;
        -moz-transition: 0.5s ease-in-out;
        -o-transition: 0.5s ease-in-out;
        transition: 0.5s ease-in-out;
        cursor: pointer;
        span {
          background-color: $white;
          display: block;
          position: absolute;
          height: 5px;
          width: 100%;
          border-radius: 9px;
          opacity: 1;
          left: 0;
          -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          transform: rotate(0deg);
          -webkit-transition: 0.25s ease-in-out;
          -moz-transition: 0.25s ease-in-out;
          -o-transition: 0.25s ease-in-out;
          transition: 0.25s ease-in-out;
          -webkit-transform-origin: left center;
          -moz-transform-origin: left center;
          -o-transform-origin: left center;
          transform-origin: left center;
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
      &.open {
        #nav_menu_btn {
          position: relative;
          span {
            &:nth-child(1) {
              -webkit-transform: rotate(45deg);
              -moz-transform: rotate(45deg);
              -o-transform: rotate(45deg);
              transform: rotate(45deg);
              top: 0px;
              left: 3px;
            }
            &:nth-child(2) {
              width: 0%;
              opacity: 0;
            }
            &:nth-child(3) {
              -webkit-transform: rotate(-45deg);
              -moz-transform: rotate(-45deg);
              -o-transform: rotate(-45deg);
              transform: rotate(-45deg);
              top: 29px;
              left: 3px;
            }
          }
        }
        .nav_burger_links {
          padding-right: 20px;
          position: fixed;
          top: 120px;
          width: 200px;
          right: 0;
          text-align: center;
          ul {
            display: flex;
            flex-direction: column;
            row-gap: 36px;
            li {
              color: $white;
              font-size: 22px;
              transition: 0.5s ease-in-out;
            }
          }
        }
      }
      .nav_burger_links {
        z-index: 2;
        ul {
          display: none;
        }
      }
    }
    #nav_menu_bg {
      z-index: 1;
      width: 0;
      height: 0;
      background: radial-gradient(circle, $primary, $primary-lighten);
      border-radius: 50%;
      transition: 0.3s ease;
      position: fixed;
      top: -100px;
      right: -100px;
      overflow: hidden;
      &.open {
        top: -100px;
        right: 60px;
        width: 650px;
        height: 720px;
        transform: translate(70%, -10%);
      }
    }
    #nav_links_wrapper {
      ul {
        display: none;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  #HeaderComponent {
    justify-content: space-around;
    .nav_wrapper {
      #nav_menu {
        display: none;
      }
      #nav_links_wrapper {
        ul {
          display: flex;
          column-gap: 72px;
          align-items: center;
          height: 100%;
          margin-top: 3px;
          li {
            color: $white;
            font-size: 28px;
          }
        }
      }
    }
  }
}
</style>

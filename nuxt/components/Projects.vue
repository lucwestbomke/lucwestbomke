<template>
  <div id="ProjectsComponent">
    <div class="project" v-for="(project, index) in projectsData" :class="{ active: index === currentIndex }">
      <h2>{{ project.title }}</h2>
      <h3>{{ project.intro }}</h3>
    </div>
  </div>
</template>
<script setup lang="ts">
const data = useProjectData();
const projectsData = ref(data.value);
const currentIndex = useCurrentIndex();
currentIndex.value = projectsData.value.length - 1;
</script>
<style scoped lang="scss">
#ProjectsComponent {
  width: 100%;
  .project {
    display: flex;
    flex-direction: column;
    opacity: 0;
    position: absolute;
    transition: opacity 0ms;
    h2 {
      display: inline-block;
      font-family: "PlusJakarta", Arial, Helvetica, sans-serif;
      font-size: 18px;
      font-variation-settings: "wght" 700;
      text-transform: uppercase;
    }
    h3 {
      cursor: pointer;
      display: inline-block;
      font-size: 48px;
      font-variation-settings: "wght" 700;
      margin-top: 5px;
      width: fit-content;
      &:hover {
        text-decoration: underline;
      }
    }
    &.active {
      position: relative;
      opacity: 1;
      transition: opacity 2000ms;
    }
  }
}
</style>

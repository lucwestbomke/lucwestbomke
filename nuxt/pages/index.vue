<template>
  <main id="IndexPage">
    <div class="a">A</div>
    <Cards />
  </main>
</template>
<script setup lang="ts">
// const { projectData } = ();
const data = useProjectData();
const projectsData = ref(extractValues(data.value));

const currentIndex = ref(0);
const imageIndex = ref(0);

function returnLink(site: "github" | "linkedin" | "twitter") {
  let link = "";
  switch (site) {
    case "github":
      link = "https://github.com/lucwestbomke";
      break;
    default:
      link = "https://github.com/lucwestbomke";
  }
  return link;
}
</script>
<style scoped lang="scss">
#IndexPage {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 75px);
  div {
    flex-basis: 0;
    flex-grow: 1;
    order: 1;
  }
  #CardsComponent {
    flex-basis: 0;
    flex-grow: 1;
    margin-top: 100px;
    order: 0;
  }
}
@media (min-width: 1024px) {
  #IndexPage {
    flex-direction: row;
    .a {
      order: 0;
    }
    #CardsComponent {
      order: 1;
      margin-top: -100px;
    }
  }
}
</style>

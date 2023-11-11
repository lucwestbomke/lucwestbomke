<template>
  <main id="IndexPage">
    <Projects />
    <Cards />
  </main>
</template>
<script setup lang="ts">
// const { projectData } = ();
const data = useProjectData();
const projectsData = ref(data.value);

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

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest;

  describe("#returnLink", () => {
    it("test for github", () => {
      expect(returnLink("github")).toBe("https://github.com/lucwestbomke");
    });
  });
}
</script>
<style scoped lang="scss">
#IndexPage {
  align-items: center;
  display: flex;
  flex-direction: column;
  #ProjectsComponent {
    flex-grow: 1;
    order: 1;
  }
  #CardsComponent {
    margin-bottom: 40px;
    order: 0;
  }
}
@media (min-width: 1024px) {
  #IndexPage {
    column-gap: 30px;
    flex-direction: row;
    #ProjectsComponent {
      order: 0;
    }
    #CardsComponent {
      margin-bottom: 0px;
      order: 1;
    }
  }
}
</style>

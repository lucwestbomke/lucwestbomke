<template>
  <div id="IndexPage">
    <span class="cards" @mousemove="moveRadialHover">
      <nav class="nav">
        <div class="card name">
          <div class="card-border"></div>
          <div class="card-content">
            <h1>Luc Westbomke</h1>
          </div>
        </div>
        <div class="card list">
          <div class="card-border"></div>
          <ul class="card-content">
            <li>About</li>
            <li>|</li>
            <li>Projects</li>
          </ul>
        </div>
        <div class="card socials">
          <div class="card-border"></div>
          <div class="card-content">
            <nuxt-link :to="returnLink('github')" target="_blank" draggable="false"
              ><img src="@/assets/images/github.svg" class="icon" alt="github" width="25" height="25" draggable="false"
            /></nuxt-link>
            <p>|</p>
            <nuxt-link :to="returnLink('github')" target="_blank" draggable="false"
              ><img
                src="@/assets/images/linkedin-in.svg"
                class="icon"
                alt="linkedin"
                width="25"
                height="25"
                draggable="false"
            /></nuxt-link>
          </div>
        </div>
        <div class="card contact">
          <div class="card-border"></div>
          <nuxt-link to="mailto:contact@lucwestbomke.dev" class="card-content" target="_blank"
            ><h2>KEEP IN TOUCH</h2></nuxt-link
          >
        </div>
      </nav>
      <main class="main">
        <div class="card picture">
          <div class="card-border"></div>
          <div
            v-for="(image, index) in images"
            :key="index"
            class="card-content"
            v-show="Math.abs(currentIndex) % images.length === index"
          >
            <img :src="image" draggable="false" width="700" height="500" alt="alt text" />
          </div>
        </div>
        <div class="card description">
          <div class="card-border" id="description"></div>
          <div
            v-for="(description, index) in descriptions"
            :key="index"
            v-show="Math.abs(currentIndex) % descriptions.length === index"
            class="card-content"
          >
            <h2>{{ description }}</h2>
          </div>
        </div>
      </main>
      <div class="card title">
        <div class="card-border"></div>
        <div
          v-for="(title, index) in titles"
          :key="index"
          v-show="Math.abs(currentIndex) % titles.length === index"
          class="card-content"
        >
          <h1>{{ title }}</h1>
        </div>
      </div>
      <div class="card slide_left" @click="currentIndex--">
        <div class="card-border"></div>
        <div class="card-content">
          <img
            src="@/assets/images/angle-left-solid.svg"
            draggable="false"
            class="icon"
            alt="next slide"
            width="60"
            height="60"
          />
          <img
            src="@/assets/images/angle-left-solid.svg"
            draggable="false"
            class="icon"
            alt="next slide"
            width="60"
            height="60"
          />
        </div>
      </div>
      <div class="card slide_right" @click="currentIndex++">
        <div class="card-border"></div>
        <div class="card-content">
          <img
            src="@/assets/images/angle-right-solid.svg"
            draggable="false"
            class="icon"
            alt="next slide"
            width="60"
            height="60"
          />
          <img
            src="@/assets/images/angle-right-solid.svg"
            draggable="false"
            class="icon"
            alt="next slide"
            width="60"
            height="60"
          />
        </div>
      </div>
    </span>
  </div>
</template>
<script setup lang="ts">
const currentIndex = ref(0);
const images = ref([
  "https://picsum.photos/700/500",
  "https://picsum.photos/702/502",
  "https://picsum.photos/703/503",
  "https://picsum.photos/704/505",
]);
const titles = ref(["Isadora", "Melissa", "Taylor", "Luc"]);
const descriptions = ref([
  "Artificial intelligence, or AI, is a rapidly growing field that involves the development of computer programs and systems that can perform tasks typically requiring human intelligence. AI is being used in a wide range of applications, from autonomous vehicles and robotics to natural language processing and image recognition. As AI technology continues to advance, it is expected to transform many industries and create new opportunities for businesses and individuals alike. However, there are also concerns about the potential impact of AI on jobs, privacy, and security, and these issues will need to be carefully addressed as the technology continues to evolve.",
  "One of the most exciting aspects of artificial intelligence is its potential to help solve some of the world's most pressing problems, such as climate change, disease, and poverty. AI can be used to analyze vast amounts of data, identify patterns and trends, and make predictions that can inform decision-making and policy development. However, there are also risks associated with AI, such as the potential for biases to be built into algorithms and the ethical implications of using AI to make decisions that affect people's lives.",
  "AI is a rapidly evolving field that is poised to have a major impact on society in the coming years. From self-driving cars to virtual assistants, AI is already being used in a wide range of applications, and its potential uses are virtually limitless. However, there are also concerns about the ethical implications of AI, such as the potential for it to be used in ways that violate privacy or discriminate against certain groups of people. As AI continues to develop, it will be important to ensure that its benefits are shared fairly and that its risks are carefully managed.",
  "As artificial intelligence becomes more advanced, it is likely to have a profound impact on the workforce. Some experts predict that AI will lead to significant job displacement, as machines become increasingly capable of performing tasks that were previously done by humans. However, others argue that AI will create new jobs and opportunities, particularly in areas such as data analysis, software development, and robotics. Regardless of its impact on the labor market, it is clear that AI will be an important driver of economic growth and innovation in the years to come.",
]);

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
function returnLink(site: "github" | "linkedin" | "twitter") {
  let link = "";
  switch (site) {
    case "github":
      link = "https://github.com/lucwestbomke";
      break;
    default:
      link = "https://github.com/lucwestbomke";
  }
  // window.open(link, "_blank")!.focus();
  return link;
}
</script>
<style scoped lang="scss">
.cards {
  display: grid;
  gap: 4px;
  grid-template-areas:
    "nav nav nav nav"
    "main main main main"
    "title title slide_left slide_right";
  grid-template-columns: 2fr 2fr 1fr 1fr;
  grid-template-rows: 150px auto 200px;
  height: 100vh;
  .card {
    .card-content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .nav {
    display: grid;
    gap: 4px;
    grid-area: nav;
    grid-template-areas: "name list socials contact";
    grid-template-columns: 2fr 2fr 1fr 1fr;
  }
  .main {
    display: grid;
    gap: 4px;
    grid-area: main;
    grid-template-areas: "picture description";
    grid-template-columns: 2fr 1fr;
    overflow: hidden;
  }
  .name {
    grid-area: name;
    .card-content {
      h1 {
        font-size: 36px;
      }
    }
  }
  .list {
    grid-area: list;
    .card-content {
      column-gap: 48px;
      li {
        font-size: 36px;
      }
    }
  }
  .socials {
    grid-area: socials;
    user-select: none;
    .card-content {
      column-gap: 48px;
      p {
      }
    }
  }
  .contact {
    grid-area: contact;
    .card-content {
      text-align: center;
      text-decoration: none;
    }
  }
  .picture {
    grid-area: picture;
    .card-content {
      user-select: none;
    }
  }
  .description {
    grid-area: description;
    overflow-y: hidden;
    .card-content {
      align-items: start;
      overflow-y: auto;
      padding: 48px;
      max-height: 100%;
    }
  }
  .title {
    grid-area: title;
    .card-content {
      h1 {
        font-size: 68px;
      }
    }
  }
  .slide_left {
    cursor: pointer;
    grid-area: slide_left;
    position: relative;
    user-select: none;
    .icon {
      transition: all 500ms;
      &:last-of-type {
        opacity: 0;
        position: absolute;
        transform: translate(80px, 0);
      }
    }
    &:hover {
      .icon {
        &:last-of-type {
          opacity: 1;
          transform: translate(10px, 0);
        }
        &:first-of-type {
          transform: translate(-20px, 0);
        }
      }
    }
  }
  .slide_right {
    cursor: pointer;
    grid-area: slide_right;
    position: relative;
    user-select: none;
    .icon {
      transition: all 500ms;
      &:first-of-type {
        opacity: 0;
        position: absolute;
        transform: translate(-80px, 0);
      }
    }
    &:hover {
      .icon {
        &:first-of-type {
          opacity: 1;
          transform: translate(-10px, 0);
        }
        &:last-of-type {
          transform: translate(20px, 0);
        }
      }
    }
  }
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

<template>
  <div id="CardsComponent">
    <div class="cards">
      <div
        class="card"
        v-for="(project, index) in projectsData"
        :key="index"
        @mousedown="activateSwipe"
        @touchstart="activateSwipe"
        @mousemove="swipe"
        @touchmove="swipe"
        @mouseup="endSwipe"
        @mouseleave="endSwipe"
        @touchend="endSwipe"
        @touchcancel="endSwipe"
        ref="cards"
      >
        <h2>{{ project.title }}</h2>
        <!-- <p>{{ project.description.substring(0, 300) }}</p> -->
        <!-- <img :src="project.images[0]" alt="" draggable="false" /> -->
      </div>
      <div class="card-hidden"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
const data = useProjectData();
const projectsData = ref(data.value);
const isSwipeActive = ref(false);
const initialMousePosition = ref({
  x: 0,
  y: 0,
});
const currentMousePosition = ref({
  x: 0,
  y: 0,
});

const currentIndex = ref(projectsData.value.length - 1);

function increaseCurrentIndex() {
  currentIndex.value--;
  currentIndex.value =
    ((currentIndex.value % projectsData.value.length) + projectsData.value.length) % projectsData.value.length;
}

const cards = ref();

function activateSwipe(event: MouseEvent | TouchEvent) {
  isSwipeActive.value = true;
  if (event instanceof TouchEvent) {
    initialMousePosition.value = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  } else if (event instanceof MouseEvent) {
    initialMousePosition.value = {
      x: event.clientX,
      y: event.clientY,
    };
  }
  currentMousePosition.value = initialMousePosition.value;
}
function swipe(event: MouseEvent | TouchEvent) {
  if (!isSwipeActive.value) return;
  let dPos;
  if (event instanceof TouchEvent) {
    dPos = {
      x: event.touches[0].clientX - currentMousePosition.value.x,
      y: event.touches[0].clientY - currentMousePosition.value.y,
    };
    currentMousePosition.value = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  } else if (event instanceof MouseEvent) {
    dPos = {
      x: event.clientX - currentMousePosition.value.x,
      y: event.clientY - currentMousePosition.value.y,
    };
    currentMousePosition.value = {
      x: event.clientX,
      y: event.clientY,
    };
  } else {
    return;
  }
  if (dPos.x === 0 && dPos.y === 0) return;
  const card = cards.value[currentIndex.value];
  card.style.left = `${card.offsetLeft + dPos.x}px`;
  card.style.top = `${card.offsetTop + dPos.y}px`;
}
function endSwipe(event: MouseEvent | TouchEvent) {
  isSwipeActive.value = false;
  const card = cards.value[currentIndex.value];
  if (card.offsetLeft >= 200 || (card.offsetTop >= 250 && card.offsetLeft >= 0)) {
    card.style.transform = "translate(600px,0)";
    setZIndices();
    setTimeout(() => {
      card.style.transform = "translate(0,0)";
      card.style.left = "0px";
      card.style.top = "0px";
      card.style.transform = null;
    }, 800);
  } else if (card.offsetLeft <= -200 || (card.offsetTop >= 250 && card.offsetLeft < 0)) {
    card.style.transform = "translate(-1600px,0)";
    setZIndices();
    setTimeout(() => {
      card.style.transform = "translate(0,0)";
      card.style.left = "0px";
      card.style.top = "0px";
      card.style.transform = null;
    }, 1000);
  }
  setTimeout(() => {
    if (card.offsetLeft === 0 && card.offsetTop === 0) return;
    card.classList.add("transitioning");
    card.style.left = "0px";
    card.style.top = "0px";
    setTimeout(() => {
      card.classList.remove("transitioning");
    }, 400);
  }, 500);
  initialMousePosition.value = {
    x: 0,
    y: 0,
  };
  currentMousePosition.value = initialMousePosition.value;
}
function setZIndices() {
  cards.value.forEach((card: HTMLDivElement, index: number) => {
    card.style.zIndex = (+card.style.zIndex + 1).toString();
    if (index === currentIndex.value) {
      card.style.zIndex = "0";
    }
    // console.log(
    //   `Card: ${card.innerText} | Z-Index: ${card.style.zIndex} | CardIndex: ${index} | CurrIndex: ${currentIndex.value}`,
    // );
  });
  increaseCurrentIndex();
}
onMounted(() => {
  cards.value.forEach((card: HTMLDivElement, index: number) => {
    card.style.zIndex = index.toString();
    // console.log(
    //   `Card: ${card.innerText} | Z-Index: ${card.style.zIndex} | CardIndex: ${index} | CurrIndex: ${currentIndex.value}`,
    // );
  });
});
</script>
<style scoped lang="scss">
#CardsComponent {
  width: 100%;
  .cards {
    aspect-ratio: 1;
    position: relative;
    max-width: 400px;
    margin: 0 auto;
    .card {
      aspect-ratio: 1;
      background-color: $rose;
      border-radius: $border-radius;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      cursor: grab;
      display: flex;
      justify-content: center;
      left: 0;
      position: absolute;
      top: 0;
      user-select: none;
      width: 100%;
      // max-width: 300px;
      transition: transform 300ms;
      &:nth-of-type(1) {
        transform: rotate(10deg);
      }
      &:nth-of-type(2) {
        background-color: $azure;
      }
      &:nth-of-type(3) {
        transform: rotate(10deg);
        background-color: $tangerine;
      }
      &:nth-of-type(4) {
        background-color: $salmon;
      }
      &.transitioning {
        transition: all 500ms;
      }
      img {
        width: 100%;
      }
      &:hover {
        transform: scale(1.1);
      }
    }
    .card-hidden {
      aspect-ratio: 1;
      background-color: $black;
      left: 0;
      margin: 0 auto;
      max-width: 400px;
      position: relative;
      right: 0;
      top: 40px;
      visibility: hidden;
    }
  }
}
</style>

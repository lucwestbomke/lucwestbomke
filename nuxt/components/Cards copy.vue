<template>
  <div id="CardsComponent">
    <div
      class="card"
      :class="{ first: index === currentIndex }"
      v-for="(project, index) in projectsData"
      :key="index"
      @mousedown.passive="activateSwipe"
      @touchstart.passive="activateSwipe"
      @mousemove.passive="swipe"
      @touchmove.passive="swipe"
      @mouseup.passive="endSwipe"
      @mouseleave.passive="endSwipe"
      @touchend.passive="endSwipe"
      @touchcancel.passive="endSwipe"
      ref="cards"
    >
      <h2>{{ project.title }}</h2>
      <!-- <p>{{ project.description.substring(0, 300) }}</p> -->
      <!-- <img :src="project.images[0]" alt="" draggable="false" /> -->
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
const currentIndex = useCurrentIndex();
currentIndex.value = projectsData.value.length - 1;

const randomRotation = ref<number[]>([]);

projectsData.value.forEach(() => {
  randomRotation.value.push(Math.floor(Math.random() * 60 - 30));
});

function increaseCurrentIndex() {
  // cards.value[currentIndex.value].style.position = "absolute";
  currentIndex.value--;
  currentIndex.value =
    ((currentIndex.value % projectsData.value.length) + projectsData.value.length) % projectsData.value.length;
  cards.value[currentIndex.value].style.transform = "translate(-50%, 0) rotate(0deg)";
  // cards.value[currentIndex.value].style.position = "relative";
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
  console.log(card.getBoundingClientRect());
  console.log(card.offsetParent.getBoundingClientRect());
  const dx = card.getBoundingClientRect().x - card.offsetParent.getBoundingClientRect().x;
  const dy = card.getBoundingClientRect().y - card.offsetParent.getBoundingClientRect().y;
  // console.log(dx);
  console.log(card.style.left);
  // card.style.left = `${dx + dPos.x}px`;
  card.style.left = `400px`;
  card.style.top = `${dy + dPos.y}px`;
}
function endSwipe(event: MouseEvent | TouchEvent) {
  if (!isSwipeActive.value) return;
  isSwipeActive.value = false;
  const card = cards.value[currentIndex.value];
  const parent_v_middle =
    card.offsetParent.getBoundingClientRect().x + card.offsetParent.getBoundingClientRect().width / 2;
  const parent_h_middle =
    card.offsetParent.getBoundingClientRect().y + card.offsetParent.getBoundingClientRect().height / 2;
  const card_v_middle = card.getBoundingClientRect().x + card.getBoundingClientRect().width / 2;
  const card_h_middle = card.getBoundingClientRect().y + card.getBoundingClientRect().height / 2;
  // console.log(card_v_middle - parent_v_middle);
  // if (card.offsetLeft >= 200 || (card.offsetTop >= 250 && card.offsetLeft >= 0)) {
  if (
    card_v_middle - 150 >= parent_v_middle ||
    (card_h_middle - 250 >= parent_h_middle && card_v_middle >= parent_v_middle) ||
    (card_h_middle + 200 <= parent_h_middle && card_v_middle >= parent_v_middle)
  ) {
    card.style.transform = "translate(600px,0)";
    setZIndices();
    setTimeout(() => {
      card.style.left = "50%";
      card.style.top = "0px";
      card.style.transform = getTransformation(currentIndex.value);
    }, 800);
    // } else if (card.offsetLeft <= -200 || (card.offsetTop >= 250 && card.offsetLeft < 0)) {
  } else if (
    card_v_middle + 150 <= parent_v_middle ||
    (card_h_middle - 250 >= parent_h_middle && card_v_middle <= parent_v_middle) ||
    (card_h_middle + 200 <= parent_h_middle && card_v_middle <= parent_v_middle)
  ) {
    card.style.transform = "translate(-1600px,0)";
    setZIndices();
    setTimeout(() => {
      card.style.left = "50%";
      card.style.top = "0px";
      card.style.transform = getTransformation(currentIndex.value);
    }, 800);
  } else {
    setTimeout(() => {
      if (card.offsetLeft === 0 && card.offsetTop === 0) return;
      card.classList.add("transitioning");
      card.style.left = "50%";
      card.style.top = "0px";
      card.style.transform = "translate(-50%, 0) rotate(0deg)";
      setTimeout(() => {
        card.classList.remove("transitioning");
      }, 400);
    }, 500);
  }
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
function getTransformation(index: number) {
  // cards.value.forEach((card: HTMLDivElement, index: number) => {
  //   card.style.transform = `translation(-50%, 0px) rotate(${randomRotation.value[index]}deg)`;
  //   if (index === currentIndex.value) {
  //     card.style.transform = `rotate(0deg)`;
  //   }
  //   // console.log(
  //   //   `Card: ${card.innerText} | Z-Index: ${card.style.zIndex} | CardIndex: ${index} | CurrIndex: ${currentIndex.value}`,
  //   // );
  // });
  return `translate(-50%, 0) rotate(${randomRotation.value[index]}deg)`;
}
onMounted(() => {
  cards.value.forEach((card: HTMLDivElement, index: number) => {
    card.style.zIndex = index.toString();
    card.style.transform = `translate(-50%, 0) rotate(${randomRotation.value[index]}deg)`;
    if (index === currentIndex.value) {
      card.style.transform = "translate(-50%, 0) rotate(0deg)";
    }

    // console.log(
    //   `Card: ${card.innerText} | Z-Index: ${card.style.zIndex} | CardIndex: ${index} | CurrIndex: ${currentIndex.value}`,
    // );
  });
});
</script>
<style scoped lang="scss">
#CardsComponent {
  display: flex;
  justify-content: center;
  position: relative;
  touch-action: none;
  width: 100%;
  .card {
    align-self: auto;
    aspect-ratio: 1;
    border-radius: $border-radius;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    cursor: grab;
    display: flex;
    justify-content: center;
    left: 50%;
    // max-width: 275px;
    position: absolute;
    top: 0;
    transform: translate(-50%, 0);
    transition: transform 300ms;
    user-select: none;
    width: 100%;
    &:nth-of-type(1) {
      background-color: $pink;
    }
    &:nth-of-type(2) {
      background-color: $azure;
    }
    &:nth-of-type(3) {
      background-color: $tangerine;
    }
    &:nth-of-type(4) {
      background-color: $salmon;
    }
    &.transitioning {
      transition: all 500ms;
    }
    // &:hover {
    //   transform: scale(1.1);
    // }
    &.first {
      position: relative;
      // left: calc(0px + 50%);
    }
    img {
      width: 100%;
    }
    // .card-hidden {
    //   aspect-ratio: 1;
    //   background-color: $black;
    //   left: 0;
    //   margin: 0 auto;
    //   max-width: 400px;
    //   position: relative;
    //   right: 0;
    //   top: 0;
    //   visibility: hidden;
    // }
  }
}
@media (min-width: 768px) {
  #CardsComponent {
  }
}
</style>

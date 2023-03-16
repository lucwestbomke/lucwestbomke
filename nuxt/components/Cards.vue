<template>
  <div id="CardsComponent">
    <article
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
      <!-- <h2>{{ project.title }}</h2> -->
      <!-- <p>{{ project.description.substring(0, 300) }}</p> -->
      <img :src="project.images[0]" alt="" width="700" height="700" draggable="false" />
    </article>
  </div>
</template>
<script setup lang="ts">
const data = useProjectData();
const projectsData = ref(data.value);
const isSwipeActive = ref(false);
const animationInProgress = ref(false);
const currentIndex = useCurrentIndex();
currentIndex.value = projectsData.value.length - 1;
const initialMousePosition = ref({
  x: 0,
  y: 0,
});
const currentMousePosition = ref({
  x: 0,
  y: 0,
});

const cards = ref();

const randomRotation = ref<number[]>([]);
projectsData.value.forEach(() => {
  randomRotation.value.push(Math.floor(Math.random() * 60 - 30));
});

function activateSwipe(event: MouseEvent | TouchEvent) {
  if (animationInProgress.value) return;
  isSwipeActive.value = true;
  if (window.TouchEvent && event instanceof TouchEvent) {
    initialMousePosition.value = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  } else if (window.MouseEvent && event instanceof MouseEvent) {
    initialMousePosition.value = {
      x: event.clientX,
      y: event.clientY,
    };
  }
  currentMousePosition.value = initialMousePosition.value;
  const card = cards.value[currentIndex.value];
  card.style.cursor = "grabbing";
}

function swipe(event: MouseEvent | TouchEvent) {
  if (!isSwipeActive.value || animationInProgress.value) return;
  let dPos = {
    x: 0,
    y: 0,
  };
  if (window.TouchEvent && event instanceof TouchEvent) {
    dPos = {
      x: event.touches[0].clientX - currentMousePosition.value.x,
      y: event.touches[0].clientY - currentMousePosition.value.y,
    };
    currentMousePosition.value = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  } else if (window.MouseEvent && event instanceof MouseEvent) {
    dPos = {
      x: event.clientX - currentMousePosition.value.x,
      y: event.clientY - currentMousePosition.value.y,
    };
    currentMousePosition.value = {
      x: event.clientX,
      y: event.clientY,
    };
  }
  if (dPos.x === 0 && dPos.y === 0) return;
  const card = cards.value[currentIndex.value];
  const dx = +card.style.left.slice(0, -2) ?? 0;
  const dy = +card.style.top.slice(0, -2) ?? 0;
  const X_BORDER = 150;
  const Y_BORDER = 200;
  const crossedLeftBorder = dx < -X_BORDER;
  const crossedRightBorder = dx > X_BORDER;
  const crossedTopBorder = dy < -Y_BORDER;
  const crossedBottomBorder = dy > Y_BORDER;
  const darkenTransform = () => {
    return crossedRightBorder ||
      ((crossedTopBorder || crossedBottomBorder) && dx >= 0) ||
      crossedLeftBorder ||
      ((crossedTopBorder || crossedBottomBorder) && dx <= 0)
      ? "brightness(.8)"
      : "";
  };
  card.style.left = `${dx + dPos.x}px`;
  // card.style.top = `${dy + dPos.y}px`;
  // card.style.top = `${(1 / 100) * Math.abs(dx + dPos.x)}px`;
  card.style.transform = dPos.x > 0 ? "rotate(6deg)" : "rotate(-6deg)";
  card.style.filter = darkenTransform();
}

function endSwipe(event: MouseEvent | TouchEvent) {
  if (!isSwipeActive.value || animationInProgress.value) return;
  isSwipeActive.value = false;
  animationInProgress.value = true;
  const X_BORDER = 150;
  const Y_BORDER = 200;
  const card = cards.value[currentIndex.value];
  const dx = +card.style.left.slice(0, -2) ?? 0;
  const dy = +card.style.top.slice(0, -2) ?? 0;
  const crossedLeftBorder = dx < -X_BORDER;
  const crossedRightBorder = dx > X_BORDER;
  const crossedTopBorder = dy < -Y_BORDER;
  const crossedBottomBorder = dy > Y_BORDER;

  if (crossedRightBorder || ((crossedTopBorder || crossedBottomBorder) && dx >= 0)) {
    card.classList.add("vanishing-right");
    card.style.filter = null;
    setTimeout(() => {
      card.style.left = null;
      card.style.top = null;
      card.style.transform = null;
      card.classList.remove("vanishing-right");
      setZIndices();
      increaseCurrentIndex();
      animationInProgress.value = false;
    }, 2000);
  } else if (crossedLeftBorder || ((crossedTopBorder || crossedBottomBorder) && dx <= 0)) {
    card.classList.add("vanishing-left");
    card.style.filter = null;
    setTimeout(() => {
      card.style.left = null;
      card.style.top = null;
      card.style.transform = null;
      card.classList.remove("vanishing-left");
      setZIndices();
      increaseCurrentIndex();
      animationInProgress.value = false;
    }, 2000);
  } else {
    setTimeout(() => {
      if (card.offsetLeft === 0 && card.offsetTop === 0) return;
      card.classList.add("transitioning");
      card.style.left = "0px";
      card.style.top = "0px";
      card.style.transform = "rotate(0deg)";
      setTimeout(() => {
        card.classList.remove("transitioning");
        animationInProgress.value = false;
      }, 400);
    }, 500);
  }
  card.style.cursor = null;
}

function setZIndices() {
  cards.value.forEach((card: HTMLDivElement, index: number) => {
    card.style.zIndex = (+card.style.zIndex + 1).toString();
    if (index === currentIndex.value) {
      card.style.zIndex = "0";
    }
  });
}

function increaseCurrentIndex() {
  currentIndex.value--;
  currentIndex.value =
    ((currentIndex.value % projectsData.value.length) + projectsData.value.length) % projectsData.value.length;
}

onMounted(() => {
  cards.value.forEach((card: HTMLDivElement, index: number) => {
    card.style.zIndex = index.toString();
  });
});
</script>
<style scoped lang="scss">
#CardsComponent {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  touch-action: none;
  width: 100%;
  .card {
    aspect-ratio: 1;
    border: 2px solid $white;
    border-radius: $border-radius;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    cursor: grab;
    display: flex;
    justify-content: center;
    max-width: 275px;
    position: absolute;
    transition: transform 500ms, filter 300ms, scale 300ms;
    user-select: none;
    width: 100%;
    &:nth-of-type(1) {
      background-color: $pink;
    }
    &:nth-of-type(2) {
      background-color: $azure;
    }
    &:nth-of-type(3) {
      background-color: $storm;
    }
    &:nth-of-type(4) {
      background-color: $salmon;
    }
    &.transitioning {
      transition: all 500ms;
    }
    &.first {
      position: relative;
    }
    &.vanishing-left {
      animation-duration: 2s;
      animation-name: vanishing-left;
    }
    &.vanishing-right {
      animation-duration: 2s;
      animation-name: vanishing-right;
    }
    img {
      aspect-ratio: 1;
      height: 100%;
      border-radius: inherit;
      object-fit: cover;
      width: 100%;
    }
  }
}
@media (min-width: 768px) {
  #CardsComponent {
    .card {
      max-width: 400px;
    }
  }
}
@media (min-width: 1024px) {
  #CardsComponent {
    .card {
      max-width: 550px;
    }
  }
}
@keyframes vanishing-left {
  from {
  }
  10% {
    transform: scale(1);
  }
  25% {
    transform: scale(0);
  }
  49% {
    transform: translate(-1600px, 0px) scale(0);
  }
  50% {
    transform: translate(-1600px, 0px) scale(0);
  }
  to {
    transform: translate(0px, 0px) scale(1);
    left: unset;
    top: unset;
    z-index: -1;
  }
}
@keyframes vanishing-right {
  from {
  }
  10% {
    transform: scale(1);
  }
  25% {
    transform: scale(0);
  }
  49% {
    transform: translate(1000px, 0px) scale(0);
  }
  50% {
    transform: translate(1000px, 0px) scale(0);
  }
  to {
    transform: translate(0px, 0px) scale(1);
    left: unset;
    top: unset;
    z-index: 0;
  }
}
</style>

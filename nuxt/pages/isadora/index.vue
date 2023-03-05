<template>
  <div id="IsadoraPage">
    <div class="cards" @mousemove="moveRadialHover">
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
      <div class="card pen" @click="mode = 'pen'">
        <div class="card-border"></div>
        <div class="card-content">
          <h1>Pen</h1>
        </div>
      </div>
      <div class="card fill" @click="mode = 'fill'">
        <div class="card-border"></div>
        <div class="card-content">
          <h1>Fill</h1>
        </div>
      </div>
      <div class="card color">
        <div class="card-border"></div>
        <div class="card-content">
          <h1>Color</h1>
        </div>
      </div>
      <main class="main">
        <div class="card canvas">
          <div class="card-border"></div>
          <div class="card-content">
            <canvas
              id="canvas"
              width="960"
              height="540"
              ref="canvasEl"
              @mousedown="startPainting"
              @mousemove="draw"
              @mouseup="endPainting"
              @mouseleave="endPainting"
            ></canvas>
          </div>
        </div>
        <div class="card description" v-show="!showResult">
          <div class="card-border"></div>
          <div class="card-content">
            <h1>Description</h1>
          </div>
        </div>
        <div class="card result" v-show="showResult">
          <div class="card-border"></div>
          <div class="card-content">
            <h1>Restult</h1>
          </div>
        </div>
      </main>
      <div class="card black" @click="color = '#000000'">
        <div class="card-border"></div>
        <div class="card-content">
          <h1>Black</h1>
        </div>
      </div>
      <div class="card white" @click="color = '#FFFFFF'">
        <div class="card-border"></div>
        <div class="card-content">
          <h1>White</h1>
        </div>
      </div>
      <div class="card mode">
        <div class="card-border"></div>
        <div class="card-content">
          <h1>Mode</h1>
          <h2>Color: {{ color }} Mode: {{ mode }}</h2>
        </div>
      </div>
      <div class="card red" @click="color = '#FF0000'">
        <div class="card-border"></div>
        <div class="card-content">
          <h1>Red</h1>
        </div>
      </div>
      <div class="card green" @click="color = '#00FF00'">
        <div class="card-border"></div>
        <div class="card-content">
          <h1>Green</h1>
        </div>
      </div>
      <div class="card blue" @click="color = '#0000FF'">
        <div class="card-border"></div>
        <div class="card-content">
          <h1>Blue</h1>
        </div>
      </div>
      <div class="card predict" @click="saveImage">
        <div class="card-border"></div>
        <div class="card-content">
          <h1>Predict</h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const showResult = ref(false);

const isPainting = ref(false);
const color = ref("#FFFFFF");
const lineWidth = ref(5);
const mode = ref("pen");

const offsetLeft = ref(0);
const offsetTop = ref(0);

const canvasEl = ref<HTMLCanvasElement>();
const context = ref<CanvasRenderingContext2D>();

const { reshapeData } = useIsadora();

function startPainting(e: MouseEvent) {
  if (mode.value === "fill") fill(e);
  if (mode.value === "pen") isPainting.value = true;
}

function draw(e: MouseEvent) {
  if (!isPainting.value) return;
  context.value!.lineWidth = lineWidth.value;
  context.value!.lineCap = "round";
  context.value!.strokeStyle = color.value;
  context.value!.lineTo(e.clientX - offsetLeft.value, e.clientY - offsetTop.value);
  context.value!.stroke();
  context.value!.beginPath();
  context.value!.moveTo(e.clientX - offsetLeft.value, e.clientY - offsetTop.value);
}

function endPainting(e: MouseEvent) {
  if (mode.value === "pen") {
    context.value!.stroke();
    context.value!.beginPath();
    isPainting.value = false;
  }
}

function fill(e: MouseEvent) {
  floodFill(e.clientX - offsetLeft.value, e.clientY - offsetTop.value, hexToRgba(color.value));
}

function hexToRgba(hex: string): { r: number; g: number; b: number } {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  return {
    r,
    g,
    b,
  };
}

onBeforeMount(() => {
  nextTick(() => {
    if (canvasEl.value instanceof HTMLCanvasElement) {
      context.value = canvasEl.value.getContext("2d", {
        willReadFrequently: true,
        // desynchronized: true,
        alpha: false,
      })!;
      const rect = canvasEl.value.getBoundingClientRect();
      offsetLeft.value = Math.floor(rect.left);
      offsetTop.value = Math.floor(rect.top);
    }
  });
});
// onMounted(() => {
//   if (canvasEl.value instanceof HTMLCanvasElement) {
//     context.value = canvasEl.value.getContext("2d", {
//       willReadFrequently: true,
//       // desynchronized: true,
//       alpha: false,
//     })!;
//     const rect = canvasEl.value.getBoundingClientRect();
//     offsetLeft.value = Math.floor(rect.left);
//     offsetTop.value = Math.floor(rect.top);
//   }
// });
function saveImage() {
  const Uint8Data = context.value!.getImageData(0, 0, canvasEl.value!.width, canvasEl.value!.height).data;
  const data = Array.from(Uint8Data);
  const calldata = {
    data: reshapeData(removeEveryFourthElement(data)),
  };
  console.log(calldata);
  // postAPICall(calldata).then((res: any) => {
  //   console.log(res);
  //   image_id.value = res.image_id;
  // });
}

function floodFill(startX: number, startY: number, newColor: { r: number; g: number; b: number }) {
  const imageData = context.value!.getImageData(0, 0, canvasEl.value!.width, canvasEl.value!.height);
  const data = imageData.data;
  const getPixelIndex = (x: number, y: number) => {
    return (y * canvasEl.value!.width + x) * 4;
  };

  const oldColor = {
    r: data[getPixelIndex(startX, startY)],
    g: data[getPixelIndex(startX, startY) + 1],
    b: data[getPixelIndex(startX, startY) + 2],
  };

  if (oldColor.r === newColor.r && oldColor.g === newColor.g && oldColor.b === newColor.b) return;

  const queue: number[] = [];
  queue.push(startX, startY);

  let tail = 0;
  while (tail < queue.length) {
    const x = queue[tail++];
    const y = queue[tail++];

    if (x < 0 || x >= canvasEl.value!.width || y < 0 || y >= canvasEl.value!.height) continue;
    const i = getPixelIndex(x, y);
    if (data[i] !== oldColor.r || data[i + 1] !== oldColor.g || data[i + 2] !== oldColor.b) continue;
    data[i] = newColor.r;
    data[i + 1] = newColor.g;
    data[i + 2] = newColor.b;
    queue.push(x + 1, y, x - 1, y, x, y + 1, x, y - 1);
  }

  context.value!.putImageData(imageData, 0, 0);
}
function removeEveryFourthElement(array: number[]) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if ((i + 1) % 4 !== 0) {
      result.push(array[i]);
    }
  }
  return result;
}
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
    "nav nav nav nav nav nav"
    "pen main main main main main"
    "fill main main main main main"
    "color main main main main main"
    "black main main main main main"
    "white main main main main main"
    "mode red green blue predict predict";
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 150px 1fr 1fr 1fr 1fr 1fr 150px;
  height: 100vh;
  width: 100vw;

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
    grid-template-areas: "canvas desc_res";
    grid-template-columns: 2.35fr 1fr;
    overflow: hidden;
    .canvas {
      grid-area: canvas;
      .card-content {
        #canvas {
          border: 1px solid $black;
          width: 960px;
          height: 540px;
        }
      }
    }
    .description,
    .result {
      grid-area: desc_res;
    }
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
    }
  }
  .contact {
    grid-area: contact;
    .card-content {
      text-align: center;
      // text-decoration: none;
    }
  }
  .pen {
    grid-area: pen;
  }
  .fill {
    grid-area: fill;
  }
  .color {
    grid-area: color;
  }
  .black {
    grid-area: black;
  }
  .white {
    grid-area: white;
  }
  .mode {
    grid-area: mode;
  }
  .red {
    grid-area: red;
  }
  .green {
    grid-area: green;
  }
  .blue {
    grid-area: blue;
  }
  .predict {
    grid-area: predict;
  }
}
</style>

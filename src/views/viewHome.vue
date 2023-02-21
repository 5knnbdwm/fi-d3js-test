<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import twButton from "../components/inputs/twButton.vue";
import twSelect from "../components/inputs/twSelect.vue";
import twInput from "../components/inputs/twInput.vue";

import graphWrapper from "../components/graph/graphWrapper.vue";
import graphBar from "../components/graph/graphBar.vue";
import graphTest from "../components/graph/graphTest.vue";
import graphMap from "../components/graph/graphMap.vue";
import GraphLine from "../components/graph/graphLine.vue";

const data = [
  { name: "E", value: 0.12702 },
  { name: "T", value: 0.09056 },
  { name: "A", value: 0.08167 },
  { name: "O", value: 0.07507 },
  { name: "I", value: 0.06966 },
  { name: "N", value: 0.06749 },
  { name: "S", value: 0.06327 },
  { name: "H", value: 0.06094 },
  { name: "R", value: 0.05987 },
  { name: "D", value: 0.04253 },
  { name: "L", value: 0.04025 },
  { name: "C", value: 0.02782 },
  { name: "U", value: 0.02758 },
  { name: "M", value: 0.02406 },
  { name: "W", value: 0.0236 },
  { name: "F", value: 0.02288 },
  { name: "G", value: 0.02015 },
  { name: "Y", value: 0.01974 },
  { name: "P", value: 0.01929 },
  { name: "B", value: 0.01492 },
  { name: "V", value: 0.00978 },
  { name: "K", value: 0.00772 },
  { name: "J", value: 0.00153 },
  { name: "X", value: 0.0015 },
  { name: "Q", value: 0.00095 },
  { name: "Z", value: 0.00074 },
];

const screenY = ref(0);
const offset = 26;
const currentSize = ref(100);
const minSize = 100;
const maxSize = 500;

const onScroll = () => {
  currentSize.value = Math.max(
    Math.min(minSize + window.scrollY, maxSize),
    minSize
  );
};

onMounted(() => {
  screenY.value = window.innerHeight;
  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", () => {
    screenY.value = window.innerHeight;
  });
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", () => {
    screenY.value = window.innerHeight;
  });
});

const log = (value = "-") => {
  console.log("here", value);
};
</script>

<template>
  <div
    class="bg-white dark:bg-slate-900"
    :style="`height: ${screenY - minSize - offset}px`"
  >
    <graphWrapper v-slot="slotWrapper">
      <graphMap :height="slotWrapper.height" :width="slotWrapper.width" />
    </graphWrapper>
    <!-- <graphWrapper v-slot="slotWrapper">
      <GraphLine />
    </graphWrapper> -->
    <!-- <graphWrapper v-slot="slotWrapper">
      <graphBar :height="slotWrapper.height" :width="slotWrapper.width" />
    </graphWrapper> -->

    <!-- <div class="m-1">
      <twButton name="some new text" @click="log" class="">
        Some new text
      </twButton>
    </div>
    <div class="m-1">
      <twSelect label="Letters" name="select" @change="log($event)">
        <template v-for="letter in data">
          <option>{{ letter.name }} - {{ letter.value * 100 }}%</option>
        </template>
      </twSelect>
    </div>
    <div class="m-1">
      <twInput
        label="some text"
        name="text"
        :debounce="300"
        @change="log($event)"
      ></twInput>
    </div> -->
  </div>
  <div class="h-[1000px] bg-white p-10 pt-0 dark:bg-slate-900">
    <!-- <div
      class="bottom-0 w-1/2 justify-center bg-white dark:bg-slate-900"
      :class="`h-[${currentSize}px]`"
      :style="`height: ${currentSize}px`"
    >
      <graphWrapper v-slot="slotWrapper">
        <graphBar
          :key="slotWrapper.height +slotWrapper.width"
          v-if="slotWrapper.height !== 0 && slotWrapper.width !== 0"
          :height="slotWrapper.height"
          :width="slotWrapper.width"
        />
      </graphWrapper>
    </div> -->
    <!-- <div class="h-10 w-full border-0 border-t-2 border-t-red-500"></div> -->
  </div>
</template>

<style scoped></style>

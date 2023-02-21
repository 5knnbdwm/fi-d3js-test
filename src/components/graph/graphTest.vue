<script setup lang="ts">
import * as d3 from "d3";
import { nextTick, onMounted, ref, watch } from "vue";

import { useRoundedRect } from "../../utils/usePathTools";
// const props = defineProps({
//   width: { type: Number, required: true },
//   height: { type: Number, required: true },
// });

const sizeX = ref(500);
const sizeY = ref(500);
// const sizeX = ref(props.height);
// const sizeY = ref(props.width);

const box1 = {
  x: 10,
  y: 10,
  height: 80,
  width: 30,
};
const box2 = {
  x: 60,
  y: 10,
  height: 80,
  width: 30,
};

onMounted(async () => {
  let svg = d3
    .select("svg")
    .attr("width", sizeX.value)
    .attr("height", sizeY.value);
  svg
    .append("rect")
    .attr("id", "bg")
    .attr("x", "0")
    .attr("y", "0")
    .attr("width", sizeX.value)
    .attr("height", sizeY.value)
    .attr("fill", "#69b3a2");
  // svg
  //   .append("rect")
  //   .attr("id", "box1")
  //   .attr("x", box1.x)
  //   .attr("y", box1.y)
  //   .attr("width", box1.width)
  //   .attr("height", box1.height)
  //   .attr("fill", "black");
  // svg
  //   .append("rect")
  //   .attr("id", "box2")
  //   .attr("x", box2.x)
  //   .attr("y", box2.y)
  //   .attr("width", box2.width)
  //   .attr("height", box2.height)
  //   .attr("fill", "black");
  svg.append("path").attr("d", useRoundedRect(100, 100, 300, 300, 10, true));
});

const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

const change = () => {
  // sizeX.value += Math.floor(mapRange(Math.random(), 0, 1, -100, 100));
  // sizeY.value += Math.floor(mapRange(Math.random(), 0, 1, -100, 100));

  let svg = d3.select("svg").transition().duration(1000);
  svg.attr("transform", "translate(480,250)");

  // svg.attr("width", sizeX.value).attr("height", sizeY.value);

  // svg
  //   .select("rect#bg")
  //   .attr("x", "0")
  //   .attr("y", "0")
  //   .attr("width", sizeX.value)
  //   .attr("height", sizeY.value)
  //   .attr("fill", "#69b3a2");

  // svg
  //   .select("rect#box1")
  //   .attr("x", (box1.x / 100) * sizeX.value)
  //   .attr("y", (box1.y / 100) * sizeY.value)
  //   .attr("width", (box1.width / 100) * sizeX.value)
  //   .attr("height", (box1.height / 100) * sizeY.value);
  // svg
  //   .select("rect#box2")
  //   .attr("x", (box2.x / 100) * sizeX.value)
  //   .attr("y", (box2.y / 100) * sizeY.value)
  //   .attr("width", (box2.width / 100) * sizeX.value)
  //   .attr("height", (box2.height / 100) * sizeY.value);
};

// watch(
//   props,
//   () => {
//     sizeX.value = props.width;
//     sizeY.value = props.height;
//     change();

//     // resetSVG();
//     // makeSVG();
//   },
//   { deep: true }
// );
</script>

<template>
  <button @click="change" type="button">click</button>
  <!-- <br />
  {{ sizeX }} {{ sizeX * 2 }}
  <br />
  {{ sizeY }} {{ sizeY * 2 }} -->
  <svg id="svg"></svg>
</template>

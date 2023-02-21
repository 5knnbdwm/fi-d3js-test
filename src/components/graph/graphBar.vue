<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import * as d3 from "d3";

import { useRoundedRect } from "../../utils/usePathTools";

interface DataType {
  name: string;
  value: number;
}

const props = defineProps({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
});

const height = ref(props.height);
const width = ref(props.width);
let svg = d3 as any;

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
  // { name: "U", value: 0.02758 },
  // { name: "M", value: 0.02406 },
  // { name: "W", value: 0.0236 },
  // { name: "F", value: 0.02288 },
  // { name: "G", value: 0.02015 },
  // { name: "Y", value: 0.01974 },
  // { name: "P", value: 0.01929 },
  // { name: "B", value: 0.01492 },
  // { name: "V", value: 0.00978 },
  // { name: "K", value: 0.00772 },
  // { name: "J", value: 0.00153 },
  // { name: "X", value: 0.0015 },
  // { name: "Q", value: 0.00095 },
  // { name: "Z", value: 0.00074 },
] as DataType[];

const resetSVG = () => {
  let svg = document.getElementById("svg");
  if (svg) svg.innerHTML = "";
};

const makeSVG = () => {
  const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  // const margin = { top: 20, right: 0, bottom: 30, left: 40 };
  svg = d3.select("svg").attr("viewBox", [0, 0, width.value, height.value]);

  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([margin.left, width.value - margin.right])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value) || 0])
    .nice()
    .range([height.value - margin.bottom, margin.top]);

  const xAxis = (g: any) =>
    g
      .attr("transform", `translate(0,${height.value - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

  const yAxis = (g: any) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call((g: any) => g.select(".domain").remove());

  svg
    .append("g")
    .attr("class", "bars")
    .selectAll("rect")
    .data(data)
    .join("path")
    .attr("d", (d: DataType) => {
      return useRoundedRect(
        x(d.name) || 0,
        y(d.value),
        x.bandwidth(),
        y(0) - y(d.value),
        10,
        true,
        true,
        true,
        true
      );
    })
    .attr("x", (d: DataType) => x(d.name))
    .attr("y", (d: DataType) => y(d.value))
    .attr("height", (d: DataType) => y(0) - y(d.value))
    .attr("width", x.bandwidth())
    .attr("fill", "#a1a1a1")
    .attr("class", "cursor-pointer")

    // .on("pointerenter", () => {
    //   console.log("enter");
    // })
    // .on("pointerleave", () => {
    //   console.log("leave");
    // })
    .on("mousedown", (e: any) => {
      console.log("click", e);
    });
};

onMounted(async () => {
  makeSVG();
});
</script>

<template>
  <div>
    <svg id="svg"></svg>
  </div>
</template>

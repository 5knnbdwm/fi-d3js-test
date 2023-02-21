<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import * as d3 from "d3";

interface DataType {
  date: string;
  amount: number;
}
const height = ref(500);
const width = ref(800);
const data = [
  { date: "24-Apr-07", amount: 93.24 },
  { date: "25-Apr-07", amount: 95.35 },
  { date: "26-Apr-07", amount: 98.84 },
  { date: "27-Apr-07", amount: 99.92 },
  { date: "30-Apr-07", amount: 99.8 },
  { date: "1-May-07", amount: 99.47 },
  { date: "2-May-07", amount: 100.39 },
  { date: "3-May-07", amount: 100.4 },
  { date: "4-May-07", amount: 100.81 },
  { date: "7-May-07", amount: 103.92 },
  { date: "8-May-07", amount: 105.06 },
  { date: "9-May-07", amount: 106.88 },
  { date: "10-May-07", amount: 107.34 },
] as unknown;

let svg = undefined as any;

const parseTime = d3.timeParse("%d-%b-%y");

const x = d3
  .scaleTime()
  .domain(
    d3.extent(data, (d) => {
      return parseTime(d.date);
    })
  )
  .rangeRound([0, width.value]);

const y = d3
  .scaleLinear()
  .domain(
    d3.extent(data, (d) => {
      return d.amount;
    })
  )
  .rangeRound([height.value, 0]);

const line = d3
  .line()
  .x((d) => {
    return x(parseTime(d.date));
  })
  .y((d) => {
    return y(d.amount);
  });

const makeSvg = () => {
  // const g = svg.append("g");

  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line);
};

const changeSvg = () => {
  svg
    .attr("width", width.value)
    .attr("height", height.value)
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line);
};
onMounted(() => {
  svg = d3
    .select("svg")
    .attr("width", width.value)
    .attr("height", height.value);
  makeSvg();
});

watch(height, () => {
  changeSvg();
});
</script>

<template>
  <svg></svg>
</template>

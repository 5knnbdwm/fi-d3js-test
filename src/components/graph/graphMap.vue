<script setup lang="ts">
import {
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  reactive,
  watch,
} from "vue";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { FeatureCollection } from "geojson";

import data from "../../assets/topo/countries-110m.json";
// import data from "../../assets/topo/countries-50m.json";

const props = defineProps({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
});

const height = ref(props.height);
const width = ref(props.width);
let margin = reactive({ top: 0, right: 0, bottom: 0, left: 0 });
const scale = 1.5;
const metaKey = ref(false);

let countriesTopo = data as any;

countriesTopo.objects.countries.geometries =
  data.objects.countries.geometries.filter(
    (item) => item.properties.key !== "AQ"
  );

const world = topojson.feature(
  countriesTopo,
  countriesTopo.objects.countries
) as unknown as FeatureCollection;

// const size = [942, 414] as [number, number];
// const projection = d3.geoEqualEarth();
// .fitSize([width.value, height.value], { type: "Sphere" });

const size = [962, 623] as [number, number];
margin.top += 300;
const projection = d3.geoMercator();
//   .fitSize([width.value, height.value], { type: "Sphere" });

// const size = [960, 372] as [number, number];
// const projection = d3.geoEquirectangular();
// .fitSize(size, {
//   type: "Sphere",
// });

const path = d3.geoPath(projection);

let zoom = undefined as any;
let countries = undefined as any;
let svg = undefined as any;
let g = undefined as any;

let selectedCountries = reactive({ arr: [] as any[] });

const makeSVG = () => {
  zoom = d3.zoom().scaleExtent([scale, 10]).on("zoom", doZoomed);
  svg = d3
    .select("svg")
    .attr("viewBox", [0, 0, width.value, height.value])
    .on("click", doReset);

  g = svg.append("g");

  countries = g
    .attr("fill", "#444")
    .attr("cursor", "pointer")
    .selectAll("path")
    .data(world.features)
    .join("path")
    .on("click", doClicked)
    .attr("d", path)
    .attr("id", (d: any) => d.properties.key);

  g.append("path")
    .attr("fill", "none")
    .attr("stroke", "#FFF")
    .attr("stroke-linejoin", "round")
    .attr(
      "d",
      path(
        topojson.mesh(
          countriesTopo,
          countriesTopo.objects.countries,
          (a, b) => a !== b
        )
      )
    );

  svg.call(zoom);

  const [[x0, y0], [x1, y1]] = [
    [0 + margin.right, 0 + margin.bottom],
    [size[0] - margin.left, size[1] - margin.top],
  ];
  svg.call(
    zoom.transform,
    d3.zoomIdentity
      .translate(width.value / 2, height.value / 2)
      .scale(scale)
      .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
  );
};

const doReset = (event: any) => {
  event.stopPropagation();

  countries.transition().style("fill", null);

  selectedCountries.arr = [];
};

const doClicked = (event: any, d: any) => {
  event.stopPropagation();
  countries.transition().style("fill", null);
  d3.select(event.target).transition().style("fill", "red");

  if (metaKey.value) {
    if (
      selectedCountries.arr.findIndex(
        (item) => item.properties.key === d.properties.key
      ) !== -1
    ) {
      selectedCountries.arr = selectedCountries.arr.filter(
        (item) => item.properties.key !== d.properties.key
      );
    } else {
      selectedCountries.arr.push(d);
    }
  } else {
    if (
      selectedCountries.arr.findIndex(
        (item) => item.properties.key === d.properties.key
      ) !== -1
    ) {
      selectedCountries.arr = selectedCountries.arr.filter(
        (item) => item.properties.key === d.properties.key
      );
    } else {
      selectedCountries.arr = [d];
    }
  }
};

const doZoomed = (event: any) => {
  const { transform } = event;
  g.attr("transform", transform);
  g.attr("stroke-width", 1 / transform.k);
};

const keyDown = (e: KeyboardEvent) => {
  // console.log(e);
  if (e.key === "Meta") {
    metaKey.value = true;
  }
};
const keyUp = (e: KeyboardEvent) => {
  if (e.key === "Meta") {
    metaKey.value = false;
  }
};

onMounted(async () => {
  makeSVG();
  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", keyDown);
  document.removeEventListener("keyup", keyUp);
});

watch(selectedCountries, () => {
  console.log(
    selectedCountries.arr.map(
      (item) => item.properties.key + " - " + item.properties.name
    )
  );
  countries.transition().style("fill", null);

  const list = countries._groups[0];
  for (let i = 0; i < list.length; i++) {
    const country = list[i];

    if (
      selectedCountries.arr.findIndex(
        (item) => item.properties.key === country.id
      )
    ) {
      console.log(country.id);
    }
  }
  // for (let i = 0; i < selectedCountries.arr.length; i++) {
  //   const country = selectedCountries.arr[i];
  //   console.log(document.getElementsByName(country.properties.key));
  //   // console.log(document.getElementById(country.properties.key));

  //   // d3.select(document.getElementById(country.properties.key))
  //   //   .transition()
  //   //   .style("fill", "red");
  // }
});
</script>

<template>
  <svg></svg>
</template>

<style scoped></style>

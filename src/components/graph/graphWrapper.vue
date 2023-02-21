<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useRandomString } from "../../utils/useRandomString";
const idString = ref("");
const height = ref(0);
const width = ref(0);

onMounted(async () => {
  idString.value = useRandomString(6);

  window.addEventListener("scroll", () => {
    const element = document.getElementById(`base-${idString.value}`);
    height.value = element?.clientHeight || height.value;
    width.value = element?.clientWidth || width.value;
  });
  window.addEventListener("resize", () => {
    const element = document.getElementById(`base-${idString.value}`);
    height.value = element?.clientHeight || height.value;
    width.value = element?.clientWidth || width.value;
  });

  await nextTick();
  const element = document.getElementById(`base-${idString.value}`);
  height.value = element?.clientHeight || height.value;
  width.value = element?.clientWidth || width.value;
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", () => {});
  window.removeEventListener("resize", () => {});
});
</script>

<template>
  <div class="h-full w-full" :id="`base-${idString}`">
    <slot :key="height + width" :height="height" :width="width"></slot>
  </div>
</template>

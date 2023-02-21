<script setup lang="ts">
import { ref } from "vue";

const dark = ref(false);
</script>

<template>
  <div :class="{ dark: dark }">
    <div class="bg-white dark:bg-slate-900">
      <div class="border-b-2 border-gray-300 dark:border-slate-500">
        <input type="checkbox" v-model="dark" /> -
        <RouterLink :to="{ name: 'home' }">home</RouterLink> -
        <RouterLink :to="{ name: 'design' }">design</RouterLink>
      </div>

      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.dark > * {
  color: white;
}
</style>

<script setup lang="ts">
const emit = defineEmits(["click"]);

defineProps({
  class: String,
  name: { type: String, required: true },
  disabled: Boolean,
});
</script>

<template>
  <button
    :id="name"
    type="button"
    class="inline-flex w-full cursor-pointer items-center rounded-md border border-transparent bg-primary-100 px-3 py-2 text-sm font-medium text-primary-700 hover:bg-primary-200 focus:border-transparent focus:bg-primary-200 focus:outline-none focus:ring-0 active:bg-primary-100 disabled:cursor-not-allowed disabled:bg-primary-50 disabled:text-primary-400 dark:bg-primary-800 dark:text-primary-200 dark:hover:bg-primary-700 dark:focus:bg-primary-700 dark:active:bg-primary-800 dark:disabled:bg-primary-900 dark:disabled:text-primary-500"
    :class="class"
    :disabled="disabled"
    @click="emit('click')"
  >
    <slot>Click</slot>
  </button>
</template>

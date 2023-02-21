<script setup lang="ts">
const emit = defineEmits(["change"]);
const changed = (event: any) => {
  emit("change", event.target.value ? event.target.value : "");
};

defineProps({
  class: String,
  name: { type: String, required: true },
  label: String,
  disabled: Boolean,
});
</script>

<template>
  <div>
    <label
      v-if="label"
      :for="name"
      class="block text-sm font-medium text-gray-700 dark:text-gray-200"
    >
      {{ label }}
    </label>
    <select
      :id="name"
      :name="name"
      class="relative block w-full cursor-pointer rounded-md border border-transparent bg-primary-100 py-2 pl-3 pr-8 text-sm font-medium text-primary-700 hover:bg-primary-200 focus:border-transparent focus:bg-primary-200 focus:outline-none focus:ring-0 active:bg-primary-100 disabled:cursor-not-allowed disabled:bg-primary-50 disabled:text-primary-400 dark:bg-primary-800 dark:text-primary-200 dark:hover:bg-primary-700 dark:focus:bg-primary-700 dark:active:bg-primary-800 dark:disabled:bg-primary-900 dark:disabled:text-primary-500"
      :class="class"
      :disabled="disabled"
      @input="changed"
    >
      <slot>
        <option disabled>missing options</option>
      </slot>
    </select>
  </div>
</template>

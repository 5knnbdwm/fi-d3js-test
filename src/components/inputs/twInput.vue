<script setup lang="ts">
import { useDebounceFn } from "../../utils/useDebounce";

const emit = defineEmits(["change"]);
const changed = (event: any) => {
  // emit("change", event.target.value ? event.target.value : "");
  bounce(event.target.value ? event.target.value : "");
};

const props = defineProps({
  class: String,
  name: { type: String, required: true },
  label: String,
  disabled: Boolean,
  type: String,
  placeholder: String,
  debounce: { type: Number, default: 0 },
});

const bounce = useDebounceFn((value: string) => {
  emit("change", value);
}, props.debounce);
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
    <div class="relative mt-1 rounded-md shadow-sm">
      <input
        :type="type ? type : 'text'"
        :name="name"
        :id="name"
        class="block w-full cursor-text rounded-md border border-transparent bg-primary-100 py-2 pl-3 pr-8 text-sm font-medium text-primary-700 hover:bg-primary-200 focus:border-transparent focus:bg-primary-200 focus:outline-none focus:ring-0 active:bg-primary-100 disabled:cursor-not-allowed disabled:bg-primary-50 disabled:text-primary-400 dark:bg-primary-800 dark:text-primary-200 dark:hover:bg-primary-700 dark:focus:bg-primary-700 dark:active:bg-primary-800 dark:disabled:bg-primary-900 dark:disabled:text-primary-500"
        :placeholder="placeholder"
        @input="changed"
      />
    </div>
  </div>
</template>

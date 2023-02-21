import { ref, customRef } from "vue";

const myDebounce = (fn: any, delay = 0, immediate = false) => {
  let timeout = null as any;
  return (...args: any) => {
    if (immediate && !timeout) fn(...args);
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const useDebounce = (initialValue: any, delay: number, immediate: boolean) => {
  const state = ref(initialValue);
  const debouncedReference = customRef((myTrack, myTrigger) => ({
    get() {
      myTrack();
      return state.value;
    },
    set: myDebounce(
      (value: any) => {
        state.value = value;
        myTrigger();
      },
      delay,
      immediate
    ),
  }));
  return debouncedReference;
};

const useDebounceFn = (fn: any, delay: number) => {
  let timeout = null as any;

  return (...args: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export { useDebounce, useDebounceFn };

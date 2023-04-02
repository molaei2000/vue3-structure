import { defineStore } from "pinia";
import { ref } from "vue";
export const useLoading = defineStore("loading", () => {
  const loading = ref(false);
  const startLoading = () => {
    loading.value = true;
  };
  const finishLoading = () => {
    loading.value = false;
  };

  return { startLoading, finishLoading, loading };
});

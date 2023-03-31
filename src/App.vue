<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
console.log(route);
</script>

<template>
  <p>App</p>
  <RouterView v-slot="{ Component }">
    <transition name="slide" mode="out-in">
      <component :is="Component" :key="$route.path"></component>
    </transition>
  </RouterView>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>

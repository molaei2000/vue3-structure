<script setup>
import { useAuthentication } from "@/stores/global/auth.store.js"
const {user} = useAuthentication()
</script>

<template>
  <p>App</p>
  {{ user }}
  <RouterView v-slot="{ Component }">
    <transition name="slide" mode="out-in">
      <component :is="Component" :key="$route.path"></component>
    </transition>
  </RouterView>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>

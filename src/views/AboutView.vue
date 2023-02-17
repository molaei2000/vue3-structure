<script setup>
import ThemeToggle from "../components/ThemeToggle.vue";
</script>

<template>
  <div class="about">
    <ThemeToggle />
    <h1>This is an about page</h1>
    <v-alert type="success" title="Alert title"> hey my name is mahdi </v-alert>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

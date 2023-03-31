<script setup>

</script>
<template>
  <v-card>
    <RouterLink :to="{name:'panel'}">panel</RouterLink>
    <RouterLink :to="{name:'index'}">index</RouterLink>
    <RouterView />
  </v-card>
</template>

<style scoped></style>

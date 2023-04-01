<script setup>

</script>
<template>
  <v-card>
    <AppLink :to="{name:'panel'}">panel</AppLink>
    <AppLink :to="{name:'index'}">index</AppLink>
    <RouterView />
  </v-card>
</template>

<style scoped></style>

<template>
    <a v-if="isExternal" :href="to">
        <slot />
    </a>
    <router-link v-else v-bind="$props">
        <slot />
    </router-link>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { computed } from "vue"
const props = defineProps({
    ...RouterLink.props,
})
const isExternal = computed(() => {
    return typeof props.to === 'string' && props.to.startsWith('http')
})
</script>

<style scoped></style>
<template>
    <div></div>
</template>

<script>
export default {
    data() {
        return {
           

        }
    },
}
created() {
    this.$watch(() => this.$route, () => {
        console.log("route change");
    })
},
</script>

<style lang="scss" scoped></style>

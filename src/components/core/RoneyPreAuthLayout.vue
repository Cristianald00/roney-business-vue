<template>
    <div class="roney-pre-layout-container">
        <HeaderPreAuthCore />

        <main class="roney-pre-layout-body">
            <slot/>
        </main>

        <FooterCore />
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import FooterCore from './FooterCore.vue'
import { RouterLink, RouterView } from 'vue-router'
import HeaderPreAuthCore from './HeaderPreAuthCore.vue'

export default defineComponent({
    name: 'RoneyPreAuthLayout',
    data() {
        return {
        }
    },
    components: {
        HeaderPreAuthCore,
        FooterCore
    },
    watch: {
    },
    methods: {
    },
    beforeMount() {
        // Lifecycle hook: beforeMount
        // Perform any necessary setup or initialization here
    },
    mounted() {
        // Lifecycle hook: mounted
        // Access the component's DOM element or perform other operations after mounting
    },
})
</script>

<style lang="scss">
.roney-pre-layout-container {
    display: block;
    width: 100%;
    box-sizing: border-box;

    .roney-pre-layout-body {
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
    }
}
</style>

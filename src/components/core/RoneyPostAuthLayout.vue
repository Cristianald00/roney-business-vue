<template>
    <div class="roney-post-layout-container">
        <HeaderCore />

        <div class="roney-post-layout-right">
            <main class="roney-main-container">
                <slot/>
            </main>

            <FooterCore />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderCore from './HeaderCore.vue'
import FooterCore from './FooterCore.vue'
import { RouterLink, RouterView } from 'vue-router'

export default defineComponent({
    name: 'RoneyPreAuthLayout',
    data() {
        return {
        }
    },
    components: {
        HeaderCore,
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
.roney-post-layout-container {
    display: block;
    width: 100%;
    vertical-align: top;
    box-sizing: border-box;

    .roney-post-layout-right {
        display: inline-block;
        width: 90%;
        vertical-align: top;
        box-sizing: border-box;
        .roney-main-container {
            min-height: 70vh;
            padding: 0 0 0 3em;
        }
    }
}
</style>

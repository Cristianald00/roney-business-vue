<template>
    <div class="footer-container">
        <footer class="footer-body">
            All rights reserved, 2023 - Roney Technologies Inc.
        </footer>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'FooterCore',
    data() {
        return {
            // Define data properties
            username: '',
            password: '',
        }
    },
    components: {
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

<style lang="scss" scoped>
.footer-container {
    display: block;
    min-height: 300px;
    text-align: center;
    .footer-body {
        display: block;
        padding-top: 200px;
    }
}
</style>

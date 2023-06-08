<template>
    <div class="header-pre-container">
        <img class="header-logo" src="/public/assets/LetterLogoBlack.png" alt="">
        <nav class="header-body">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
        </nav>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'HeaderPreAuthCore',
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
.header-pre-container {
    display: block;
    width: 100%;
    .header-logo {
        display: block;
        width: 100px;
        margin: auto;
        margin-top: 3em;
    }
    .header-body {
        display: inherit;
        width: 100%;
        padding: 1em 3em;
        text-align: right;
        a {
            cursor: pointer;
            padding: 10px 12px;
            margin-right: 1em;
        }
    }
}
</style>

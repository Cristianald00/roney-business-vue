<template>
    <div class="header-container">
        <div class="header-head">
            <img class="header-logo" src="/public/assets/LetterLogoBlack.png" alt="">
        </div>
        <nav class="header-body">
            <div class="header-nav">
                <router-link class="header-nav-item" to="/home"><font-awesome-icon icon="fa-solid fa-gauge" /><span>HOME</span></router-link>
                <router-link class="header-nav-item" to="/expenses"><font-awesome-icon icon="fa-solid fa-receipt" /><span>EXPENSES</span></router-link>
                <router-link class="header-nav-item" to="/outlines"><font-awesome-icon icon="fa-solid fa-sitemap" /><span>OUTLINES</span></router-link>
                <router-link class="header-nav-item" to="/about"><font-awesome-icon icon="fa-solid fa-gauge" /><span>ABOUT</span></router-link>
            </div>
        </nav>
        <div class="header-footer">

        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { userStore } from '../../stores/user'

export default defineComponent({
    name: 'HeaderCore',
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
.header-container {
    display: inline-block;
    width: 10%;
    height: 100vh;
    vertical-align: top;
    box-sizing: border-box;
    border-right: 2px solid #ebe9e9;

    .header-head {
        width: 100%;
        height: 10vh;
        text-align: center;
        .header-logo {
            display: block;
            width: 100px;
            margin: auto;
            margin-top: 2em;
        }
    }

    .header-body {
        display: flex;
        width: 100%;
        height: 80vh;
        align-items: center; /* Vertically center the content */
        justify-content: center; /* Horizontally center the content */
        .header-nav {
            display: block;
            width: 100%;
            padding: 3em 1.5em;
            text-align: left;
            .header-nav-item {
                cursor: pointer;
                display: block;
                padding: 8px 10px;
                margin-bottom: 2em;
                font-weight: 600;
                span {
                    margin-left: 1em;
                }
            }
        }
    }

    .header-footer {
        width: 100%;
        height: 10vh;
        text-align: center;
        .header-logo {
            width: 100px;
        }
    }
}
</style>

<template>
  <main>
    <TheWelcome />
  </main>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { userStore } from '../stores/user'
import TheWelcome from '../components/TheWelcome.vue'

export default defineComponent({
    components: {
        // Import and register any components you want to use
    },
    data() {
        return {
            // Define data properties
            username: '',
            password: '',
        }
    },
    beforeMount() {
        // Lifecycle hook: beforeMount
        // Perform any necessary setup or initialization here
    },
    mounted() {
        // Lifecycle hook: mounted
        // Access the component's DOM element or perform other operations after mounting
        const store = userStore()
        console.log('STORE: ', store)
        console.log('USER: ', store.user)
        console.log('NAME: ', store.user.name)
        console.log('TOKEN: ', store.access_token)
    },
    watch: {
        username(newUsername) {
            // Watcher for username data property
            // React to changes in the username value
        },
        password(newPassword) {
            // Watcher for password data property
            // React to changes in the password value
        },
    },
    methods: {
    },
})
</script>

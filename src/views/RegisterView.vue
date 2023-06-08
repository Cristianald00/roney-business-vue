<template>
    <div>
        <form @submit.prevent="register" data-testid="register-form">
            <input type="text" v-model="name" placeholder="Name" />
            <input type="text" v-model="username" placeholder="Username" />
            <input type="password" v-model="password" placeholder="Password" />
            <button>Register</button>
        </form>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { userStore } from '../stores/user'

export default defineComponent({
    components: {
        // Import and register any components you want to use
    },
    data() {
        return {
            // Define data properties
            name: '',
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
    },
    watch: {
        name(name) {
            // Watcher for username data property
            // React to changes in the username value
            console.log('Name changed:', name)
        },
        username(newUsername) {
            // Watcher for username data property
            // React to changes in the username value
            console.log('Username changed:', newUsername)
        },
        password(newPassword) {
            // Watcher for password data property
            // React to changes in the password value
            console.log('Password changed:', newPassword)
        },
    },
    methods: {
        register() {
            // Method for handling the register action
            const store = userStore()

            console.log('1111')
            store.register(this.name, this.username, this.password)
            .then(() => {
                // Perform any actions after successful register
                this.name = ''
                this.username = ''
                this.password = ''
            })
            .catch((error) => {
                // Handle register error
                console.error('Register error:', error)
            })
        },
    },
})
</script>

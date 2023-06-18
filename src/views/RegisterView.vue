<template>
    <div class="login-container">
        <form @submit.prevent="register" data-testid="register-form" class="login-form">
            <div class="">
                <input type="text" v-model="name" placeholder="Name" />
            </div>
            <div class="">
                <input type="text" v-model="username" placeholder="Email" />
            </div>
            <div class="">
                <input type="password" v-model="password" placeholder="Password" />
            </div>
            <div class="">
                <input type="password" v-model="passwordConfirm" placeholder="Confirm Password" />
            </div>
            <span v-if="error != ''" class="login-error-message">{{ error }}</span>
            <button>Register</button>
        </form>
        <br><br>
        <router-link class="header-nav-item" to="/login"><span>Already registered? Log in</span></router-link>
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
            error: '',
            name: '',
            username: '',
            password: '',
            passwordConfirm: ''
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
        },
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
        register() {
            if ( this.name == '' ) {
                this.error = 'Error: You must enter a name'
                return
            }
            if ( this.username == '' ) {
                this.error = 'Error: You must enter an email'
                return
            }
            if ( this.password == '' ) {
                this.error = 'Error: You must enter a password'
                return
            }
            if ( this.password != this.passwordConfirm ) {
                this.error = 'Error: The paswords do not match'
                return
            }

            // Method for handling the register action
            const store = userStore()
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

<style lang="scss" scoped>
@import '@/styles/LoginContainer.scss';
</style>

<template>
    <div class="login-container">
        <form @submit.prevent="login" data-testid="login-form" class="login-form">
            <div class="">
                <input type="text" v-model="username" placeholder="Username" />
            </div>
            <div class="">
                <input type="password" v-model="password" placeholder="Password" />
            </div>
            <span v-if="error != ''" class="login-error-message">{{ error }}</span>
            <button>Login</button>
        </form>
        <br><br>
        <router-link class="header-nav-item" to="/register"><span>Don't have an account? Sign up</span></router-link>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { userStore } from '../stores/user'
import { organizationStore } from '../stores/organization'
import AuthenticationMixin from '@/mixins/authentication-mixin'

export default defineComponent({
    mixins: [AuthenticationMixin],
    components: {
        // Import and register any components you want to use
    },
    data() {
        return {
            error: '',
            username: '',
            password: ''
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
        login() {
            if ( this.username == '' ) {
                this.error = 'Error: You must enter an email'
                return
            }
            if ( this.password == '' ) {
                this.error = 'Error: You must enter a password'
                return
            }

            // Method for handling the login action
            const store = userStore()
            store.login(this.username, this.password)
            .then( async () => {
                // Perform any actions after successful login
                // Calculate user role
                this.calculateSessionRole()
                // Reset fields
                this.username = ''
                this.password = ''
            })
            .catch((error) => {
                // Handle login error
                console.error('Login error:', error)
            })
        }
    },
})
</script>

<style lang="scss" scoped>
@import '@/styles/LoginContainer.scss';
</style>

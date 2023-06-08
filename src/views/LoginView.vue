<template>
    <div class="login-container">
        <form @submit.prevent="login" data-testid="login-form" class="login-form">
            <div class="">
                <input type="text" v-model="username" placeholder="Username" />
            </div>
            <div class="">
                <input type="password" v-model="password" placeholder="Password" />
            </div>
            <button>Login</button>
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
            // Method for handling the login action
            const store = userStore()
            store.login(this.username, this.password)
            .then(() => {
                // Perform any actions after successful login
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

<style lang="scss" scoped="">
.login-container {
    display: block;
    width: 100%;
    margin-top: 20vh;
    min-height: 70vh;
    text-align: center;

    .login-form {
        display: block;
        margin: auto;
        div {
            display: block;
            margin-bottom: 1em;
            input {
                display: inline-block;
                width: 300px;
                padding: 10px 14px;
                border: 1px solid var(--colorGray);
                border-radius: 5px;
            }
        }
        button {
            cursor: pointer;
            display: block;
            margin: auto;
            width: 300px;
            background: var(--colorLightBlack);
            color: white;
            padding: 10px 14px;
            border: 1px solid var(--colorGray);
            border-radius: 5px;
        }
    }
}
</style>

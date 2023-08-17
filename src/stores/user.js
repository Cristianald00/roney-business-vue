import router from '../router'
import axios from '../plugins/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const userStore = defineStore({
    id: 'user',
    persist: true,
    state: () => ({
        user: null,
        access_token: null,
        role: null
    }),
    getters: {
        doubleCount: (state) => state.counter * 2
    },

    actions: {
        /**
        * Logout and reset states
        */
        async logout() {
            await apiSignOut()
            this.$patch({
                user: null,
                access_token: null
            })
            // Redirect to Dashboard
            router.push('/login')
        },

        /**
        * Attempt to login a user
        */
        async login(user, password) {
            const userData = await apiLogin(user, password)
            this.$patch({
                user: userData.user,
                access_token: userData.token
            })
            // Redirect to Dashboard
            router.replace({ path: '/home' })
        },

        /**
        * Attempt to login a user
        */
        async register(name, username, password) {
            const userData = await apiRegister(name, username, password)
            this.$patch({
                user: userData.user,
                access_token: userData.token
            })
            // Redirect to Dashboard
            router.replace({ path: '/home' })
        },

        /**
        * Attempt to login a user
        */
        async saveRole(role = 4) {
            // Roles:
            // - 1: Superadmin
            // - 2: Admin
            // - 3: Subadmin
            // - 4: Employee
            this.$patch({
                role: role
            })
        },
    },
})

/**
*
* Do register
*
*/
function apiRegister(name, email, password) {
    return axios.post('/api/register', {
        name,
        email,
        password,
    })
    .then( (response) => {
        if (response.status === 201) {
            window.localStorage.setItem( 'user', JSON.stringify(response.data.user) )
            window.localStorage.setItem( 'access_token', response.data.token )
            return response.data;
        }
    })
    .catch((error) => {
        throw new Error('Error registering');
    });
}

/**
*
* Do login
*
*/
function apiLogin(email, password) {
    return axios.post('/api/login', {
        email,
        password,
    })
    .then((response) => {
        if ( response.status === 201 ) {
            window.localStorage.setItem( 'user', JSON.stringify(response.data.user) )
            window.localStorage.setItem( 'access_token', response.data.token )
            return response.data;
        }
    })
    .catch((error) => {
        throw new Error('Invalid credentials');
    });
}

/**
*
* Do logout
*
*/
function apiSignOut() {
    return axios.get('/api/logout')
    .then( (response) => {
        window.localStorage.removeItem('access_token')
		window.localStorage.removeItem('tokenExpiration')
		window.localStorage.removeItem('user')
    })
    .catch((error) => {
        throw new Error('Invalid credentials');
    });
}

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(userStore, import.meta.hot))
}

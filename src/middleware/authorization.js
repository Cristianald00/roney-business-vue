import { userStore } from '../stores/user'
import { onMounted, onUnmounted, ref } from 'vue'

export default function authorizationMiddleware(to, from, next) {

	const allowsPublicAccess = to.meta.allowsPublicAccess
	let requiresAuth = to.meta.requiresAuth

	const theUserStore = userStore()
	const isTokenSet = theUserStore.access_token

	if ( !allowsPublicAccess && !requiresAuth ) {
		// If neither allowsPublicAccess nor requiresAuth is defined, assume authentication is required
		requiresAuth = true
	}

	if ( requiresAuth && !isTokenSet && to.name !== 'login' ) {
		// If authentication is required and the user is not authenticated, redirect to login
		next({ name: 'login' })

	} else {
		// Continue to the next route
		next()
	}

}

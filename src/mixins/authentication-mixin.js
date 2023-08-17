import { userStore } from '../stores/user'
import { organizationStore } from '../stores/organization'

export default {
	components: {
	},
	data() {
		return {
		}
	},
	computed: {
	},
	methods: {
		async calculateSessionRole() {
            // Load organization users and current session user
            const theOrganizationStore = organizationStore()
            const currentOrganizationId = userStore().user.current_organization
            await theOrganizationStore.listOrganizationUsers(currentOrganizationId)
            const organizationUsers = theOrganizationStore.organizationUsers
            const currentUser = userStore().user

            // Loop and match user with current session
            let role = 4 // By default 'Employee'
            const currentUserData = { ...currentUser } // Clone the user object
            for (const user of organizationUsers) {
                if (user.id == currentUserData.id && user.pivot.is_owner) {
                    role = 2 // 'Admin' role
                }
            }
            // Save session role
            userStore().saveRole(role)
        },
	}
}

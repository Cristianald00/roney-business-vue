import axios from '../plugins/axios'
import { userStore } from '../stores/user'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const organizationStore = defineStore({
    id: 'organization',
    persist: true,
    state: () => ({
        organization: null,
        organizations: [],
        organizationUsers: []
    }),

    actions: {

        /**
        * Show organization
        */
        async show(id) {
            if (id) {
                const organizationData = await apiOrganizationShow(id)
                let organization = organizationData.organization

                // Update states
                this.$patch({
                    organization: organization
                })
            }
        },

        /**
        * List organizations
        */
        async list() {
            const organizationData = await apiOrganizationList()
            let organizations = organizationData.organizations

            // Update states
            this.$patch({
                organizations: organizations
            })
        },

        /**
        * Create organizations
        */
        async create(payload) {
            const organizationData = await apiOrganizationCreate(payload)
            const organizations = this.organizations
            const organization = organizationData['organization']
            organizations.push(organization)

            // Update user with new org
            const theUserStore = userStore()
            theUserStore.user.current_organization = organization.id

            // Update states
            this.$patch({
                organizations: organizations,
                organization: organization
            })
        },

        /**
        * Make organization the current one
        */
        async makeCurrent(id) {
            const organizationData = await apiOrganizationMakeCurrent(id)
            const organization = organizationData['organization']

            // Update user with current org
            const theUserStore = userStore()
            theUserStore.user.current_organization = organization.id

            // Update states
            this.$patch({
                organization: organization
            })
        },


        // ORGANIZATION USERS apis

        /**
        * List Organization Users
        */
        async listOrganizationUsers(id) {
            const organizationData = await apiListOrganizationUsers(id)
            const organizationUsers = organizationData['organizationUsers']

            // Update states
            this.$patch({
                organizationUsers: organizationUsers
            })
        },

        /**
        * Add user to organization
        */
        async addUser(orgId, email) {
            const organizationData = await apiOrganizationAddUser(orgId, email)
            const organizationUsers = organizationData['organizationUsers']

            // Update states
            this.$patch({
                organizationUsers: organizationUsers
            })
        },

        /**
        * Remove user from organization
        */
        async removeUser(orgId, userId) {
            const organizationData = await apiOrganizationRemoveUser(orgId, userId)
            const organizationUsers = organizationData['organizationUsers']

            // Update states
            this.$patch({
                organizationUsers: organizationUsers
            })
        },
    },
})

/**
* Api Requests
*/

function apiOrganizationShow(id) {
    return axios.get('/api/organizations/' + id)
    .then( (response) => {
        if (response.status === 200) {
            return response.data.data
        }
    })
    .catch((error) => {
        throw new Error('Error listing teams');
    });
}

function apiOrganizationList() {
    const page = 1
    return axios.get('/api/organizations', {
        page
    })
    .then( (response) => {
        if (response.status === 200) {
            return response.data.data
        }
    })
    .catch((error) => {
        throw new Error('Error listing teams');
    });
}

function apiOrganizationCreate(payload) {
    return axios.post('/api/organizations', payload)
    .then( (response) => {
        if (response.status === 200) {
            return response.data.data
        }
    })
    .catch((error) => {
        throw new Error('Error creating team');
    });
}

function apiOrganizationMakeCurrent(id) {
    return axios.get('/api/organizations/makeCurrent/' + id)
    .then( (response) => {
        if (response.status === 200) {
            return response.data.data
        }
    })
    .catch((error) => {
        throw new Error('Error creating team');
    });
}

// ORGANIZATION USERS apis

function apiListOrganizationUsers(organization_id) {
    return axios.get('/api/organizationUsers/' + organization_id)
    .then( (response) => {
        if (response.status === 200) {
            return response.data.data
        }
    })
    .catch((error) => {
        throw new Error('Error listing teams');
    });
}

function apiOrganizationAddUser(orgId, email) {
    return axios.post('/api/organizationUsers/' + orgId, {
        email: email
    })
    .then( (response) => {
        if (response.status === 200) {
            return response.data.data
        }
    })
    .catch((error) => {
        throw new Error('Error creating team');
    });
}

function apiOrganizationRemoveUser(orgId, userId) {
    return axios.delete('/api/organizationUsers/' + orgId + '/user/' + userId)
    .then( (response) => {
        if (response.status === 200) {
            return response.data.data
        }
    })
    .catch((error) => {
        throw new Error('Error creating team');
    });
}

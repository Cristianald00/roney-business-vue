import axios from '../plugins/axios'
import { userStore } from '../stores/user'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const organizationStore = defineStore({
    id: 'organization',
    persist: true,
    state: () => ({
        organization: null,
        organizations: []
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

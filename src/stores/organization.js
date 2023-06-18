import axios from '../plugins/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const organizationStore = defineStore({
    id: 'organization',
    persist: true,
    state: () => ({
        organization: null,
        organizations: null
    }),

    actions: {
        /**
        * List organizations
        */
        async list() {
            const organizationData = await apiOrganizationList()
            let organizations = organizationData.organizations
            let organization = null

            organizations.forEach( (item) => {
                // Set is_selected putline as main organization state
                if ( item.is_selected == true ) {
                    organization = item
                }
            })

            // Update states
            this.$patch({
                organizations: organizations,
                organization: organization
            })
        },
        /**
        * Create organizations
        */
        async create(payload) {
            const organizationData = await apiOrganizationCreate(payload)
            let organizations = organizationData.organizations

            // Update states
            this.$patch({
                organizations: organizations
            })
        },
    },
})

/**
* Api Requests
*/

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

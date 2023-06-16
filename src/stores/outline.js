import axios from '../plugins/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useOutlineStore = defineStore({
    id: 'outline',
    persist: true,
    state: () => ({
        outline: null,
        outlines: null
    }),

    actions: {
        /**
        * List outlines
        */
        async list() {
            const outlineData = await apiOutlineList()
            let outlines = outlineData.outlines
            let outline = null

            outlines.forEach( (item) => {
                // Set is_selected putline as main outline state
                if ( item.is_selected == true ) {
                    outline = item
                }
            })

            // Update states
            this.$patch({
                outlines: outlines,
                outline: outline
            })
        },
        /**
        * Create outlines
        */
        async create(payload) {
            const outlineData = await apiOutlineCreate(payload)
            let outlines = outlineData.outlines

            // Update states
            this.$patch({
                outlines: outlines
            })
        },
    },
})

/**
* Api Requests
*/

function apiOutlineList() {
    const page = 1
    return axios.get('/api/outlines', {
        page
    })
    .then( (response) => {
        if (response.status === 200) {
            return response.data.data
        }
    })
    .catch((error) => {
        throw new Error('Error registering');
    });
}

function apiOutlineCreate(payload) {
    return axios.post('/api/outlines', payload)
    .then( (response) => {
        if (response.status === 200) {
            return response.data.data
        }
    })
    .catch((error) => {
        throw new Error('Error registering');
    });
}

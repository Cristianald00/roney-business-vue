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
            // Sanitize outlines and include computed properties
            outlines = outlines.map( (outline) => ({
                ...outline,
                isSelected: false
            }))
            // Update states
            this.$patch({
                outlines: outlines
            })
        },
    },
})

/**
*
* Do register
*
*/
function apiOutlineList() {
    const page = 1
    return axios.get('/api/outlines', {
        page
    })
    .then( (response) => {
        if (response.status === 200) {
            return response.data.data;
        }
    })
    .catch((error) => {
        throw new Error('Error registering');
    });
}

import router from '../router'
import axios from '../plugins/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const outlineStore = defineStore({
    id: 'outline',
    persist: true,
    state: () => ({
        outline: null,
        outlines: []
    }),

    actions: {
        /**
        * Show organization
        */
        async show(id) {
            if (id) {
                const outlineData = await apiOutlineShow(id)
                let outline = outlineData.outline

                // Update states
                this.$patch({
                    outline: outline
                })
            }
        },

        /**
        * List outlines
        */
        async list() {
            const outlineData = await apiOutlineList()
            let outlines = outlineData.outlines
            let outline = null

            if (outlines) {
                outlines.forEach( (item) => {
                    // Set is_selected putline as main outline state
                    if ( item.is_selected == true ) {
                        outline = item
                    }
                })
            } else {
                outlines = []
            }

            // Update states
            this.$patch({
                outlines: outlines,
                outline: outline
            })
        },

        /**
        * Create outlines
        */
        async update(id, payload) {
            const outlineData = await apiOutlineUpdate(id, payload)
            let outlines = this.outlines
            let outline = outlineData.outline

            // Update outlines
            if ( outlines ) {
                outlines.forEach( (item) => {
                    // Set is_selected putline as main outline state
                    if ( item.id == outline.id ) {
                        outline = item
                    }
                })
            } else {
                outlines = []
            }

            // Update states
            this.$patch({
                outline: outline,
                outlines: outlines
            })
        },

        /**
        * Create outlines
        */
        async create(payload) {
            const outlineData = await apiOutlineCreate(payload)
            let outline = outlineData.outline

            // Include into existing outlines
            const outlines = this.outlines
            if ( !outlines ) {
                outlines = []
            }
            outlines.push(outline)

            // Update states
            this.$patch({
                outline: outline,
                outlines: outlines
            })

            // Redirect back to Expenses
            router.push('/expenses')
        },
    },
})

/**
* Api Requests
*/

function apiOutlineShow(id) {
    return axios.get('/api/outlines/' + id)
    .then( (response) => {
        if (response.status === 200) {
            return response.data.data
        }
    })
    .catch((error) => {
        throw new Error('Error showing outline');
    });
}

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
        throw new Error('Error listing outlines');
    });
}

function apiOutlineUpdate(id, payload) {
    return axios.put('/api/outlines/' + id, payload)
    .then( (response) => {
        if (response.status === 200) {
            return response.data.data
        }
    })
    .catch((error) => {
        throw new Error('Error updating outline');
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
        throw new Error('Error creating outline');
    });
}

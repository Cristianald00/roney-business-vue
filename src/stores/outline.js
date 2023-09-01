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
        async list(moduleType = null) {
            const outlineData = await apiOutlineList(moduleType)
            let outlines = outlineData.outlines
            let outline = null

            if (outlines) {
                const firstOutline = outlines[0] // In case non selected, make this default
                outlines.forEach( (item) => {
                    // Set is_selected outline as main outline state
                    if ( item.is_selected == true ) {
                        outline = item
                    }
                })
                if (!outline && firstOutline) {
                    firstOutline.is_selected = true
                    outline = firstOutline
                }
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
        * Update outlines
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
            let outlines = this.outlines
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

function apiOutlineList(moduleType = null) {
    const page = 1
    const params = {
        page,
        moduleType, // Include moduleType as a query parameter
    }
    return axios.get('/api/outlines', {
        params: params,
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

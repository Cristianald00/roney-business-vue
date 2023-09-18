import axios from '../plugins/axios'
import { outlineStore } from '../stores/outline'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { paginationStore } from '../stores/pagination'

export const timesheetStore = defineStore({
    id: 'timesheet',
    persist: true,
    state: () => ({
        timesheet: null,
        timesheets: []
    }),

    actions: {
        /**
        * List timesheets
        */
        async list(outlineId, pagination, filters = null) {
            const timesheetData = await apiTimesheetList(outlineId, pagination, filters)
            const timesheets = timesheetData.timesheets

            // Update Pagination Store
            const thePaginStore = paginationStore()
            thePaginStore.orderBy = timesheetData.order_by
            thePaginStore.page = timesheetData.page
            thePaginStore.pageQty = timesheetData.page_qty
            thePaginStore.pageLast = timesheetData.page_last
            thePaginStore.pageTotal = timesheetData.page_total

            // Update states
            this.$patch({
                timesheets: timesheets
            })
        },

        /**
        * Update timesheet
        */
        async update(payload) {
            const timesheetData = await apiTimesheetUpdate(payload)

            // Update Outline Store
            const theOutlineStore = outlineStore()
            theOutlineStore.outline = timesheetData['outline']
            const outlines = theOutlineStore.outlines

            // Replace outline object with matching ID
            const timesheetOutline = timesheetData['outline']
            const updatedOutlines = outlines.map(outline => {
                if (outline.id == timesheetOutline.id) {
                    timesheetOutline.is_selected = true
                    return timesheetOutline
                }
                return outline
            })
            theOutlineStore.outlines = updatedOutlines

            // The timesheets list is automatically being refreshed
        },

        /**
        * Create timesheet
        */
        async create(payload) {
            const timesheetData = await apiTimesheetCreate(payload)

            // Update Outline Store
            const theOutlineStore = outlineStore()
            theOutlineStore.outline = timesheetData['outline']
            const outlines = theOutlineStore.outlines

            // Replace outline object with matching ID
            const timesheetOutline = timesheetData['outline']
            const updatedOutlines = outlines.map(outline => {
                if (outline.id == timesheetOutline.id) {
                    timesheetOutline.is_selected = true
                    return timesheetOutline
                }
                return outline
            })
            theOutlineStore.outlines = updatedOutlines

            // Update stores
            const timesheet = timesheetData['timesheet']
            this.timesheets.push(timesheet)
            this.$patch({
                timesheets: this.timesheets
            })
        },
    },
})

/**
* Api Requests
*/

function apiTimesheetList(outlineId, pagination = null, filters = null) {
    return axios.get('/api/timesheets', {
        params: {
            pagination,
            filters,
            outlineId
        }
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

function apiTimesheetUpdate(payload) {
    return axios.put('/api/timesheets/' + payload.id , payload)
    .then( (response) => {
        if (response.status === 200) {
            return response.data.data
        }
    })
    .catch((error) => {
        throw new Error('Error updating timesheet');
    });
}

function apiTimesheetCreate(payload) {
    return axios.post('/api/timesheets', payload)
    .then( (response) => {
        if (response.status === 200) {
            return response.data.data
        }
    })
    .catch((error) => {
        throw new Error('Error creating timesheet');
    });
}

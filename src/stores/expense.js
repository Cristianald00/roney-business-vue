import axios from '../plugins/axios'
import { outlineStore } from '../stores/outline'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { paginationStore } from '../stores/pagination'

export const expenseStore = defineStore({
    id: 'expense',
    persist: true,
    state: () => ({
        expense: null,
        expenses: []
    }),

    actions: {
        /**
        * List expenses
        */
        async list(outlineId, pagination) {
            const expenseData = await apiExpenseList(outlineId, pagination)
            const expenses = expenseData.expenses

            // Update Pagination Store
            const thePaginStore = paginationStore()
            thePaginStore.orderBy = expenseData.order_by
            thePaginStore.page = expenseData.page
            thePaginStore.pageQty = expenseData.page_qty
            thePaginStore.pageLast = expenseData.page_last
            thePaginStore.pageTotal = expenseData.page_total

            // Update states
            this.$patch({
                expenses: expenses
            })
        },
        /**
        * Create expense
        */
        async create(payload) {
            const expenseData = await apiExpenseCreate(payload)

            // Update Outline Store
            const outlineStore = outlineStore()
            outlineStore.outline = expenseData['outline']
            const outlines = outlineStore.outlines

            // Replace outline object with matching ID
            const expenseOutline = expenseData['outline']
            const updatedOutlines = outlines.map(outline => {
                if (outline.id == expenseOutline.id) {
                    expenseOutline.is_selected = true
                    return expenseOutline
                }
                return outline
            })
            outlineStore.outlines = updatedOutlines

            // Update stores
            const expense = expenseData['expense']
            this.expenses.push(expense)
            this.$patch({
                expenses: this.expenses
            })
        },
    },
})

/**
* Api Requests
*/

function apiExpenseList(outlineId, pagination = null) {
    return axios.get('/api/expenses', {
        params: {
            pagination,
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

function apiExpenseCreate(payload) {
    return axios.post('/api/expenses', payload)
    .then( (response) => {
        if (response.status === 200) {
            return response.data.data
        }
    })
    .catch((error) => {
        throw new Error('Error registering');
    });
}

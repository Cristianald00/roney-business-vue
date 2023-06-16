import axios from '../plugins/axios'
import { useOutlineStore } from '../stores/outline'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useExpenseStore = defineStore({
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
        async list(outlineId) {
            const expenseData = await apiExpenseList(outlineId)
            const expenses = expenseData.expenses
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

            // Update other stores
            const outlineStore = useOutlineStore()
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

function apiExpenseList(outlineId) {
    const page = 1
    return axios.get('/api/expenses', {
        params: {
            page,
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

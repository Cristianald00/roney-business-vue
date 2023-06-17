import axios from '../plugins/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const usePaginationStore = defineStore({
    id: 'pagination',
    persist: true,
    state: () => ({
        orderBy: null,
        page: 1,
        pageQty: 25,
        pageLast: null,
        pageTotal: 0
    }),

    actions: {
        /**
        * List expenses
        */
        async list(outlineId, pagination) {
            // const expenseData = await apiExpenseList(outlineId, pagination)
            // const expenses = expenseData.expenses
            // // Update states
            // this.$patch({
            // expenses: expenses
            // })
        },
    },
})

import axios from '../plugins/axios'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useExpenseStore = defineStore({
    id: 'expense',
    state: () => ({
        name: 'Eduardo',
        isAdmin: true,
    }),

    actions: {
        /**
        * List expenses
        */
        async list() {
            const expenseData = await apiExpenseList()
            console.log('expenseData DATA')
            console.log(expenseData)
            // this.$patch({
            //     name: user,
            //     ...userData,
            // })
        },
    },
})

/**
*
* Do register
*
*/
function apiExpenseList() {
    console.log('Starting apiExpenseList')
    const page = 1
    return axios.get('/api/expenses', {
        page
    })
    .then( (response) => {
        console.log("Response")
        console.log( response )

        if (response.status === 201) {

        }
    })
    .catch((error) => {
        throw new Error('Error registering');
    });
}

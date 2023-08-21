import TableComponent from '@/components/common/TableComponent.vue'
import PaginationComponent from '@/components/common/PaginationComponent.vue'
import GroupsNavigationComponent from '@/components/common/GroupsNavigationComponent.vue'

export default {
	components: {
        TableComponent,
        PaginationComponent,
        GroupsNavigationComponent
    },
	data() {
        return {
			newItem: {
				name: '',
				description: '',
				user: '',
				total: null,
				date: new Date().toISOString().slice(0, 10)
			},
			// Table Data
			isTableLoading: false,
			// Pagination Data
			pagination: {
				from: 0,
				to: 49,
				total: 50,
				current_page: 1,
				last_page: 2
			},
			canModifyPage: true,
			perPage: 50,
			tableType: 'wide',
			keyword: ''
        }
    },
	computed: {
	},
	methods: {
		handleRowClick(id) {
			// this.$router
			// .push({
			// path: '/documents/' + id + '/' + this.sidebarViewDefault
			// })
			// .catch((err) => err)
		},
		sortTable(header) {
			// Sorting code goes here
		},
		onPageChange(payload) {
            const paginationPayload = {
                'page': payload.page,
                'per_page': payload.per_page.id ?? payload.per_page
            }

            // Determine first or last item
            const firstItem = this.timesheets[0]
            const latestItem = this.timesheets[this.timesheets.length - 1]
            if ( payload.pageDirection == 'previous' ) {
                paginationPayload.page_last = firstItem ? firstItem.id : null
            } else {
                paginationPayload.page_last = latestItem ? latestItem.id : null
            }

			// Continue page change
			this.goChangePage(paginationPayload)
		}
	}
}

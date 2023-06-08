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
				total: 0,
				date: ''
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
		onPageChange(pagePayload) {
			// Do on page change .. maybe filters?
		},
	}
}

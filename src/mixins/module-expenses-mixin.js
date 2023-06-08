import { defineComponent, ref } from 'vue'

export default defineComponent ({
	data() {
        return {
            headers: [
				{
					id: 1,
					text: 'Date',
					align: 'left',
					sortable: false,
					value: '',
					visible: true
				},
				{
					id: 2,
					text: 'Name',
					align: 'left',
					sortable: true,
					value: 'name',
					visible: true
				},
				{
					id: 3,
					text: 'Description',
					align: 'left',
					sortable: false,
					value: 'email',
					visible: true
				},

				{
					id: 4,
					text: 'User',
					align: 'left',
					sortable: false,
					value: 'primary_role_name',
					visible: true
				},
				{
					id: 5,
					text: 'Total',
					align: 'right',
					sortable: false,
					value: 'is_active',
					visible: true
				},
				{
					id: 6,
					text: '.',
					align: 'right',
					sortable: false,
					value: 'is_active',
					visible: true
				}
			],
        }
    },
	methods: {
	}
})

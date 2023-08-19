import { defineComponent, ref } from 'vue'

export default defineComponent ({
	data() {
        return {
        }
    },
	computed: {
		textForCreateOutline() {
			const texts = {
				expense: 'Create Expense Group',
				timesheet: 'Create Timesheet Group'
			}
			return texts[this.moduleType] || ''
		},
		textForConfigurarionsTitle() {
			return 'Settings'
		},
		textForParentGroups() {
			const outlineName = this.outline.name ?? ''
			const texts = {
				timesheet: 'Select the target timesheets for repeated entries. For example, when adding to ' + outlineName
				+ ', it will automatically sync with other relevant timesheets, ensuring consistency across lists. You can use this to automatically combine many users timesheets in one.'
			}
			return texts[this.moduleType] || ''
		},
		textForParentGroupsTitle() {
			return 'Parent Timesheets'
		}
	},
	methods: {
	}
})

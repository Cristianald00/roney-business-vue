<template>
	<div>
		<div class="paginationType" :class="tableType">
			<span class="items-per-page-label" v-if="canModifyPage">TITLE_PER_PAGE</span>
			<DropdownAutoloadComponent
				v-if="canModifyPage"
				customClass="tiny-narrow"
				:options="perpageOption"
				:disabled="false"
				placeholder="-"
				v-model="currentPerPage"
			/>
			<span class="items-on-page-label">
				{{ pagination.from }} - {{ pagination.to }}
				DETAILS_OF {{ pagination.total }}
			</span>
			<IconButtonComponent
				@onAction="onClickPreviousPage()"
				:disabled="isInFirstPage"
				icon="fa-solid fa-angle-left"
			/>

			<IconButtonComponent
				@onAction="onClickNextPage()"
				:disabled="isInLastPage"
				icon="fa-solid fa-angle-right"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PaginationComponent',
	props: {
		pagination: {
			type: Object,
			required: true
		},
		canModifyPage: {
			type: Boolean,
			required: false,
			default: true
		},
		perPage: {
			type: Number,
			required: true
		},
		tableType: {
			type: String,
			required: true
		},
		keyword: {
			type: String,
			required: false
		}
	},
	computed: {
		isInFirstPage() {
			return this.pagination.current_page === 1
		},
		isInLastPage() {
			return this.pagination.current_page === this.pagination.last_page
		}
	},
	data() {
		return {
			perpageOption: [
				{
					id: 10,
					name: '10'
				},
				{
					id: 20,
					name: '20'
				},
				{
					id: 25,
					name: '25'
				}
			],
			currentPerPage: 10
		}
	},
	methods: {
		onClickPreviousPage() {
			const payload = {
				page: this.pagination.current_page - 1,
				per_page: this.currentPerPage,
				keyword: this.keyword
			}
			this.$emit('pagechanged', payload)
		},
		onClickNextPage() {
			const payload = {
				page: this.pagination.current_page + 1,
				per_page: this.currentPerPage,
				keyword: this.keyword
			}
			this.$emit('pagechanged', payload)
		},
		changePerPage() {
			const payload = {
				page: this.pagination.current_page,
				per_page: this.currentPerPage,
				keyword: this.keyword
			}
			this.$emit('pagechanged', payload)
		}
	},
	watch: {
		perPage: function () {
			this.currentPerPage = this.$props.perPage
		},
		currentPerPage: function (val) {
			if (this.perPage !== val) {
				this.changePerPage()
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.items-per-page-label {
	font-weight: 500;
	font-size: 15px/26px;
	margin-right: 1em;
}
.items-on-page-label {
	font: normal normal normal 15px/26px Montserrat;
	margin-left: 2em;
	margin-right: 0.5em;
}
.paginationType.small {
	float: right;
}
</style>

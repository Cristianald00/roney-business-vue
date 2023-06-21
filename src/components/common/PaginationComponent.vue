<template>
	<div>
		<div class="paginationType" :class="tableType">
			<IconButtonComponent
				v-if="!isInFirstPage"
				@onAction="onClickPreviousPage()"
				:disabled="isInFirstPage"
				icon="fa-solid fa-angle-left"
				customClass=""
			/>
			<span class="items-on-page-label">
				{{ page }}
			</span>
			<IconButtonComponent
				@onAction="onClickNextPage()"
				:disabled="isInLastPage"
				icon="fa-solid fa-angle-right"
				customClass=""
			/>
			<span class="items-per-page-label" v-if="canModifyPage">Per page</span>
			<DropdownAutoloadComponent
				v-if="canModifyPage"
				customClass="tiny-narrow"
				:options="perpageOption"
				:disabled="false"
				placeholder="-"
				:value="currentPerPage"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PaginationComponent',
	props: {
		canModifyPage: {
			type: Boolean,
			required: false,
			default: true
		},
		keyword: {
			type: String,
			required: false
		},
		pagination: {
			type: Object,
			required: true
		},
		page: {
			type: Number,
			required: true
		},
		pageQty: {
			type: Number,
			required: true
		},
		pageTotal: {
			type: Number,
			required: false,
			default: 0
		},
		tableType: {
			type: String,
			required: true
		}
	},
	computed: {
		isInFirstPage() {
			return this.page < 2
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
			currentPerPage: 25
		}
	},
	methods: {
		onClickPreviousPage() {
			console.log('222');
			const payload = {
				pageDirection: 'previous',
				page: this.pagination.current_page > 1 ? this.pagination.current_page - 1 : 1,
				per_page: this.currentPerPage,
				keyword: this.keyword
			}
			this.$emit('onPageChange', payload)
		},
		onClickNextPage() {
			const payload = {
				pageDirection: 'next',
				page: this.pagination.current_page + 1,
				per_page: this.currentPerPage,
				keyword: this.keyword
			}
			this.$emit('onPageChange', payload)
		},
		changePerPage() {
			const payload = {
				page: this.pagination.current_page,
				per_page: this.currentPerPage,
				keyword: this.keyword
			}
			this.$emit('onPageChange', payload)
		}
	},
	watch: {
		pageQty: function () {
			console.log('PER PAGE: ', this.pageQty)
			this.currentPerPage = this.pageQty
		},
		currentPerPage: function (val) {
			if (this.pageQty !== val) {
				this.changePerPage()
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.paginationType {
	padding-top: 10px;
}
.items-per-page-label {
	font-weight: 500;
	font-size: 15px/26px;
	margin-left: 2em;
	margin-right: 1em;
}
.items-on-page-label {
	text-align: center;
	padding-right: 1em;
	font: normal normal normal 15px/26px Montserrat;
}
.paginationType.small {
	float: right;
}
.icon-button-component {
	display: inline-block;
}
</style>

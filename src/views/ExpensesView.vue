<template>
    <div class="module-view-container">
        <!-- SECTION: Header -->
        <GroupsNavigationComponent
            :groups="outlines"
            @onClicked="onNavGroupClicked"
            @onClickedAddNew="goCreateNewGroup"
        />

        <!-- SECTION: Center -->
        <div class="module-view-center">

            <div class="module-group-options">
                <IconButtonComponent
    				icon="fa-solid fa-gear"
                    title="Manage Group"
                    helper="Manage Group"
                    :selected="false"
    				customClass=""
                    @onAction="goManageGroup"
    			/>
            </div>

            <!-- SECTION: List Options -->
            <div class="module-list-options">
                <IconButtonComponent
                    v-if="!isDisplayCreateForm"
    				icon="fa-solid fa-plus"
                    title="New Expense"
                    :selected="false"
    				customClass=""
                    @onAction="isDisplayCreateForm = true"
    			/>
            </div>

            <!-- SECTION: Create item -->
            <div v-if="isDisplayCreateForm" class="module-group-create-form">
                <InputComponent
					id="item-name-input"
					name="item-name-input"
					placeholder="Expense Name"
                    customClass="medium"
                    :value="newItem.name"
                    @input="newItem.name = $event.target.value"
				/>
                <span class="form-horiz-spacer"></span>
                <DatePickerComponent
					id="item-date-input"
					name="item-date-input"
					placeholder="Date"
                    :value="newItem.date"
                    custom-class="medium"
                    @input="newItem.date = $event.target.value"
				/>
                <span class="form-horiz-spacer"></span>
                <DropdownAutoloadComponent
    				:options="users"
    				:disabled="false"
    				placeholder="Select User"
                    :value="newItem.user"
                    @onValueChanged="newItem.user = $event"
    			/>
                <span class="form-vertical-spacer"></span>
                <InputComponent
					id="item-total-input"
					name="item-total-input"
					placeholder="Total (0.00)"
                    customClass="medium"
                    :value="newItem.total"
                    @input="newItem.total = $event.target.value"
				/>
                <span class="form-horiz-spacer"></span>
                <InputComponent
					id="item-desc-input"
					name="item-desc-input"
					placeholder="Description"
                    customClass="default"
                    :value="newItem.description"
                    @input="newItem.description = $event.target.value"
				/>
                <span class="form-vertical-spacer"></span>
                <SubmitButtonComponent
                    :title="'CREATE'"
                    customClass="default"
                    @onAction="goCreateExpense"
                />
                <span class="form-horiz-spacer"></span>
                <SubmitButtonComponent
                    :title="'CLOSE'"
                    customClass="default gray-submit"
                    @onAction="isDisplayCreateForm = false"
                />
            </div>

            <!-- SECTION: Items List -->
            <TableComponent>
				<template v-slot:head>
					<th
						v-for="header in headers"
						:key="header.id"
						:loading="isTableLoading"
                        :class="{
                            column_sort: header.sortable
                        }"
                        :style="header.align == 'right' ? 'text-align: right' : 'text-align: left'"
						@click="sortTable(header)"
					>
						{{ header.text }}
						<span v-if="header.sortable">
							<i v-if="true" class="fa-solid fa-chevron-down" ></i>
							<i v-if="false" class="fa-solid fa-chevron-up" ></i>
							<i v-else class="fa-solid fa-sort"></i>
						</span>
					</th>
				</template>

				<template v-slot:body>
					<tr
						v-for="item in expenses"
						:key="item.id"
						@click="handleRowClick(item.id)"
					>
						<td>{{ item.date }}</td>
						<td style="font-weight: 500;">{{ item.name }}</td>
                        <td>{{ item.description }}</td>
						<td>{{ item.user_name }}</td>
                        <td class="cell-type-currency">{{ convertNumberToCurrency(item.total) }}</td>
                        <td class="cell-type-menu"><font-awesome-icon icon="fa-solid fa-caret-down" /></td>
					</tr>
				</template>
				<template v-slot:footer-content>
					<tr>
						<td colspan="100%">
							<PaginationComponent
								:pagination="pagination"
                                :page="page"
                                :pageTotal="pageTotal"
								:pageQty="pageQty"
								:keyword="keyword"
								:tableType="tableType"
								@onPageChange="goChangePage"
							/>
						</td>
					</tr>
				</template>
			</TableComponent>

        </div>

        <!-- SECTION: Right -->
        <div class="module-view-right">
            <div v-if="outline" class="module-summary">
                <h2>{{ outline.name }}</h2><br><br>
                <span class="summary-label">Total:</span>
                <span class="summary-value">{{ convertNumberToCurrency(outline.total) }}</span>
                <span class="summary-label">Total this Month: {{ pageTotal }}</span>
                <span class="summary-value">{{ convertNumberToCurrency(outline.current_month_total) }}</span>
            </div>
        </div>

    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { expenseStore } from '../stores/expense'
import { outlineStore } from '../stores/outline'
import { paginationStore } from '../stores/pagination'
import GlobalHelpersMixin from '@/mixins/global-helpers-mixin'
import ModuleListingMixin from '@/mixins/module-listing-mixin'
import ModuleExpensesMixin from '@/mixins/module-expenses-mixin'

export default defineComponent({
    name: 'ExpensesView',
    mixins: [GlobalHelpersMixin, ModuleListingMixin, ModuleExpensesMixin],
    components: {
    },
    data() {
        return {
            // Define data properties
            name: '',
            isDisplayCreateForm: false,
            users: [
                {
                    id: 1,
                    name: 'Cristian'
                },
                {
                    id: 2,
                    name: 'Other'
                }
            ]
        }
    },
    computed: {
        expenses() {
			return expenseStore().expenses
		},
        outline() {
			return outlineStore().outline
		},
        outlines() {
			return outlineStore().outlines
		},
        orderBy() {
			return paginationStore().orderBy
		},
        page() {
			return paginationStore().page
		},
        pageQty() {
			return paginationStore().pageQty
		},
        pageLast() {
			return paginationStore().pageLast
		},
        pageTotal() {
			return paginationStore().pageTotal
		}
    },
    watch: {
        outlines(newOutlinesVal) {
            newOutlinesVal.forEach( (item) => {
                if ( item.is_selected == true ) {
                    this.loadExpenses(item.id)
                }
            })
        },
        ['newItem']: {
			handler: function () {
                //Watch newExpense change
			},
			deep: true
		}
    },
    methods: {
        goChangePage(payload) {
            console.log('clicked');
            const paginationPayload = payload
            const firstItem = this.expenses[0]
            const latestItem = this.expenses[this.expenses.length - 1]
            if ( payload.pageDirection == 'previous' ) {
                paginationPayload.page_last = firstItem ? firstItem.id : null
            } else {
                paginationPayload.page_last = latestItem ? latestItem.id : null
            }
            this.loadExpenses( this.outline.id, paginationPayload)
        },
        goCreateNewGroup() {
            this.$router.push('/outlines?action=new')
        },
        goCreateExpense() {
            const store = expenseStore()
            this.outlines.forEach( (outline) => {
                // Set is_selected to false for all other items
                if ( outline.is_selected == true ) {
                    const payload = this.newItem
                    payload.user_id = this.newItem.user.id
                    payload.user_name = this.newItem.user.name
                    payload.outline_id = outline.id
                    store.create(payload)
                    // Reset
                    this.newItem = {
        				name: '',
        				description: '',
        				user: '',
        				total: 0,
        				date: new Date().toISOString().slice(0, 10)
        			}
                }
            })
        },
        goManageGroup() {
            // console.log('Manage group')
        },
        loadExpenses(outlineId, paginationPayload = null) {
            const store = expenseStore()
            const pagination = {
                order_by: 'key',
                page_qty: paginationPayload ? paginationPayload.per_page : 25,
                page_last: paginationPayload ? paginationPayload.page_last : null,
                page: paginationPayload ? paginationPayload.page : 1
            }

            store.list(outlineId, pagination)
        },
        loadOutlines() {
            const store = outlineStore()
            store.list()
        },
        onNavGroupClicked(group) {
            const store = outlineStore()
            this.outlines.forEach( (item) => {
                // Set is_selected to false for all other items
                if ( item !== group ) {
                    item.is_selected = false
                }
                // Load expenses for selected items
                else {
                    item.is_selected = true
                    store.outline = item
                    this.loadExpenses(group.id) // Load outline expenses
                }
            })
        }
    },
    beforeMount() {
        // Lifecycle hook: beforeMount
        // Perform any necessary setup or initialization here
    },
    mounted() {
        this.loadOutlines()
    },
})
</script>

<style lang="scss" scoped>
@import '@/styles/ModuleViewContainer.scss';
</style>

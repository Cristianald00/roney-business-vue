<template>
    <div class="module-view-container">
        <!-- SECTION: Header -->
        <GroupsNavigationComponent
            :groups="groups"
            @onClicked="onNavGroupClicked"
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

            <!-- SECTION: Create item -->
            <div class="module-group-create-form">
                <InputComponent
					id="item-name-input"
					name="item-name-input"
					placeholder="Expense Name"
                    customClass="medium"
					v-model="newItem.name"
				/>
                <span class="form-horiz-spacer"></span>
                <InputComponent
					id="item-desc-input"
					name="item-desc-input"
					placeholder="Description"
                    customClass="default"
					v-model="newItem.description"
				/>
                <span class="form-horiz-spacer"></span>
                <DropdownAutoloadComponent
    				:options="['Cristian', 'dsds']"
    				:disabled="false"
    				placeholder="Select User"
    				v-model="newItem.user"
    			/>
                <span class="form-vertical-spacer"></span>
                <InputComponent
					id="item-total-input"
					name="item-total-input"
					placeholder="Total"
                    customClass="medium"
					v-model="newItem.total"
				/>
                <span class="form-horiz-spacer"></span>
                <InputComponent
					id="item-date-input"
					name="item-date-input"
					placeholder="Date"
                    customClass="medium"
					v-model="newItem.date"
				/>
                <span class="form-horiz-spacer"></span>
                <SubmitButtonComponent
                    :title="'CREATE'"
                    customClass="default"
                    @onAction="goManageGroup"
                />
                <span class="form-horiz-spacer"></span>
                <SubmitButtonComponent
                    :title="'CLOSE'"
                    customClass="default gray-submit"
                    @onAction="goManageGroup"
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
						v-for="item in items"
						:key="item.id"
						@click="handleRowClick(item.id)"
					>
						<td>{{ item.date }}</td>
						<td>{{ item.name }}</td>
                        <td>{{ item.description }}</td>
						<td>{{ item.user }}</td>
                        <td class="cell-type-currency">{{ item.total }}</td>
                        <td class="cell-type-menu"><font-awesome-icon icon="fa-solid fa-caret-down" /></td>
					</tr>
				</template>
				<template v-slot:footer-content>
					<tr>
						<td colspan="100%">
							<PaginationComponent
								:pagination="pagination"
								:perPage="perPage"
								:keyword="keyword"
								:tableType="tableType"
								@pagechanged="onPageChange"
							/>
						</td>
					</tr>
				</template>
			</TableComponent>

        </div>

        <!-- SECTION: Right -->
        <div class="module-view-right">

        </div>

    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useExpenseStore } from '../stores/expense'
import ModuleListingMixin from '@/mixins/module-listing-mixin'
import ModuleExpensesMixin from '@/mixins/module-expenses-mixin'

export default defineComponent({
    name: 'ExpensesView',
    mixins: [ModuleListingMixin, ModuleExpensesMixin],
    components: {
    },
    data() {
        return {
            // Define data properties
            name: '',
            groups: [
                {
                    id: 1,
                    title: 'Gastos Totales',
                    isSelected: true
                },
                {
                    id: 2,
                    title: 'Ingresado por ususarios',
                    isSelected: false
                },
                {
                    id: 3,
                    title: 'Construcción',
                    isSelected: false
                },
                {
                    id: 4,
                    title: 'Empleados',
                    isSelected: false
                }
            ],
            items: [
                {
                    id: 1,
                    name: 'Expense 1',
                    description: 'Expense 1 description',
                    user: 'Cristian',
                    total: 3000000.00,
                    date: 'May 1 2023'
                },
                {
                    id: 2,
                    name: 'Expense 2',
                    description: 'Expense 2 description',
                    user: 'Silvi',
                    total: 10000000.00,
                    date: 'May 1 2023'
                },
                {
                    id: 3,
                    name: 'Expense 3',
                    description: 'Expense 3 description',
                    user: 'Cristian',
                    total: 250000.00,
                    date: 'May 1 2023'
                },
                {
                    id: 4,
                    name: 'Expense 1',
                    description: 'Expense 1 description',
                    user: 'Cristian',
                    total: 3000000.00,
                    date: 'May 1 2023'
                },
                {
                    id: 5,
                    name: 'Expense 2',
                    description: 'Expense 2 description',
                    user: 'Silvi',
                    total: 10000000.00,
                    date: 'May 1 2023'
                },
                {
                    id: 6,
                    name: 'Expense 3',
                    description: 'Expense 3 description',
                    user: 'Cristian',
                    total: 250000.00,
                    date: 'May 1 2023'
                },
                {
                    id: 7,
                    name: 'Expense 1',
                    description: 'Expense 1 description',
                    user: 'Cristian',
                    total: 3000000.00,
                    date: 'May 1 2023'
                },
                {
                    id: 8,
                    name: 'Expense 2',
                    description: 'Expense 2 description',
                    user: 'Silvi',
                    total: 10000000.00,
                    date: 'May 1 2023'
                },
                {
                    id: 9,
                    name: 'Expense 3',
                    description: 'Expense 3 description',
                    user: 'Cristian',
                    total: 250000.00,
                    date: 'May 1 2023'
                }
            ]
        }
    },
    watch: {},
    methods: {
        goManageGroup() {
            console.log('Manage group')
        },
        loadItems() {
            // Method for handling the register action
            const expenseStore = useExpenseStore()

            console.log('1111')
            expenseStore.list()
            .then(() => {
                // Perform any actions after successful register

            })
            .catch((error) => {
                // Handle register error
                console.error('Register error:', error)
            })
        },
        onNavGroupClicked(group) {
            this.groups.forEach( (item) => {
                // Set isSelected to false for all other items
                item.isSelected = item !== group ? false : true
            })
        }
    },
    beforeMount() {
        // Lifecycle hook: beforeMount
        // Perform any necessary setup or initialization here
    },
    mounted() {
        this.loadItems()
    },
})
</script>

<style lang="scss" scoped>
.module-view-container {

	.module-view-center {
        display: inline-block;
        width: 70%;
        vertical-align: top;

        .module-group-options {
            *:nth-child(1) {
                padding: 1em;
            }
            text-align: right;
            margin-bottom: 5em;
        }

        .module-group-create-form {
            display: block;
            margin: 1em 0;
            text-align: left;
            .form-horiz-spacer {
                display: inline-block;
                width: 20px;
            }
            .form-vertical-spacer {
                display: block;
                height: 10px;
            }
        }

        .column_sort {
        	cursor: pointer;
        }
    }
    .module-view-right {
        display: inline-block;
        width: 28%;
        margin-left: 2%;
        min-height: 95vh;
        background: #f7f7f1;
        box-shadow: -5px 5px 5px var(--colorGray);
        vertical-align: top;
    }

}
</style>

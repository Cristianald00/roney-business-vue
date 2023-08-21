<template>
    <div class="module-view-container">
        <!-- SECTION: Header -->
        <GroupsNavigationComponent
            :role="role"
            :groups="outlines"
            @onClicked="onNavGroupClicked"
            @onClickedAddNew="goCreateNewGroup"
        />

        <!-- SECTION: Center -->
        <div class="module-view-center">

            <div class="module-group-options" v-if="role <= 2">
                <IconButtonComponent
    				icon="fa-solid fa-gear"
                    title="Timesheet Settings"
                    helper="Timesheet Settings"
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
                    title="New Time Entry"
                    :selected="false"
    				customClass=""
                    @onAction="isDisplayCreateForm = true"
    			/>
            </div>

            <!-- SECTION: Create item -->
            <div v-if="isDisplayCreateForm" class="module-group-create-form">
                <div class="column-block">
                    <LabelComponent
    					title="Fecha"
                        customClass="default"
    				/><br>
                    <DatePickerComponent
                        id="item-shift-date-input"
                        name="item-shift-date-input"
                        placeholder="Ingresa Fecha"
                        :value="newItem.shift_date"
                        custom-class="medium"
                        @input="newItem.shift_date = $event.target.value"
                    />
                </div>
                <div class="column-block">
                    <LabelComponent
    					title="Día de Semana"
                        customClass="default"
    				/><br>
                    <InputComponent
    					id="item-week-date-input"
    					name="item-week-date-input"
    					placeholder="Ingresa Día de la Semana"
                        customClass="medium"
                        :value="newItem.week_date"
                        @input="newItem.week_date = $event.target.value"
    				/>
                </div>
                <div class="column-block">
                    <LabelComponent
    					title="Hora de Inicio"
                        customClass="default"
    				/><br>
                    <TimePickerComponent
                        id="item-start-time-input"
                        name="item-start-time-input"
                        placeholder="Hora de Inicio"
                        :value="newItem.start_time"
                        custom-class="medium"
                        @input="newItem.start_time = $event.target.value"
                    />
                </div>
                <div class="column-block">
                    <LabelComponent
    					title="Hora de Salida"
                        customClass="default"
    				/><br>
                    <TimePickerComponent
                        id="item-end-time-input"
                        name="item-end-time-input"
                        placeholder="Hora de Salida"
                        :value="newItem.end_time"
                        custom-class="medium"
                        @input="newItem.end_time = $event.target.value"
                    />
                </div>
                <span class="form-vertical-spacer"></span>
                <div class="column-block">
                    <LabelComponent
    					title="Horas de Trabajo"
                        customClass="default"
    				/><br>
                    <InputComponent
    					id="item-qty-hours-input"
    					name="item-qty-hours-input"
    					placeholder="Horas de trabajo"
                        customClass="medium"
                        :value="newItem.total_hours"
                        @input="newItem.total_hours = $event.target.value"
    				/>
                </div>
                <div class="column-block" v-if="role <= 2">
                    <LabelComponent
    					title="Pago Hora"
                        customClass="default"
    				/><br>
                    <InputComponent
    					id="item-total-pay-input"
    					name="item-total-pay-input"
    					placeholder="Pago Total"
                        customClass="medium"
                        :value="newItem.hour_pay"
                        @input="newItem.hour_pay = $event.target.value"
    				/>
                </div>
                <div class="column-block" v-if="role <= 2">
                    <LabelComponent
    					title="Pago Total"
                        customClass="default"
    				/><br>
                    <InputComponent
    					id="item-total-pay-input"
    					name="item-total-pay-input"
    					placeholder="Pago Total"
                        customClass="medium"
                        :value="newItem.total_pay"
                        @input="newItem.total_pay = $event.target.value"
    				/>
                </div>
                <div class="column-block">
                    <LabelComponent
    					title="Pago Total"
                        customClass="default"
    				/><br>
                    <span>{{ convertNumberToCurrency(newItem.total_pay ? newItem.total_pay : 0) }}</span>
                </div>

                <span class="form-vertical-spacer"></span>
                <span v-if="error" class="error-message">{{ error }}</span>
                <span class="form-vertical-spacer"></span>

                <SubmitButtonComponent
                    :title="'CREAR'"
                    :isLoading="isLoading"
                    customClass="default"
                    @onAction="goCreateTimesheet"
                />
                <span class="form-horiz-spacer"></span>
                <SubmitButtonComponent
                    :title="'CANCELAR'"
                    customClass="default gray-submit"
                    @onAction="isDisplayCreateForm = false"
                />
            </div>

            <!-- SECTION: Items List -->
            <TableComponent v-if="outlines.length > 0 && timesheets && timesheets.length > 0">
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
						v-for="item in timesheets"
						:key="item.id"
						@click="handleRowClick(item.id)"
					>
						<td>{{ item.shift_date }}</td>
						<td style="font-weight: 500;">{{ item.week_date }}</td>
                        <td>{{ convertMilitarTimeToNormalTime(item.start_time) }}</td>
						<td>{{ convertMilitarTimeToNormalTime(item.end_time) }}</td>
                        <td>{{ item.total_hours }}</td>
                        <td class="cell-type-currency">{{ convertNumberToCurrency(item.hour_pay) }}</td>
                        <td class="cell-type-currency">{{ convertNumberToCurrency(item.total_pay) }}</td>

                        <td class="group-item-colors-td">
                            <span
                                :class="'group-item-color group-item-color-' + getChildOutlineColor(item.child_outline_id)"
                            >
                        </span>&nbsp;
                            {{ ( item.child_outline_id ? getChildOutlineName(item.child_outline_id) : '' ) }}
                        </td>
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
								@onPageChange="onPageChange"
							/>
						</td>
					</tr>
				</template>
			</TableComponent>

            <div v-else-if="outlines.length < 1" class="create-item-alert">
                <h1>Hey! You don't have any Timesheets Group yet,<br> start creating one.</h1>
                <SubmitButtonComponent
                    :title="'Create Group'"
                    customClass="default"
                    @onAction="goCreateNewGroup"
                />
            </div>
            <div v-else-if="timesheets && timesheets.length < 1" class="create-item-alert">
                <h1>You haven't created any timesheet so far.</h1>
                <SubmitButtonComponent
                    v-if="role <= 2"
                    :title="'Create Timesheet'"
                    customClass="default"
                    @onAction="isDisplayCreateForm = true"
                />
            </div>

        </div>

        <!-- SECTION: Right -->
        <div class="module-view-right">
            <div v-if="outline" class="module-summary">
                <h2>{{ outline.name }}</h2><br><br>
                <span class="summary-label">Total:</span>
                <span class="summary-value">{{ convertNumberToCurrency(outline.total ? outline.total: 0) }}</span>
                <span class="summary-label">Total this Month:</span>
                <span class="summary-value">{{ convertNumberToCurrency(outline.current_month_total) }}</span>
            </div>
        </div>

    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { userStore } from '../stores/user'
import { timesheetStore } from '../stores/timesheet'
import { outlineStore } from '../stores/outline'
import { paginationStore } from '../stores/pagination'
import { organizationStore } from '../stores/organization'
import GlobalHelpersMixin from '@/mixins/global-helpers-mixin'
import ModuleListingMixin from '@/mixins/module-listing-mixin'
import ModuleTimesheetsMixin from '@/mixins/module-timesheets-mixin'

export default defineComponent({
    name: 'TimesheetsView',
    mixins: [GlobalHelpersMixin, ModuleListingMixin, ModuleTimesheetsMixin],
    components: {
    },
    data() {
        return {
            error: null,
            isDisplayCreateForm: false,
            isLoading: false,
            name: '',
            outlineNamesArray: [],
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
        currentUser() {
            return userStore().user
        },
        organizationUsers() {
            return organizationStore().organizationUsers
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
		},
        role() {
            return userStore().role ?? 4
        },
        timesheets() {
			return timesheetStore().timesheets
		}
    },
    watch: {
        outline(newVal) {
            if (newVal) {
                if (this.newItem && newVal && newVal.timesheet_hour_pay) {
                    this.newItem.hour_pay = newVal.timesheet_hour_pay
                }
            }
        },
        ['outline.id']: {
            handler: function (id) {
                if (id) {
                    this.loadTimesheets(id)
                }
            },
            deep: true
        },
        ['newItem']: {
			handler: function () {
                //Watch newTimesheet change
			},
			deep: true
		},
        ['newItem.shift_date']: {
            handler: function (newShiftDate) {
                if (newShiftDate) {
                    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
                    const dateObj = new Date(newShiftDate)
                    const dayOfWeekIndex = dateObj.getDay() // 0 (Sunday) to 6 (Saturday)

                    if (dayOfWeekIndex >= 0 && dayOfWeekIndex < daysOfWeek.length) {
                        const weekDate = daysOfWeek[dayOfWeekIndex]
                        this.newItem.week_date = weekDate
                    }
                }
            },
            deep: true
        },
        ['newItem.start_time']: {
            handler: function(newStartTime) {
                this.goCalculateTotalHours();
            },
            deep: true
        },
        ['newItem.end_time']: {
            handler: function(newEndTime) {
                this.goCalculateTotalHours();
            },
            deep: true
        },
        ['newItem.total_hours']: {
            handler: function(newEndTime) {
                this.goCalculateTotalPay();
            },
            deep: true
        },
        ['newItem.hour_pay']: {
            handler: function(newHourPay) {
                this.goCalculateTotalPay()
            },
            deep: true
        }
    },
    methods: {
        getChildOutlineName(child_outline_id) {
            let name = ''
            let nameFound = false
            this.outlineNamesArray.forEach( (item, i) => {
                if ( item.id == child_outline_id ) {
                    name = item.name
                    nameFound = true
                }
            })
            // If name not found add it to array for later use
            if ( !nameFound ) {
                this.outlines.forEach( (outline, i) => {
                    if ( outline.id == child_outline_id ) {
                        name = outline.name
                        this.outlineNamesArray.push({
                            id: outline.id,
                            name: outline.name,
                            color: outline.color
                        })
                    }
                })
            }
            return name;
        },
        getChildOutlineColor(child_outline_id) {
            let color = ''
            let colorFound = false
            this.outlineNamesArray.forEach( (item, i) => {
                if ( item.id == child_outline_id ) {
                    color = item.color
                    colorFound = true
                }
            })
            // If name not found add it to array for later use
            if ( !colorFound ) {
                this.outlines.forEach( (outline, i) => {
                    if ( outline.id == child_outline_id ) {
                        color = outline.color
                        this.outlineNamesArray.push({
                            id: outline.id,
                            name: outline.name,
                            color: outline.color
                        })
                    }
                })
            }
            return color;
        },
        goCalculateTotalHours() {
            if (this.newItem.start_time && this.newItem.end_time) {
                const startTime = new Date(`1970-01-01 ${this.newItem.start_time}`)
                const endTime = new Date(`1970-01-01 ${this.newItem.end_time}`)

                const timeDifference = endTime - startTime
                const totalHours = timeDifference / (1000 * 60 * 60) // Convert milliseconds to hours
                this.newItem.total_hours = totalHours
            }
        },
        goCalculateTotalPay() {
            if (this.newItem.hour_pay && this.newItem.total_hours) {
                this.newItem.total_pay = this.newItem.hour_pay * this.newItem.total_hours
            }
        },
        goChangePage(paginationPayload) {
            this.loadTimesheets( this.outline.id, paginationPayload)
        },
        goCreateNewGroup() {
            this.$router.push({
                path: '/outlines/new',
                query: {
                    type: 'timesheet'
                }
            })
        },
        async goCreateTimesheet() {
            if ( this.newItem.hour_pay ) {
                if ( this.newItem.shift_date && this.newItem.start_time && this.newItem.end_time && this.newItem.hour_pay ) {
                    this.error = null
                    this.isLoading = true
                    const store = timesheetStore()
                    const payload = this.newItem
                    payload.outline_id = this.outline.id
                    await store.create(payload)

                    // Reset
                    this.newItem.shift_date = null
                    this.isLoading = false
                } else {
                    this.error = 'All fields are required'
                }
            } else {
                this.error = 'The hourly pay has not been set, set it up or ask your manager.'
            }
        },
        goManageGroup() {
            if ( this.outline ) {
                this.$router.push({
                    path: '/outlines/edit/' + this.outline.id,
                    query: {
                        type: 'timesheet'
                    }
                })
            }
        },
        loadTimesheets(outlineId, paginationPayload = null) {
            const store = timesheetStore()
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
            store.list('timesheets')

            // Initialconfiguration for new item
            if (this.outline && this.outline.timesheet_hour_pay) {
                this.newItem.hour_pay = this.outline.timesheet_hour_pay
            }
        },
        onNavGroupClicked(outline) {
            const store = outlineStore()
            this.outlines.forEach( (item) => {
                // Set is_selected to false for all other items
                if ( item !== outline ) {
                    item.is_selected = false
                }
                // Load timesheets for selected items
                else {
                    item.is_selected = true
                    store.outline = item
                    this.loadTimesheets(outline.id) // Load outline timesheets
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
    }
})
</script>

<style lang="scss" scoped>
@import '@/styles/ModuleViewContainer.scss';

.create-item-alert {
    margin-top: 2em;
    text-align: center;
    button {
        margin-top: 2em;
    }
}

// GROUP ITEMS COLORS
.group-item-colors-td {
    white-space: nowrap;
}
.group-item-color {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    vertical-align: middle;
}
.group-item-color-1abc9c {
    background: #1abc9c;
}
.group-item-color-2ecc71 {
    background: #2ecc71;
}
.group-item-color-3498db {
    background: #3498db;
}
.group-item-color-9b59b6 {
    background: #9b59b6;
}
.group-item-color-34495e {
    background: #34495e;
}
.group-item-color-f1c40f {
    background: #f1c40f;
}
.group-item-color-e67e22 {
    background: #e67e22;
}
.group-item-color-e74c3c {
    background: #e74c3c;
}
.group-item-color-95a5a6 {
    background: #95a5a6;
}
.group-item-color-2c3e50 {
    background: #2c3e50;
}
</style>

<template>
    <div class="module-view-container">

        <!-- SECTION: Center -->
        <div class="module-view-center">

            <!-- SECTION: Create item -->
            <div v-if="view == 'create'" class="module-group-create-form">
                <h1>{{ textForCreateOutline }}</h1>
                <br>
                <div class="column-block">
                    <LabelComponent
    					title="Group Name"
                        customClass="default"
    				/><br>
                    <InputComponent
    					id="item-name-input"
    					name="item-name-input"
    					placeholder="Group Name"
                        customClass="medium"
    					:value="newItem.name"
                        @input="newItem.name = $event.target.value"
    				/>
                </div>
                <div class="column-block" v-if="moduleType == 'timesheets'">
                    <LabelComponent
    					title="Employee"
                        customClass="default"
    				/><br>
                    <DropdownAutoloadComponent
        				:options="organizationUsers"
        				:disabled="false"
        				placeholder="Select Employee"
                        :value="newItem.assignee_id"
                        @onValueChanged="newItem.assignee_id = $event"
        			/>
                </div>
                <div class="column-block">
                    <LabelComponent
    					title="Custom Color"
                        customClass="default"
    				/><br>
                    <DropdownAutoloadComponent
        				:options="colors"
        				:disabled="false"
        				placeholder="Select Color"
                        :value="newItem.color"
                        @onValueChanged="newItem.color = $event"
        			/>
                    &nbsp;<span v-if="newItem.color" :class="'dropdown-color dropdown-color-' + newItem.color.id"></span>
                </div>
                <div class="column-block">
                    <LabelComponent
    					title="Description"
                        customClass="default"
    				/><br>
                    <InputComponent
    					id="item-desc-input"
    					name="item-desc-input"
    					placeholder="Description"
                        customClass="wider"
    					:value="newItem.description"
                        @input="newItem.description = $event.target.value"
    				/>
                </div>
                <span class="form-vertical-spacer"></span>
                <span class="form-vertical-spacer"></span>
                <SubmitButtonComponent
                    :title="'CREATE'"
                    customClass="default"
                    @onAction="goCreateGroup"
                />
                <span class="form-horiz-spacer"></span>
                <SubmitButtonComponent
                    :title="'CLOSE'"
                    customClass="default gray-submit"
                    @onAction="view = 'edit'"
                />
            </div>

            <!-- SECTION: Edit Item -->
            <div v-else="view == 'edit'" class="module-group-details">
                <div class="" v-if="outline">
                    <div class="module-group-details-header">
                        <h1>{{ outline.name }}</h1>
                        <div class="">
                            <LabelComponent
            					title="Switch Group"
                                customClass="default"
            				/><br>
                            <DropdownAutoloadComponent
                                :options="outlines"
                                :disabled="false"
                                placeholder="Switch Timesheet Group"
                                :value="outline.id"
                                @onValueChanged="goSwitchOutline($event)"
                            />
                        </div>
                    </div>
                    <p>{{ outline.description }}</p>
                    <br>

                    <!-- sub SECTION: Outline Configuration -->
                    <h3>{{ textForConfigurarionsTitle }}</h3>
                    <br>
                    <div class="">
                        <div class="row-block">
                            <LabelComponent
            					title="Hourly Wage"
                                customClass="default"
            				/><br>
                            <InputComponent
            					id="item-desc-input"
            					name="item-desc-input"
            					placeholder="0.0"
                                customClass="medium"
                                type="number"
            					:value="outline.timesheet_hour_pay"
                                @input="outline.timesheet_hour_pay = $event.target.value"
            				/>
                            &nbsp;<span>{{ convertNumberToCurrency(outline.timesheet_hour_pay ? outline.timesheet_hour_pay : 0) }}</span>
                        </div>
                        <SubmitButtonComponent
                            :title="'Save Settings'"
                            customClass="default"
                            @onAction="save"
                        />
                    </div><br>
                    <div v-if="parents.length > 0" class="">
                        <div
                            v-for="(parent, index) in parents"
    						:key="index + 'parent'"
                            class="module-group-details-item"
                        >
                            - {{ parent.name }}&nbsp;<span><font-awesome-icon @click="goRemoveParent(parent.id)" icon="fa-solid fa-trash" /></span>
                        </div>
                    </div>
                    <br>

                    <!-- sub SECTION: Outline Parents -->
                    <h3>{{ textForParentGroupsTitle }}</h3>
                    <br>
                    <p>{{ textForParentGroups }}</p>
                    <br>
                    <div class="">
                        <DropdownAutoloadComponent
            				:options="outlines"
            				:disabled="false"
            				placeholder="Select Outline"
                            :value="newParent"
                            @onValueChanged="newParent = $event"
            			/>
                        &nbsp;
                        <SubmitButtonComponent
                            :title="'Add Parent'"
                            customClass="default"
                            @onAction="goAddParent"
                        />
                    </div><br>
                    <div v-if="parents.length > 0" class="">
                        <div
                            v-for="(parent, index) in parents"
    						:key="index + 'parent'"
                            class="module-group-details-item"
                        >
                            - {{ parent.name }}&nbsp;<span><font-awesome-icon @click="goRemoveParent(parent.id)" icon="fa-solid fa-trash" /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION: Right -->
        <div class="module-view-right">

        </div>

    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { outlineStore } from '../stores/outline'
import OutlineMixin from '@/mixins/outline-mixin'
import { organizationStore } from '../stores/organization'
import GlobalHelpersMixin from '@/mixins/global-helpers-mixin'
import ModuleListingMixin from '@/mixins/module-listing-mixin'

export default defineComponent({
    name: 'OutlinesView',
    mixins: [GlobalHelpersMixin, ModuleListingMixin, OutlineMixin],
    components: {
    },
    data() {
        return {
            currentOutline: null,
            moduleType: null,
            newItem: {
                name: null,
                date: null,
                total: null,
                color: {
                    id: '2c3e50',
                    value: '2c3e50',
                    name: 'Midnight Blue'
                },
                description: null
            },
            newParent: null,
            parents: [],
            colors: [
                { id: '1abc9c', value: '#1abc9c', name: 'Turquoise' },
                { id: '2ecc71', value: '#2ecc71', name: 'Emerald' },
                { id: '3498db', value: '#3498db', name: 'Peter River' },
                { id: '9b59b6', value: '#9b59b6', name: 'Amethyst' },
                { id: '34495e', value: '#34495e', name: 'Wet Asphalt' },
                { id: 'f1c40f', value: '#f1c40f', name: 'Sunflower' },
                { id: 'e67e22', value: '#e67e22', name: 'Carrot' },
                { id: 'e74c3c', value: '#e74c3c', name: 'Alizarin' },
                { id: '95a5a6', value: '#95a5a6', name: 'Concrete' },
                { id: '2c3e50', value: '#2c3e50', name: 'Midnight Blue' }
            ],
            view: 'list'
        }
    },
    computed: {
        organizationUsers() {
            return organizationStore().organizationUsers
        },
        outline() {
			return outlineStore().outline
		},
        outlines() {
			return outlineStore().outlines
		},
    },
    watch: {
        ['newItem.assignee_id']: {
            handler: function (assignee) {
                if (assignee && assignee.name) {
                    this.newItem.name = assignee.name
                }
            },
            deep: true
        },
        outline: {
			handler: function () {
                let parents = []
                this.outlines.forEach( (item, i) => {
                    if (item.id == this.outline.id) {
                        if ( this.outline.parents ) {
                            const parents = Object.values(this.outline.parents)
                            this.parents = parents
                        } else {
                            this.parents = []
                        }
                    }
                })
			},
			deep: true
		}
    },
    methods: {
        async goAddParent() {
            const store = outlineStore()
            const outline = Object.assign({}, this.outline)
            let parents = Object.assign([], this.parents)

            // Do not add itself
            if ( outline.id == this.newParent.id) {
                return
            }

            const newItem = {
                id: this.newParent.id,
                name: this.newParent.name
            }
            parents.push(newItem)
            this.parents = parents

            // Update outline
            outline.parents = parents
            await store.update(outline.id, outline)
            await store.show(outline.id)
        },
        goCreateGroup() {
            console.log('moduleType: ', this.moduleType)
            console.log('item: ', this.newItem)
            const store = outlineStore()
            const outline = this.newItem
            outline.color = this.newItem.color
            outline.assignee_id = this.newItem.assignee_id ? this.newItem.assignee_id.id : null
            outline.module_type = this.moduleType
            store.create(outline)
        },
        async goRemoveParent(id) {
            const store = outlineStore()
            const outline = Object.assign({}, this.outline)
            const parents = Object.assign({}, this.parents)

            Object.keys(parents).forEach( key => {
                if ( parents[key].id == id ) {
                    delete parents[key]
                }
            })
            this.parents = parents

            // Reset & Update outline
            outline.parents = parents
            await store.update(outline.id, outline)
            await store.show(outline.id)
        },
        goSwitchOutline(outline) {
            const id = outline.id ?? null
            if (id) {
                const store = outlineStore()
                // Reselecet the outline
                this.outlines.forEach( (item) => {
                    if ( item.id !== id ) {
                        item.is_selected = false
                    }
                    else {
                        item.is_selected = true
                        store.outline = item
                    }
                })
            }
        },
        async loadOutlines(outlineId = null) {
            if ( outlineId || this.outline ) {
                const currentOutlineId = outlineId ?? this.outline.id
                const store = outlineStore()
                await store.list()

                // Refresh parents
                let parents = []
                this.outlines.forEach( (item, i) => {
                    if ( item.id !== currentOutlineId ) {
                        item.is_selected = false
                    } else {
                        item.is_selected = true
                        store.outline = item
                    }
                })
            }
        },
        async save() {
            const store = outlineStore()
            const outline = Object.assign({}, this.outline)

            // Update outline
            await store.update(outline.id, outline)
            await store.show(outline.id)
        }
    },
    beforeMount() {
    },
    mounted() {
        // Display applicable view
        let view = 'edit'
        const action = this.$route.params.action
        const asset_id = this.$route.params.item_id
        const moduleType = this.$route.query.type

        // Define action
        if ( action ) {
            if ( action == 'new' ) {
                view= 'create'
            }
        }

        // Define module type
        if ( moduleType ) {
            this.moduleType = moduleType
        }

        // Load data
        this.view = view
        this.loadOutlines(asset_id ?? null)
    },
})
</script>

<style lang="scss" scoped>
@import '@/styles/ModuleViewContainer.scss';

.module-view-center {
    padding-top: 50px;
}

// DROPDOWN COLORS
.dropdown-color {
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    vertical-align: middle;
}
.dropdown-color-1abc9c {
    background: #1abc9c;
}
.dropdown-color-2ecc71 {
    background: #2ecc71;
}
.dropdown-color-3498db {
    background: #3498db;
}
.dropdown-color-9b59b6 {
    background: #9b59b6;
}
.dropdown-color-34495e {
    background: #34495e;
}
.dropdown-color-f1c40f {
    background: #f1c40f;
}
.dropdown-color-e67e22 {
    background: #e67e22;
}
.dropdown-color-e74c3c {
    background: #e74c3c;
}
.dropdown-color-95a5a6 {
    background: #95a5a6;
}
.dropdown-color-2c3e50 {
    background: #2c3e50;
}
</style>

<template>
    <div class="module-view-container">

        <!-- SECTION: Center -->
        <div class="module-view-center">

            <!-- SECTION: Create item -->
            <div v-if="view == 'create'" class="module-group-create-form">
                <InputComponent
					id="item-name-input"
					name="item-name-input"
					placeholder="Group Name"
                    customClass="medium"
					:value="newItem.name"
                    @input="newItem.name = $event.target.value"
				/>
                <span class="form-horiz-spacer"></span>
                <InputComponent
					id="item-desc-input"
					name="item-desc-input"
					placeholder="Description"
                    customClass="wider"
					:value="newItem.description"
                    @input="newItem.description = $event.target.value"
				/>
                <span class="form-horiz-spacer"></span>
                <DropdownAutoloadComponent
    				:options="colors"
    				:disabled="false"
    				placeholder="Select Color"
                    :value="newItem.color"
                    @onValueChanged="newItem.color = $event"
    			/>&nbsp;
                <span v-if="newItem.color" :class="'dropdown-color dropdown-color-' + newItem.color.id"></span>
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
                    <h1>{{ outline.name }} <span style="font-size: 13px;">current</span></h1>
                    <p>{{ outline.description }}</p>
                    <br>
                    <h3>Parent Groups</h3>
                    <br>
                    <p>Specify the groups where you want expenses to be duplicated. For instance, when adding an expense to {{outline.name}}, it can automatically be included in another group. This ensures synchronization between various expense groups."</p>
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

            <!-- SECTION: List items -->
            <br><br><br>
            <div class="module-group-list">
                <h3>Groups</h3>
                <div
                    class="module-group-list-item"
                    v-for="item in outlines"
                    :key="item.id"
                >
                    <span>{{ item.name }}</span>
                    <span @click="goSwitchOutline(item.id)" class="switch-to-team-btn">View Group</span>
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
import ModuleListingMixin from '@/mixins/module-listing-mixin'

export default defineComponent({
    name: 'OutlinesView',
    mixins: [ModuleListingMixin],
    components: {
    },
    data() {
        return {
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
        outline() {
			return outlineStore().outline
		},
        outlines() {
			return outlineStore().outlines
		},
    },
    watch: {
        outline: {
			handler: function () {
                let parents = []
                this.outlines.forEach( (item, i) => {
                    if (item.id == this.outline.id) {
                        if ( this.outline.parents ) {
                            const parents = Object.values(this.outline.parents)
                            console.log('parents: ', parents)
                            this.parents = parents
                        } else {
                            this.parents = []
                        }
                    }
                })
			},
			deep: true
		},
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
            const store = outlineStore()
            const outline = this.newItem
            outline.color = this.newItem.color.id
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
        goSwitchOutline(id) {
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
        },
        async loadOutlines() {
            const store = outlineStore()
            await store.list()

            // Refresh parents
            let parents = []
            this.outlines.forEach( (item, i) => {
                if (item == this.outline.id) {
                    parents = this.outline
                    console.log('parents: ', parents);
                }
            })
        }
    },
    beforeMount() {
        // Lifecycle hook: beforeMount
        // Perform any necessary setup or initialization here
    },
    mounted() {
        // Display applicable view
        let view = 'edit'
        const action = this.$route.query.action
        if ( action ) {
            if ( action == 'new' ) {
                view= 'create'
            }
        }
        this.view = view

        // Load data
        this.loadOutlines()
    },
})
</script>

<style lang="scss" scoped>
@import '@/styles/ModuleViewContainer.scss';

.module-group-list {
    .switch-to-team-btn {
        margin-left: 1em;
        cursor: pointer;
        color: rgb(0, 189, 126);
    }
    .switch-to-team-btn:hover {
        text-decoration: underline;
    }
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

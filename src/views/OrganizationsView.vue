<template>
    <div class="module-view-container">

        <!-- SECTION: Center -->
        <div class="module-view-center">

            <!-- SECTION: Center Header -->
            <div class="module-group-options">
                <IconButtonComponent
    				icon="fa-solid fa-plus"
                    title="Create Team"
                    helper="Create Team"
                    :selected="false"
    				customClass=""
                    @onAction="view = 'create'"
    			/>
            </div>

            <!-- SECTION: Create item -->
            <div v-if="view == 'create'" class="module-group-create-form">
                <InputComponent
					id="item-name-input"
					name="item-name-input"
					placeholder="Team Name"
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
                <span class="form-vertical-spacer"></span>
                <SubmitButtonComponent
                    :title="'CREATE'"
                    customClass="default"
                    @onAction="goCreateTeam"
                />
                <span class="form-horiz-spacer"></span>
                <SubmitButtonComponent
                    :title="'CLOSE'"
                    customClass="default gray-submit"
                    @onAction="view = 'edit'"
                />
            </div>

            <!-- SECTION: Edit Item -->
            <div v-else="view == 'edit'" class="organization-details-container">
                <div class="">
                    <h2>{{ organization.name }}</h2>
                    <p>{{ organization.description }}</p>
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
    name: 'OrganizationsView',
    mixins: [ModuleListingMixin],
    components: {
    },
    data() {
        return {
            newItem: {
                name: null,
                date: null,
                total: null,
                description: null
            },
            view: 'edit'
        }
    },
    computed: {
        organization() {
            return {
                id: 1,
                name: 'Glampings',
                description: 'This is the organization description'
            }
        },
        outlines() {
			return outlineStore().outlines
		},
    },
    watch: {
    },
    methods: {
        goCreateTeam() {
            const store = orgaizationStore()
            store.create(this.newItem)
        },
        loadOutlines() {
            const store = outlineStore()
            store.list()
        }
    },
    beforeMount() {
        // Lifecycle hook: beforeMount
        // Perform any necessary setup or initialization here
    },
    mounted() {
        if ( this.$route.query.action ) {
            const action = this.$route.query.action
            if ( action == 'new' ) {
                this.view = 'create'
            } else {
                this.view = 'edit'
            }
        }
        // this.loadOutlines()
    },
})
</script>

<style lang="scss" scoped>
.module-view-container {

	.module-view-center {
        display: inline-block;
        width: 70%;
        vertical-align: top;

        .module-group-options, .module-list-options {
            .icon-button-component {
                padding: 1em;
            }
            text-align: right;
        }

        .module-group-options {
            margin-top: 1em;
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

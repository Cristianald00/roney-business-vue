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
                <div class="" v-if="organization">
                    <h1>{{ organization.name }} <span style="font-size: 13px;">current</span></h1>
                    <p>{{ organization.description }}</p>
                </div>
            </div>

            <!-- SECTION: List items -->
            <br><br>
            <div class="module-group-list">
                <h3>Teams</h3>
                <div
                    class="module-group-list-item"
                    v-for="item in organizations"
                    :key="item.id"
                >
                    <span>{{ item.name }}</span>
                    <span @click="goMakeCurrent(item.id)" class="switch-to-team-btn">Switch to Team</span>
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
import { userStore } from '../stores/user'
import { organizationStore } from '../stores/organization'
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
            return organizationStore().organization
        },
        organizations() {
			return organizationStore().organizations
		},
    },
    watch: {
    },
    methods: {
        goCreateTeam() {
            const store = organizationStore()
            store.create(this.newItem)
            // Reset
            this.newItem = {
                name: '',
                description: ''
            }
            this.view = 'edit'
        },
        async goMakeCurrent(id) {
            const store = organizationStore()
            await store.makeCurrent(id)
        },
        loadOrganization() {
            const store = organizationStore()
            const theUserStore = userStore()
            const organizationId = theUserStore.user ? theUserStore.user.current_organization : null
            store.show(organizationId)
        },
        loadOrganizations() {
            const store = organizationStore()
            store.list()
        }
    },
    beforeMount() {
        // Lifecycle hook: beforeMount
        // Perform any necessary setup or initialization here
    },
    async mounted() {
        // Display applicable view
        let view = 'edit'
        const action = this.$route.query.action
        if ( action ) {
            if ( action == 'new' ) {
                view = 'create'
            } else if ( action == 'switch' ) {
                const id = this.$route.query.id
                await this.goMakeCurrent(id)
            }
        }
        this.view = view

        // Load data
        this.loadOrganization()
        this.loadOrganizations()
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
</style>

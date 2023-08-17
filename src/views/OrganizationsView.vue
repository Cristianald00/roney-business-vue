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
                    @onAction="goCreateOrganization"
                />
                <span class="form-horiz-spacer"></span>
                <SubmitButtonComponent
                    :title="'CLOSE'"
                    customClass="default gray-submit"
                    @onAction="view = 'edit'"
                />
            </div>

            <!-- SECTION: Organization Details -->
            <div v-else="view == 'edit'" class="module-group-details">
                <div class="" v-if="organization">
                    <h1>{{ organization.name }}
                        <span style="font-size: 13px;">current</span>
                        &nbsp;
                        <font-awesome-icon
                            style="font-size: 16px; cursor: pointer;"
                            @click="isDisplayEditOrg = true"
                            icon="fa-solid fa-pen"
                        />
                    </h1>
                    <p>{{ organization.description }}</p>

                    <!-- SECTION: Edit Organization details -->
                    <div v-if="isDisplayEditOrg" class="">
                        <br>
                        <div class="row-block">
                            <LabelComponent
            					title="Name"
                                customClass="default"
            				/><br>
                            <InputComponent
            					id="team-name-input"
            					name="team-name-input"
            					placeholder="Team Name"
                                customClass="medium"
                                :value="organization.name"
                                @input="organization.name = $event.target.value"
            				/>
                        </div>
                        <div class="row-block">
                            <div class="column-block">
                                <SubmitButtonComponent
                                    :title="'SAVE'"
                                    customClass="default"
                                    @onAction="goEditOrganization"
                                />
                            </div>
                            <div class="column-block">
                                <SubmitButtonComponent
                                    :title="'CANCEL'"
                                    customClass="default gray-submit"
                                    @onAction="isDisplayEditOrg = false"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <br><br>

                <!-- SECTION: User details -->
                <div class="">
                    <h3>Users</h3>
                    <br>
                    <div class="">
                        <InputComponent
        					id="item-name-input"
        					name="item-name-input"
        					placeholder="Type User Email"
                            customClass="medium"
        					:value="newUserEmail"
                            @input="newUserEmail = $event.target.value"
        				/>
                        &nbsp;
                        <SubmitButtonComponent
                            :title="'Add User'"
                            customClass="default"
                            @onAction="goAddUser"
                        />
                    </div><br>
                    <div v-if="organizationUsers && organizationUsers.length > 0" class="">
                        <div
                            v-for="(user, index) in organizationUsers"
    						:key="index + 'user'"
                            class="module-group-details-item"
                        >
                            - {{ user.name }}&nbsp;<span><font-awesome-icon @click="goRemoveUser(user.id)" icon="fa-solid fa-trash" /></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SECTION: List items -->
            <br><br><br>
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
import AuthenticationMixin from '@/mixins/authentication-mixin'

export default defineComponent({
    name: 'OrganizationsView',
    mixins: [AuthenticationMixin, ModuleListingMixin],
    components: {
    },
    data() {
        return {
            isDisplayEditOrg: false,
            newItem: {
                name: null,
                date: null,
                total: null,
                description: null
            },
            newUserEmail: null,
            view: 'edit'
        }
    },
    computed: {
        organizationUsers() {
            return organizationStore().organizationUsers
        },
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
        goAddUser() {
            const store = organizationStore()
            store.addUser(this.organization.id, this.newUserEmail)
            // Reset
            this.newUserEmail = null
        },
        goCreateOrganization() {
            const store = organizationStore()
            store.create(this.newItem)
            // Reset
            this.newItem = {
                name: '',
                description: ''
            }
            this.view = 'edit'
        },
        async goEditOrganization() {
            const store = organizationStore()
            await store.update(this.organization.id, this.organization)
            await store.show(this.organization.id)
            this.isDisplayEditOrg = false
        },
        async goMakeCurrent(id) {
            const store = organizationStore()
            await store.makeCurrent(id)

            this.calculateSessionRole()
        },
        goRemoveUser(userId) {
            const store = organizationStore()
            store.removeUser(this.organization.id, userId)
            // Reset
            this.newUserEmail = null
        },
        loadOrganization() {
            const store = organizationStore()
            const theUserStore = userStore()
            const organizationId = theUserStore.user ? theUserStore.user.current_organization : null
            store.show(organizationId)
        },
        loadOrganizations() {
            const store = organizationStore()
            store.list().then( () => {
                store.listOrganizationUsers(this.organization.id)
            })
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

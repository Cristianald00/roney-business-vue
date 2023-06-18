<template>
    <div class="roney-post-layout-container">
        <HeaderCore />

        <div class="roney-post-layout-right">
            <div class="profile-menu" v-if="user" >
                <div class="profile-icon">
                    {{ this.user.name.substr(0, 2).toUpperCase() }}
                </div>
                <div class="profile-dropdown-menu">
                    <ul>
                        <li>
                            <DropdownAutoloadComponent
                				:options="organizations"
                				:disabled="false"
                				placeholder="Switch Team"
                                :value="organization"
                                customClass="small"
                                @onValueChanged="goSwitchOrganization"
                			/>
                        </li>
                        <li @click="goViewTeam" v-if="organization">{{ organization.name }}&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-pen" /></li>
                        <li @click="goNewTeam">New Team&nbsp;&nbsp;<font-awesome-icon icon="fa-solid fa-plus" /></li>
                        <li @click="goLogout">Log out</li>
                    </ul>
                </div>
            </div>

            <main class="roney-main-container">
                <slot/>
            </main>

            <FooterCore />
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderCore from './HeaderCore.vue'
import FooterCore from './FooterCore.vue'
import { userStore } from '@/stores/user'
import { RouterLink, RouterView } from 'vue-router'
import { organizationStore } from '@/stores/organization'

export default defineComponent({
    name: 'RoneyPreAuthLayout',
    data() {
        return {
        }
    },
    components: {
        HeaderCore,
        FooterCore
    },
    computed: {
        organization() {
            return organizationStore().organization
        },
        organizations() {
			return organizationStore().organizations
		},
        user() {
			return userStore().user
		}
    },
    watch: {
    },
    methods: {
        goLogout() {
            const store = userStore()
            store.logout()
        },
        goNewTeam() {
            // Redirect to New Organization
            this.$router.push('/organizations?action=new')
        },
        goSwitchOrganization(org) {
            // Redirect to New Organization
            this.$router.push('/organizations?action=switch&id=' + org.id)
        },
        goViewTeam() {
            // Redirect to New Organization
            this.$router.push('/organizations?action=edit')
        },
        loadOrganization() {
            const store = organizationStore()
            const organizationId = this.user ? this.user.current_organization : null
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
    mounted() {
        this.loadOrganization()
        this.loadOrganizations()
    },
})
</script>

<style lang="scss">
.roney-post-layout-container {
    display: block;
    width: 100%;
    vertical-align: top;
    box-sizing: border-box;

    .roney-post-layout-right {
        display: inline-block;
        width: 90%;
        vertical-align: top;
        box-sizing: border-box;

        .profile-menu {
            cursor: pointer;
            position: absolute;
            z-index: 90;
            right: 10px;
            top: 10px;
            .profile-icon {
                text-align: center;
                padding-top: 8px;
                color: white;
                display: block;
                width: 40px;
                height: 40px;
                background: rgb(43, 142, 145);
                border-radius: 50%;
            }
            .profile-dropdown-menu {
                position: absolute;
                top: 10px;
                right: 0px;
                z-index: 100;
                display: none;
                padding-top: 40px;
                ul {
                    border-radius: 5px;
                    padding: 0px;
                    background: #f7f7f1;
                    li {
                        font-size: 0.9em;
                        cursor: pointer;
                        list-style: none;
                        padding: 10px 20px;
                        border-top: 1px solid var(--colorLightGray);
                        white-space: nowrap;
                    }
                    li:hover {
                        background: var(--colorLightGray);
                    }
                    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
                }
            }
        }
        .profile-menu:hover .profile-dropdown-menu {
            display: block;
        }
        .profile-dropdown-menu:hover {
            display: block;
        }
        .roney-main-container {
            min-height: 70vh;
            padding: 0 0 0 3em;
        }
    }
}
</style>

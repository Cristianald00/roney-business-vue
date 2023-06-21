<template>
    <div class="module-view-container">
        <!-- SECTION: Center -->
        <div class="module-view-center">
            <h1 class="dashboard-title">Hi {{ user.name }}!</h1>

            <!-- SECTION: No Team Warning -->
            <div v-if="!hasOrganization" class="create-item-alert">
                <h1>Hey! You don't have any Team yet.</h1>
                <br>
                <p>Request an invitation from your organization's admin to join their team. <br><br>After receiving the invite, switch to the team by accessing the top-right profile menu and selecting the teams dropdown.</p>
                <br><br>
                <span style="display: block; width-600px; border-bottom: 1px solid rgb(0, 189, 126, 0.5);"></span>
                <br>
                <p>or</p>
                <br>
                <p>Initiate your own team and start fresh!</p>
                <SubmitButtonComponent
                    :title="'Create Team'"
                    customClass="default"
                    @onAction="goCreateNewOrganization"
                />
            </div>

            <!-- SECTION: Dashboard -->
            <div v-if="hasOrganization" class="">
                <div class="dashboard-card" @click="goViewExpenses">
                    <h3>Expenses</h3>
                    <font-awesome-icon icon="fa-solid fa-receipt" />
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

export default defineComponent({
    components: {
        // Import and register any components you want to use
    },
    data() {
        return {
        }
    },
    computed: {
        hasOrganization() {
			return userStore().user && userStore().user.current_organization ? true : false
		},
        user() {
			return userStore().user
		}
    },
    methods: {
        goCreateNewOrganization() {
            this.$router.push('/organizations?action=new')
        },
        goViewExpenses() {
            this.$router.push('/expenses')
        }
    },
    beforeMount() {
    },
    mounted() {
    },
    watch: {
    },
})
</script>

<style lang="scss" scoped>
@import '@/styles/ModuleViewContainer.scss';

.dashboard-title {
    padding: 12px 0;
    margin-bottom: 30px;
}

.dashboard-card {
    cursor: pointer;
    display: inline-block;
    width: 300px;
    padding: 20px 18px 30px;
    text-align: center;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 0px 3px #dad9d9;
    transition: transform 0.3s ease;
    h3 {
        margin-bottom: 1em;
    }
    svg {
        font-size: 50px;
    }
}
.dashboard-card:hover {
    transform: translateY(-5px);
}

.create-item-alert {
    margin-top: 2em;
    text-align: center;
    p {
        display: block;
        margin: auto;
        max-width: 700px;
        font-size: 18px;
    }
    button {
        margin-top: 2em;
    }
}
</style>

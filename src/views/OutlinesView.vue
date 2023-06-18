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

            <!-- SECTION: List items -->
            <div class="module-group-list">
                <div
                    class="module-group-list-item"
                    v-for="item in outlines"
                    :key="item.id"
                >
                    <p>{{ item.name }}</p>
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
                description: null
            },
            view: 'list'
        }
    },
    computed: {
        outlines() {
			return outlineStore().outlines
		},
    },
    watch: {
    },
    methods: {
        goCreateGroup() {
            const store = outlineStore()
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
        console.log('mounted')
        console.log(this.$route.query)
        if ( this.$route.query.action ) {
            const action = this.$route.query.action
            if ( action == 'new' ) {
                this.view = 'create'
            }
        }
        this.loadOutlines()
    },
})
</script>

<style lang="scss" scoped>
@import '@/styles/ModuleViewContainer.scss';
</style>

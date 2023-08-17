<template>
	<div class="groups-switcher-component">
		<button
			v-for="group in groups"
			type="button"
			:name="'group-' + group.id"
			:class="{
				'group-item': true,
				'group-selected-item': group.is_selected
			}"
			@click="toggleGroupSelection(group)"
		>
			{{ group.name }}
		</button>
		<button
			v-if="(role <= 2)"
			type="button"
			name="group-new-btn"
			class="group-item"
			@click="toggleAddNewGroup()"
		>
			<font-awesome-icon icon="fa-solid fa-plus" />
		</button>
	</div>
</template>

<script>
export default {
	name: 'GroupsNavigationComponent',
	props: {
		currentUser: {
			required: true,
			type: Object
		},
		groups: {
			required: true,
			type: Array
		},
		role: {
			default: false,
			required: true,
			type: Boolean
		}
	},
	data() {
		return {
		}
	},
	computed: {

	},
	methods: {
		toggleAddNewGroup() {
			// Notify the parent component
			this.$emit('onClickedAddNew')
		},
		toggleGroupSelection(group) {
			// Notify the parent component
			this.$emit('onClicked', group)
		}
	},
	watch: {}
}
</script>

<style lang="scss" scoped>
.groups-switcher-component {

	.group-item {
		cursor: pointer;
		display: inline-block;
		padding: var(--inputPaddingBig);
		background: transparent;
		border: none;
		border-bottom: 1px solid var(--colorGray);
		border-radius: 10px 10px 0px 0px;
		box-shadow: 5px -2px 5px var(--colorGray);
		vertical-align: bottom;
		transition: padding 0.3s;
	}
	.group-item:hover {
		padding-bottom: 16px;
	}

	.group-selected-item {
		padding: 14px 40px;
		font-size: 24px;
		font-weight: 700;
		border: none;
	}
	.group-selected-item:hover {
		padding-bottom: 14px;
	}

}
</style>

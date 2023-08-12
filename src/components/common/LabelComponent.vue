<template>
	<div :class="className">
		<span>{{ title }}</span>
	</div>
</template>

<script>
export default {
	name: 'LabelComponent',
	props: {
		id: String,
		title: String,
		customClass: {
			default: 'default',
			type: String
		}
	},
	data() {
		return {
			className: 'label-container ' + this.customClass
		}
	},
	computed: {
	},
	watch: {
	},
	methods: {
	},
	mounted() {
	}
}
</script>

<style lang="scss" scoped>
.label-container {
	display: inline-block;
	width: auto;

	span {
		display: inline-block;
		color: var(--colorLightBlack);
		letter-spacing: 0.12px;
		font: normal normal normal 13px/26px Montserrat;
		font-size: 13px;
		text-align: left;
	}
}
</style>

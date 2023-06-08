<template>
	<button
		name="button"
		type="submit"
		:class="className"
		:disabled="disabledButton"
		:title="helper"
		@click="buttonClicked"
	>
		<font-awesome-icon :icon="icon" />
		<span v-if="title">{{ title }}</span>
	</button>
</template>

<script>
import router from '@/router'

export default {
	name: 'IconButtonComponent',
	props: {
		icon: {
			required: true,
			type: String
		},
		customClass: {
			default: 'default',
			type: String
		},
		selected: {
			required: false,
			default: false,
			type: Boolean
		},
		destination: {
			required: false,
			default: '',
			type: String
		},
		title: {
			required: false,
			default: null,
			type: String
		},
		helper: {
			required: false,
			default: '',
			type: String
		}
	},
	data() {
		return {
			className:
				'icon-button-component'
				+ ' '
				+ this.customClass
				+ (this.selected ? ' selected' : ' ')
		}
	},
	computed: {
		disabledButton() {
			return false
		},
		colorString() {
			return this.color ? this.color : 'secondary'
		},
		buttonExplanation() {
			if (this.icon == 'big-icon') {
				return 'Create'
			}
			if (this.icon == 'fa-solid fa-copy') {
				return 'Copy'
			}
			if (this.icon == 'fa-solid fa-file') {
				return 'Form'
			}
			if (this.icon == 'fa-solid fa-timeline') {
				return 'Stage'
			}
			if (this.icon == 'fa-solid fa-square-check') {
				return 'Actions'
			}
			if (this.icon == 'fa-solid fa-file') {
				return 'Form'
			}
			if (this.icon == 'fa-solid fa-message') {
				return 'Chat'
			}
			if (this.icon == 'fa-solid fa-clock-rotate-left') {
				return 'Activities'
			}
			if (this.icon == 'fa-solid fa-up-right-and-down-left-from-center') {
				return 'Expand'
			}
			if (this.icon == 'fa-solid fa-xmark') {
				return 'Exit'
			}
			if (this.icon == 'fa-solid fa-rectangle-list') {
				return 'Details'
			}
			if (this.icon == 'fa-solid fa-calendar-check') {
				return 'Action Items'
			}
			if (this.icon == 'fa-solid fa-trash') {
				return 'Archive'
			}
			if (
				this.icon == 'fa-solid fa-gear'
				|| this.icon == 'fa fa-solid fa-gear'
			) {
				return 'Settings'
			}
			if (this.icon == 'fa-solid fa-pen') {
				return 'Edit'
			}
			if (this.icon == 'fa-solid fa-download') {
				return 'Download'
			}
			if (this.icon == 'fa-solid fa-trash') {
				return 'Remove'
			}
			if (this.icon == 'fa-solid fa-arrows-rotate') {
				return 'Refresh'
			}
			if (this.icon == 'fa-solid fa-search') {
				return 'Search Key'
			}
			if (this.icon == 'fa-solid fa-angle-left') {
				return 'Previous'
			}
			if (this.icon == 'fa-solid fa-angle-right') {
				return 'Next'
			}
			if (this.icon == 'fa-solid fa-arrow-rotate-right') {
				return 'Refresh'
			}
			if (this.icon == 'fa-solid fa-pen-to-square') {
				return 'Edit'
			}
			if (this.icon == 'fa fa-arrow-up') {
				return 'Sort'
			}
			if (this.icon == 'fa fa-arrow-down') {
				return 'Sort'
			}
			if (this.icon == 'fa fa-plus-circle') {
				return 'Add'
			}
			if (this.icon == 'fa-solid fa-bell-slash') {
				return 'Turn off notifications'
			}
			if (this.icon == 'fa-solid fa-bell') {
				return 'Turn on notifications'
			}
			if (this.icon == 'fa-solid fa-box-archive') {
				return 'Archive'
			}
			if (this.icon == 'fa fa-solid fa-bell') {
				return 'Notifications'
			}
			return ''
		}
	},
	methods: {
		buttonClicked() {
			// If is has destination, redirect
			if (this.destination) {
				router.replace(this.destination)
			}

			// If back action, return it to parent:
			this.$emit('onAction')
		}
	},
	watch: {
		selected(newValue) {
			this.className
				= 'button'
				+ ' '
				+ this.customClass
				+ (this.selected ? ' selected' : ' ')
		}
	}
}
</script>

<style lang="scss" scoped>
.icon-button-component {
	cursor: pointer;
	display: inline-block;
	background: transparent;
	padding: 5px 8px;
	margin: 0px 0.3em;
	border-radius: 6px;
	border: none;
	color: var(--colorLetterBlack);
	span {
		padding: var(--inputPadding);
	}
}
.light {
	color: var(--colorWhite);
}
.light-gray {
	color: #afbbc6;
}

.no-rounded {
	border-radius: 0px;
}

.small {
	font-size: 1em;
}
.medium {
	font-size: 1.2em;
}
.big {
	font-size: 1.5em;
}

.border {
	border: 1px solid black;
}

.selected {
	color: var(--colorRoneyBlue);
	border-bottom: 5px solid var(--colorRoneyBlue);
}

.red-hover:hover {
	color: var(--colorRed);
}
</style>

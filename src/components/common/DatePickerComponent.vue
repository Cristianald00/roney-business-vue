<template>
	<div :class="containerStyle">
		<input
			type="date"
			:id="id"
			:name="name"
			:class="className"
			v-bind:value="value"
			v-on:input="validateData($event.target.value)"
			pattern="\d{4}-\d{2}-\d{2}"
			:disabled="disabled"
		/>
	</div>
</template>

<script>
export default {
	name: 'DatePickerComponent',
	props: {
		id: String,
		name: String,
		customClass: {
			default: 'default',
			type: String
		},
		isDarkStyle: {
			default: 'off',
			type: String
		},
		placeholder: String,
		errors: {
			type: Object,
			default: () => {
				required: ''
			}
		},
		value: [String, Number],
		disabled: {
			type: Boolean,
			required: false,
			default: false,
			note: 'Disable the datepicker'
		}
	},
	data() {
		return {
			className:
				(this.disabled == true
					? 'date-picker-disabled-style'
					: 'date-picker')
				+ ' '
				+ this.customClass,
			errorMessage: ''
		}
	},
	computed: {
		containerStyle() {
			return this.isDarkStyle == 'on'
				? 'date-container dark-style'
				: 'date-container'
		}
	},
	watch: {
		disabled(newVal) {
			this.className
				= (newVal == true
					? 'date-picker-disabled-style'
					: 'date-picker')
				+ ' '
				+ this.customClass
		}
	},
	methods: {
		validateData(value) {
			let message = ''
			// Validate if field is required
			if (this.errors) {
				const required = this.errors.required
					? this.errors.required
					: null

				if (required && value == '') {
					message = required
				}
				if (message != '') {
					this.errorMessage = message
				}
			}
			// Always emmit changed value
			this.$emit('value', value)
		}
	},
	mounted() {
		this.validateData(this.value)
	}
}
</script>

<style lang="scss" scoped>
.date-container {
	position: relative;
	display: inline-block;

	.date-picker {
		display: inline-block;
		padding: var(--inputPadding);
		color: var(--colorLetterBlack);
		font-size: 13px;
		border: 1px solid #8f8b8b;
		border-radius: 4px;
		letter-spacing: 0.12px;
		font: normal normal normal 13px/26px Montserrat;
		text-align: left;
	}
	.date-picker-disabled-style {
		padding: var(--inputPadding);
		color: var(--colorLetterBlack);
		font-size: 13px;
		border: 1px solid #8f8b8b;
		border-radius: 4px;
		letter-spacing: 0.12px;
		font: normal normal normal 13px/26px Montserrat;
		text-align: left;
		background: #f8f9fb;
	}
	::placeholder {
		/* Supported Chrome, Firefox, Opera, Safari 10.1+ */
		color: #8f8b8b;
		opacity: 1; /* Support for Firefox */
	}
	:-ms-input-placeholder {
		/* Support for Internet Explorer 10-11 */
		color: var(--colorLetterBlack);
	}
	::-ms-input-placeholder {
		/* Support for Microsoft Edge */
		color: var(--colorLetterBlack);
	}
	.small {
		width: 110px;
	}
	.medium {
		width: 210px;
		height: 30px;
	}
	.default {
		max-width: 90%;
		width: 440px;
		height: 36px;
	}
	.wide {
		width: 260px;
	}
	.full-long {
		width: 93%;
		height: 36px;
	}
	.wide-tall {
		width: 460px;
		height: 56px;
		font-size: 16px;
	}
	.long {
		width: 560px;
		height: 36px;
	}
}
.dark-style {
	.date-picker {
		color: var(--colorLetterWhite);
		border: 1px solid var(--colorLetterWhite);
	}
	::placeholder {
		/* Supported Chrome, Firefox, Opera, Safari 10.1+ */
		color: var(--colorLetterWhite);
		opacity: 1; /* Support for Firefox */
	}
	:-ms-input-placeholder {
		/* Support for Internet Explorer 10-11 */
		color: var(--colorLetterWhite);
	}
	::-ms-input-placeholder {
		/* Support for Microsoft Edge */
		color: var(--colorLetterWhite);
	}
}
</style>

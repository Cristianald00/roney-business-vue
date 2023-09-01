<template>
	<div :class="containerStyle">
		<input
			type="time"
			:id="id"
			:name="name"
			:class="className"
			v-bind:value="value"
			v-on:input="validateData($event.target.value)"
			:disabled="disabled"
		/>
	</div>
</template>

<script>
export default {
	name: 'TimePickerComponent',
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
				return { required: '' }
			}
		},
		value: String, // Adjusted the value prop to be of type String
		disabled: {
			type: Boolean,
			default: false,
			note: 'Disable the time picker'
		}
	},
	data() {
		return {
			className:
			(this.disabled ? 'time-picker-disabled-style' : 'time-picker') +
			' ' +
			this.customClass,
			errorMessage: ''
		};
	},
	computed: {
		containerStyle() {
			return this.isDarkStyle === 'on'
			? 'time-container dark-style'
			: 'time-container'
		}
	},
	watch: {
		disabled(newVal) {
			this.className =
			(newVal ? 'time-picker-disabled-style' : 'time-picker') +
			' ' +
			this.customClass
		}
	},
	methods: {
		validateData(value) {
			let message = ''
			// Validate if field is required
			if (this.errors) {
				const required = this.errors.required || null

				if (required && value === '') {
					message = required
				}
				if (message !== '') {
					this.errorMessage = message
				}
			}
			// Always emit changed value
			this.$emit('value', value) // Changed 'value' to 'input' event
		}
	},
	mounted() {
		this.validateData(this.value)
	}
};
</script>

<style lang="scss" scoped>
.time-container {
	position: relative;
	display: inline-block;

	.time-picker {
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

	.time-picker-disabled-style {
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
	.time-picker {
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

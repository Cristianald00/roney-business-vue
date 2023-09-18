<template>
	<div class="input-out-container" style="display: inline-block">
		<span class="error-message">{{ errorMessage }}</span>
		<div :class="containerStyle">
			<input
				:id="id"
				:name="name"
				:type="theType"
				:class="className"
				:placeholder="placeholder"
				:disabled="disabled"
				autocomplete="off"
				v-bind:value="value"
				v-on:input="validateData($event.target.value)"
			/>
			<button
				v-if="isPassword"
				type="button"
				name="is_password"
				:class="passBoxClassName"
				:disabled="disabled"
				@click="togglePasswordVisibility()"
			>
				<i
					class="fa-solid"
					:class="{
						'fa-eye-slash': showPassword,
						'fa-eye': !showPassword
					}"
				></i>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'InputComponent',
	props: {
		id: String,
		name: String,
		type: {
			type: String,
			default: 'text'
		},
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
		autocomplete: {
			type: String,
			default: 'off'
		},
		value: [String, Number],
		disabled: {
			type: Boolean,
			required: false,
			default: false,
			note: 'Disable the input'
		}
	},
	data() {
		return {
			className:
				(this.disabled == true
					? 'text-input-disabled-style'
					: 'text-input')
				+ ' '
				+ this.customClass,
			passBoxClassName: 'is-password-btn pass-' + this.customClass,
			errorMessage: '',
			theType: this.type,
			showPassword: false
		}
	},
	computed: {
		disabledField() {
			return false
		},
		isPassword() {
			return this.type == 'password'
		},
		containerStyle() {
			return this.isDarkStyle == 'on'
				? 'input-container dark-style'
				: 'input-container'
		},
		disabledStyle() {
			return this.className
		}
	},
	watch: {
		className(newVal) {
			// this.className = newVal
		},
		disabled(newVal) {
			this.className
				= (newVal == true ? 'text-input-disabled-style' : 'text-input')
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
		},
		togglePasswordVisibility() {
			this.theType = this.theType == 'password' ? 'text' : 'password'
			this.showPassword = !this.showPassword
		}
	}
}
</script>

<style lang="scss" scoped>
.error-message {
	color: #e83239;
	font-size: 16px;
}

.input-out-container {
	display: inline-block;
	max-width: 100%;
}

.input-container {
	position: relative;
	display: inline-block;
	max-width: 100%;
	margin: auto;

	.text-input {
		display: block;
		padding: var(--inputPadding);
		color: var(--colorLetterBlack);
		border: 1px solid #8f8b8b;
		border-radius: 4px;
		letter-spacing: 0.12px;
		font-size: 14px;
	}
	.text-input-disabled-style {
		display: block;
		padding: var(--inputPadding);
		color: var(--colorLetterBlack);
		border: 1px solid #8f8b8b;
		border-radius: 4px;
		letter-spacing: 0.12px;
		font-size: 14px;
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

	.tiny {
		width: 55px;
	}
	.smaller {
		width: 75px;
	}
	.small {
		width: 110px;
	}
	.medium {
		width: 210px;
	}
	.default {
		width: 400px;
		max-width: 100%;
	}
	.wide {
		width: 260px;
	}
	.wider {
		width: 460px;
	}
	.wide-tall {
		width: 460px;
		height: 56px;
		font-size: 16px;
	}
	.wide-long {
		width: 655px;
	}
	.is-password-btn {
		position: absolute;
		top: 20%;
		right: 16px;
		color: var(--colorLetterBlack);
		font-size: 1.2em;
	}
	.pass-default {
		top: 5px;
		right: 18%;
	}

	.no-styles {
		height: 40px;
		border: none;
		border-radius: unset;
		background: transparent;
		border-bottom: 1px solid #8f8b8b;
	}
}

.dark-style {
	.text-input {
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
	.is-password-btn {
		color: var(--colorLetterWhite);
	}
}
</style>

<template>
	<div class="dropdown" v-if="options">
		<!-- Dropdown Input -->
		<input
			:class="className"
			:name="name"
			@blur="exit()"
			@keyup="keyMonitor"
			:disabled="disabled"
			@focus="showOptions()"
			v-model="currentValue"
			:placeholder="placeholder"
			autocomplete="off"
		/>

		<!-- Arrow Icon -->
		<i class="arrow-icon fa-solid fa-angle-down"></i>

		<!-- Dropdown Menu -->
		<div class="dropdown-content" v-show="isShowOptions">
			<div v-if="!isSearching && apiSearch" class="begin-typing-helper">
				<i
					class="fa-solid fa-magnifying-glass"
					style="color: #8e8585"
				></i>
				Begin typing to search ...
			</div>
			<div
				v-else-if="isSearching && apiSearch"
				class="begin-typing-helper"
			>
				<i
					class="fa-sharp fa-regular fa-circle"
					style="color: #4cc1b7"
				></i>
				Searching ...
			</div>
			<div
				class="dropdown-item"
				@mousedown="selectOption(option)"
				v-for="(option, index) in filteredOptions"
				:key="index"
			>
				<span v-if="isIcon"><i :class="option.id"></i></span>
				{{ option[propertyNameForDropdown] || option.id || option }}
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'DropdownAutoloadComponent',
	props: {
		name: {
			type: String,
			required: false,
			default: 'dropdown',
			note: 'Input name'
		},
		options: {
			type: Array,
			required: false,
			default: function () {
				return []
			},
			note: 'Options of dropdown. An array of options with id and name'
		},
		entity: {
			type: String,
			required: false,
			default: null
		},
		apiSearch: {
			type: Boolean,
			required: false,
			default: false
		},
		customClass: {
			type: String,
			required: false,
			default: 'default'
		},
		placeholder: {
			type: String,
			required: false,
			default: 'Please select an option',
			note: 'Placeholder of dropdown'
		},
		allowBlank: {
			type: Boolean,
			required: false,
			default: false,
			note: 'Flag to include a blank record within dropdown options'
		},
		disabled: {
			type: Boolean,
			required: false,
			default: false,
			note: 'Disable the dropdown'
		},
		maxItem: {
			type: Number,
			required: false,
			default: 30,
			note: 'Max items showing'
		},
		errors: {
			type: Object,
			default: () => {
				required: ''
			}
		},
		value: {
			type: [String, Number, Object, null]
		},
		isIcon: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			className:
				(this.disabled == true
					? 'dropdown-input-disabled-style'
					: 'dropdown-input')
				+ ' '
				+ this.customClass,
			selected: {},
			filteredOptions: [],
			currentValue: null,
			isShowOptions: false,
			isSearching: false,
			typingTimer: null,
			typingTimerMilliseconds: 100
		}
	},
	computed: {
		propertyNameForDropdown() {
			if (this.entity && this.entity != '') {
				// NOTE: Temporal solution, eventually we sould get the property to be used from each model
				const namesByClassesArray = {
					documents: 'name',
					ccrs: 'cc_number'
				}
				return namesByClassesArray[this.entity] != null
					? namesByClassesArray[this.entity]
					: 'name'
			}
			return 'name'
		}
	},
	methods: {
		// METHODS: Initial Data
		setInitialData() {
			// Sanitize value for dropdown
			let currentOption = null
			const value = this.value

			// Set filteredOptions if provided options are not empty
			if (this.options.length > 0 && this.options[0] != null) {
				this.filteredOptions = this.options
			}

			// If:
			// - Value is already an object, select name
			// - And did not provide options array
			const propertyName = this.propertyNameForDropdown
			if (value && value[propertyName] && this.options.length < 1) {
				this.currentValue = value[propertyName]
			} else if (value) {
				// If:
				// - Value is not an object, set name from options
				for (const option of this.options) {
					if (option != null && option.id == value) {
						currentOption = option
					}
				}
				if (currentOption != null && currentOption[propertyName]) {
					this.selectOption(currentOption)
					this.currentValue = currentOption[propertyName]
				}
			} else if (value == null || value == '') {
				// If:
				// - Value set to null, clear dropdown selection
				this.selected = null
				this.currentValue = null
			}
		},

		// METHODS: Filter Data
		async filterOptions() {
			const filtered = []
			let serverOptions = null
			const regOption = new RegExp(this.currentValue, 'g') // g: global search, i: case sensitive search

			// Search from server if api=true, entity set, and showing options box
			if (this.apiSearch && this.entity && this.isShowOptions) {
				const keyword = this.currentValue
				if (keyword != null && keyword != '' && keyword.length >= 3) {
					this.isSearching = true
					// Minimum 3 characters to do search
					const params = {
						page: 1,
						per_page: 50,
						keyword: keyword,
						list_type: 'for_autocompletion'
					}
					await axios
						.get('/' + this.entity, {
							params
						})
						.then((response) => {
							serverOptions = response.data.data
							this.isSearching = false
						})
						.finally(() => {
							this.isSearching = false
						})
				}
			}

			// Define options array
			const defaultOptions
				= this.options.length > 0 && this.options[0] != null
					? this.options
					: []
			const optionsToLoop = serverOptions ? serverOptions : defaultOptions

			// Include blank option if applicable & if not already added
			if (this.allowBlank) {
				if (optionsToLoop) {
					const blankOption = { id: null, name: '...' }
					const alreadyExists = optionsToLoop.some(function (option) {
						return option.id === null && option.name === '...'
					})
					if (!alreadyExists) {
						optionsToLoop.unshift(blankOption)
					}
				}
			}

			const propertyName = this.propertyNameForDropdown
			// Loop and display options
			for (const option of optionsToLoop) {
				// Only filter valid options. The ones with not null name
				if (option[propertyName] != null) {
					// Match options by name, based on keywords entered by user
					if (
						(option[propertyName].match(regOption) &&
							!serverOptions)
						|| serverOptions
					) {
						if (serverOptions) {
							// No need to use RegExp since is already filtered by server
							filtered.push(option)
						} else {
							if (filtered.length < this.maxItem) {
								filtered.push(option)
							}
						}
					}
				}
			}

			// Refresh options if not empty
			if (filtered.length > 0) {
				this.filteredOptions = filtered
			}
		},
		selectOption(option) {
			this.selected = option
			// If selected empty option, set value as null
			if (this.selected.id == null) {
				this.currentValue = null
			} else {
				// If selected valid option, set value from option name
				this.currentValue = this.selected[this.propertyNameForDropdown]
			}
			this.isShowOptions = false
		},
		showOptions() {
			if (!this.disabled) {
				this.currentValue = ''
				this.isShowOptions = true
			}
		},
		exit() {
			if (!this.selected || !this.selected.id) {
				// this.selected = {}
				this.currentValue = ''
				// Notify Parent of changes
				this.$emit('onValueChanged', null)
			} else {
				this.currentValue = this.selected[this.propertyNameForDropdown]
				// Notify Parent of changes
				this.$emit('onValueChanged', this.selected)
			}

			this.isSearching = false
			this.isShowOptions = false
		},
		keyMonitor: function (event) {
			// Select option when pressing Enter
			if (event.key === 'Enter' && this.filteredOptions[0]) {
				this.selectOption(this.filteredOptions[0])
			}
		},

		// METHODS: Validate data
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
	watch: {
		currentValue(newVal) {
			// If typing, initiate countdown before sending request. To reduce # of API requests
			if (this.isShowOptions) {
				// Wait seconds after typing finishes before making the request
				clearTimeout(this.typingTimer)
				this.typingTimer = setTimeout(() => {
					if (!this.istyping) {
						this.filterOptions()
					}
				}, this.typingTimerMilliseconds)
			}

			// Update filters
			this.$emit('filter', newVal)
			// Validate if field is required
			this.validateData(this.selected ? this.selected.id : null)
		},
		options() {
			this.setInitialData()
		},
		value(newVa) {
			this.setInitialData()
		},
		disabled(newVal) {
			this.className
				= (newVal == true
					? 'dropdown-input-disabled-style'
					: 'dropdown-input')
				+ ' '
				+ this.customClass
		}
	},
	mounted() {
		this.setInitialData()
	}
}
</script>

<style lang="scss" scoped>
.dropdown {
	position: relative;
	display: inline-block;
	max-width: 100%;
	margin: auto;
	background: white;

	.dropdown-input {
		position: relative;
		z-index: 2;
		background: rgba(#ffffff, 0);
		cursor: pointer;
		border: 1px solid #8f8b8b;
		border-radius: 4px;
		color: var(--colorLetterGray);
		display: block;
		font-size: 14px;
		padding: var(--inputPadding);
		letter-spacing: 0.12px;
	}
	.dropdown-input-disabled-style {
		position: relative;
		z-index: 2;
		background: rgba(#ffffff, 0);
		cursor: pointer;
		border: 1px solid #8f8b8b;
		border-radius: 4px;
		color: var(--colorLetterGray);
		display: block;
		font-size: 14px;
		padding: var(--inputPadding);
		letter-spacing: 0.12px;
		background: #f8f9fb;
	}
	i {
		position: absolute;
		z-index: 1;
		top: 30%;
		right: 12%;
		color: var(--colorLetterBlack);
		font-size: 0.9em;
	}
	.tiny-narrow {
		width: 40px;
		padding: 4px;
		font-size: 11px;
	}
	.small {
		width: 120px;
	}
	.small-narrow {
		width: 100px;
		padding: 4px;
		font-size: 11px;
	}
	.default {
		min-width: 250px;
		max-width: 250px;
	}
	.wide {
		width: 460px;
		max-width: 90%;
	}
	.wide-tall {
		width: 460px;
		height: 56px;
		font-size: 16px;
	}

	.light {
		background: #ffffff;
		color: #33313e;
	}

	.dropdown-content {
		position: absolute;
		background-color: #fff;
		color: var(--colorLetterGray);
		min-width: 248px;
		max-width: 248px;
		max-height: 248px;
		border: 1px solid #e7ecf5;
		border-radius: 5px;
		box-shadow: 0px 3px 7px #00000029;
		overflow: auto;
		z-index: 10;

		.dropdown-item,
		.begin-typing-helper {
			display: block;
			font-size: 14px;
			line-height: 20px;
			padding: 12px 10px;
			text-align: left;
			text-decoration: none;
			letter-spacing: 0.12px;
			color: rgba(#33313e, 0.76);
			cursor: pointer;
		}

		.dropdown-item {
			i {
				position: relative;
				left: 0px;
			}
			&:hover {
				background-color: #e7ecf5;
			}
		}

		.begin-typing-helper {
			line-height: 10px;
			background: var(--colorWhiteDarker);
			i {
				position: relative;
				left: 0px;
				padding-right: 10px;
				color: #8f8b8b;
			}
		}
	}
	.dropdown:hover .dropdowncontent {
		display: block;
	}
}
</style>

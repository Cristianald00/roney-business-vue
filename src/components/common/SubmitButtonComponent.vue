<template>
	<button
		name="button"
		type="submit"
		:class="className"
		:disabled="disabledButton"
		@click="buttonClicked"
	>
		<div v-if="isLoading" :class="animationClassName">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<span v-else>{{ title }}</span>
	</button>
</template>

<script>
export default {
	name: 'SubmitButtonComponent',
	props: {
		title: {
			required: true,
			type: String
		},
		isLoading: {
			default: false,
			type: Boolean
		},
		customClass: {
			default: 'default',
			type: String
		}
	},
	data() {
		return {
			className: 'submit-button' + ' ' + this.customClass,
			animationClassName:
				'button-loading-animation' + ' ' + this.customClass
		}
	},
	computed: {
		disabledButton() {
			if (this.isLoading) {
				return true
			}
			return false
		},
		colorString() {
			return this.color ? this.color : 'secondary'
		}
	},
	methods: {
		buttonClicked() {
			this.$emit('onAction')
		}
	},
	watch: {}
}
</script>

<style lang="scss" scoped>
.submit-button {
	cursor: pointer;
	background: #6fac9e;
	background: #4cc29d;
	padding: var(--inputPadding);
	border-radius: 6px;
	border: none;
	color: #e8fefe;
	font-family: 'Open Sans', sans-serif;
	font-size: 14px;
	letter-spacing: 1px;
	span {
		font-weight: 700;
	}
}

/* SIZE STYLES */
.small {
	width: 110px;
}
.small-narrow {
	width: 110px;
	height: 30px;
	padding: 0px;
}
.semi {
	width: 160px;
}
.default {
	width: 240px;
}
.big {
	width: 460px;
	height: 56px;
}
.wide {
	width: 95%;
}

/* TYPE STYLES */
.gray-submit {
	background: var(--colorGray);
	color: var(--colorLetterBlack);
}
.btn-delete {
	color: white;
}

/* LOADING ANIMAITON STYLES */
.button-loading-animation {
	color: official;
	display: block;
	margin: auto;
	left: 45%;
	position: relative;
	height: 30px;
}
.button-loading-animation div {
	transform-origin: 10px 15px;
	animation: button-loading-animation 1.2s linear infinite;
}
.button-loading-animation div:after {
	content: ' ';
	display: block;
	position: absolute;
	top: 0px;
	left: 10px;
	width: 3px;
	height: 8px;
	border-radius: 20%;
	background: white;
}
.button-loading-animation div:nth-child(1) {
	transform: rotate(0deg);
	animation-delay: -1.1s;
}
.button-loading-animation div:nth-child(2) {
	transform: rotate(30deg);
	animation-delay: -1s;
}
.button-loading-animation div:nth-child(3) {
	transform: rotate(60deg);
	animation-delay: -0.9s;
}
.button-loading-animation div:nth-child(4) {
	transform: rotate(90deg);
	animation-delay: -0.8s;
}
.button-loading-animation div:nth-child(5) {
	transform: rotate(120deg);
	animation-delay: -0.7s;
}
.button-loading-animation div:nth-child(6) {
	transform: rotate(150deg);
	animation-delay: -0.6s;
}
.button-loading-animation div:nth-child(7) {
	transform: rotate(180deg);
	animation-delay: -0.5s;
}
.button-loading-animation div:nth-child(8) {
	transform: rotate(210deg);
	animation-delay: -0.4s;
}
.button-loading-animation div:nth-child(9) {
	transform: rotate(240deg);
	animation-delay: -0.3s;
}
.button-loading-animation div:nth-child(10) {
	transform: rotate(270deg);
	animation-delay: -0.2s;
}
.button-loading-animation div:nth-child(11) {
	transform: rotate(300deg);
	animation-delay: -0.1s;
}
.button-loading-animation div:nth-child(12) {
	transform: rotate(330deg);
	animation-delay: 0s;
}
@keyframes button-loading-animation {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
</style>

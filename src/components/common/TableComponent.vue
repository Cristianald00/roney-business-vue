<template>
	<table class="table" :class="className">
		<thead>
			<tr>
				<slot name="head"></slot>
			</tr>
		</thead>
		<tbody>
			<slot name="body"></slot>
		</tbody>
		<tfoot class="table-footer">
			<slot name="footer-content"></slot>
		</tfoot>
	</table>
</template>

<script>

export default {
	name: 'TableComponent',
	props: {
		customClass: {
			default: 'default',
			type: String
		}
	},
	data() {
		return {
			className: this.customClass
		}
	},
	computed: {},
	watch: {},
	methods: {
		loadNextPage() {
			// Load next page
		},
		loadPreviusPage() {
			// Load previous page
		}
	}
}
</script>

<style lang="scss">
.default {
	width: 100%;
	border-collapse: separate;
	thead {
		th {
			font-weight: 500;
			font-size: 13px;
			font-family: Montserrat;
			padding: 1em 1em;
		}
	}
	tbody {
		width: 100%;
		tr {
			width: 100%;
			font-size: 13px;
			font-family: Montserrat;
			// box-shadow: 0px 5px 30px #00000019;
			// -webkit-box-shadow: 0px 5px 30px #00000019; // Safari, android supports
			cursor: pointer;

			td {
				padding: 1em 1em;
			}
		}
		tr:nth-child(even) {
			background-color: white; /* Set the background color for even rows */
		}
		tr:nth-child(odd) {
			background-color: #f7f7f1; /* Set the background color for odd rows */
		}
	}

	tfoot {
		td {
			text-align: right;

			.items-per-page-label {
				font-weight: 500;
				font-size: 15px/26px;
				margin-right: 1em;
			}
			.items-on-page-label {
				font: normal normal normal 15px/26px Montserrat;
				margin-left: 2em;
				margin-right: 0.5em;
			}
		}
	}
}

.non-shadow {
	width: 100%;
	border-collapse: separate;
	thead {
		th {
			font-weight: 500;
			font-size: 13px;
			font-family: Montserrat;
		}
	}
	tbody {
		width: 100%;
		tr {
			cursor: pointer;
			width: 100%;
			td {
				padding: 0.3em;
			}
		}
	}

	tfoot {
		td {
			text-align: right;

			.items-per-page-label {
				font-weight: 500;
				font-size: 15px/26px;
				margin-right: 1em;
			}
			.items-on-page-label {
				font: normal normal normal 15px/26px Montserrat;
				margin-left: 2em;
				margin-right: 0.5em;
			}
		}
	}
}

.cell-type-currency {
	font-weight: 500;
	text-align: right;
	color: #209455;
}
.cell-type-menu {
	text-align: center;
}

</style>

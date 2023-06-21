export default {
	components: {
	},
	data() {
		return {
		}
	},
	computed: {
	},
	methods: {
		convertNumberToCurrency(number) {
			// Convert to number if it's a string
			const parsedNumber = typeof number === 'string' ? parseFloat(number) : number

			// Check if the parsedNumber is a valid number
			if (isNaN(parsedNumber)) {
				return '';
			}

			// Format the number as currency
			const currencyFormattedNumber = parsedNumber.toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD'
			});

			return currencyFormattedNumber;
		}
	}
}

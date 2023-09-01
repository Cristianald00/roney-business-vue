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
        convertNumberToDecimals(number) {
            let theNumber = number
            // If is string convert
            if (typeof theNumber === 'string') {
                theNumber = parseFloat(theNumber)
            }
            if (theNumber) {
                console.log("NUMBERL : ", theNumber)
                return theNumber.toFixed(2)
            }
        },
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
        },
        convertMilitarTimeToNormalTime(time) {
            if (time) {
                const [hours, minutes] = time.split(':').map(Number)

                if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
                    const period = hours >= 12 ? 'PM' : 'AM'
                    const hours12 = (hours % 12) || 12
                    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`
                } else {
                    return 'Invalid time format'
                }
            } else {
                return ''
            }
        },
        convertDateFormat(dateString) {
            if (dateString) {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const date = new Date(dateString);
                return date.toLocaleDateString('es-ES', options);
            } else {
                return '';
            }
        }
    }
}

<template>
    <div :class="className">
        <div id="printable-modal" class="modal-subcontainer">
            <div
                class="modal-table-header"
            >
                <div style="display: inline-block; padding: 10px; 50px">
                    <img
                        class="header-logo"
                        style="width: 70px;"
                        src="/public/assets/FuenteDeCafe.png" alt=""
                    >
                </div>
                <div style="display: inline-block; color: white;">
                    <span style="display: inline-block; width: 100px; font-weight: bold; font-size: 20px;">Barista </span>
                    <span style="display: inline-block; width: 150px; font-size: 20px; text-align: right;">{{ outline.name }}</span>
                    <br>
                    <span style="display: inline-block; width: 100px; font-weight: bold; font-size: 16px;">Fecha </span>
                    <span style="display: inline-block; width: 150px; font-size: 16px; text-align: right;">{{ currentDate }}</span>
                </div>
            </div>

            <div class="modal-table">
                <div class="modal-table-title" style="padding: 20px 0 30px; text-align: right;" v-if="dateFrom || dateTo">
                    <span style="font-weight: bold;">Periodo de pago &nbsp;&nbsp;&nbsp;</span>
                    <span>{{ dateFrom }} &nbsp;&nbsp;&nbsp;hasta &nbsp;&nbsp;&nbsp;{{ dateTo }}</span>
                    <button id="print-button" @click="printContent">Print</button>
                </div>
                <div class="modal-table-title" style="padding: 20px 0 30px; text-align: right;" v-else>
                    <span style="font-weight: bold;">Periodo de pago &nbsp;&nbsp;&nbsp;</span>
                    <span>Todas las fechas, ningún rango seleccionado.</span>
                </div>

                <table v-if="timesheets && timesheets.length > 0">
                    <tr>
                        <th
                            v-for="header in headers"
                            :key="header.id"
                            style="text-align: left; font-weight: bold; background: #F5C241; padding: 10px 10px;"
                        >
                            {{ header.text }}
                        </th>
                    </tr>

                    <tr
                        v-for="item in timesheets"
                        :key="item.id"
                    >
                        <td style="text-align: right;">{{ convertDateFormat(item.shift_date) }}</td>
                        <td :style="item.total_hours == null || item.total_hours == 0 ? 'text-align: right; background: lightgray;' : 'text-align: right;'">{{ convertMilitarTimeToNormalTime(item.start_time) }}</td>
                        <td :style="item.total_hours == null || item.total_hours == 0 ? 'text-align: right; background: lightgray;' : 'text-align: right;'">{{ convertMilitarTimeToNormalTime(item.end_time) }}</td>
                        <td style="text-align: right;">{{ convertNumberToDecimals(item.total_hours) }}</td>
                    </tr>

                    <tr><td colspan="4"></td></tr>
                    <tr>
                        <td colspan="4">
                            <div class="options-container">
                                <span @click="isDisplayTotalDeduct = true"><font-awesome-icon icon="fa-solid fa-plus" /> Agregar Adelanto</span>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td colspan="2" style="text-align: left; text-decoration: underline;">Total de horas trabajadas:</td>
                        <td style="text-align: right; background: #F5C241;">{{ convertNumberToDecimals(totalHours) }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td colspan="2" style="text-align: left; text-decoration: underline;">Tarifa por hora:</td>
                        <td style="text-align: right; background: #F5C241;">{{ convertNumberToCurrency(hourPay) }}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td colspan="2" style="text-align: left; text-decoration: underline;">Pago:</td>
                        <td style="text-align: right; background: #F5C241;">{{ convertNumberToCurrency(subTotalPay) }}</td>
                    </tr>

                    <tr><td colspan="4"></td></tr>
                    <tr><td colspan="4"></td></tr>


                    <tr class="total-deduction-field" v-if="isDisplayTotalDeduct">
                        <td></td>
                        <td colspan="2" style="text-align: left; text-decoration: underline;">
                            Adelanto:
                            <span class="total-deduction-field-close" @click="isDisplayTotalDeduct = false" style="font-size: 20px 20px 0px; padding: 5px;">
                                <font-awesome-icon icon="fa-solid fa-xmark" />
                            </span>
                        </td>
                        <td style="text-align: right; background: #F5C241;">
                            <span class="total-deduction-field-input">
                                <InputComponent
                					id="item-advance-pay-input"
                					name="item-advance-pay-input"
                					placeholder="Adelanto"
                                    customClass="small"
                                    :value="totalDeduction"
                                    @input="totalDeduction = $event.target.value"
                				/>
                            </span>
                            <span class="total-deduction-field-label" style="font-weight: bold;">{{ convertNumberToCurrency(totalDeduction) }}</span>
                        </td>
                    </tr>

                    <tr><td colspan="4"></td></tr>
                    <tr><td colspan="4"></td></tr>

                    <tr>
                        <td></td>
                        <td colspan="2" style="text-align: left;  font-weight: bold;">Total:</td>
                        <td style="text-align: right; font-weight: bold;">{{ convertNumberToCurrency(totalPay) }}</td>
                    </tr>

                    <tr>
                        <td colspan="100%">

                        </td>
                    </tr>
                </table>
            </div>
        </div>

        <!-- Close -->
        <span
            style="position: fixed; top: 20px; right: 30px; color: white; font-size: 30px; cursor: pointer;"
            @click="closeModal"
        >
            <font-awesome-icon icon="fa-solid fa-xmark" />
        </span>

        <!-- Hidden iframe for printing -->
        <iframe ref="printFrame" style="display: none;"></iframe>
    </div>
</template>

<script>
import GlobalHelpersMixin from '@/mixins/global-helpers-mixin'

export default {
    name: 'TimesheetSummaryModalSection',
    mixins: [GlobalHelpersMixin],
    props: {
        customClass: {
            default: 'default',
            type: String
        },
        dateFrom: {
            default: '',
            type: String
        },
        dateTo: {
            default: '',
            type: String
        },
        outline: Object,
        timesheets: Array,
    },
    data() {
        return {
            className: 'modal-container ' + this.customClass,
            errorMessage: '',
            headers: [
                { id: 1, text: 'Fecha' },
                { id: 2, text: 'Hora de Entrada' },
                { id: 3, text: 'Hora de Salida' },
                { id: 4, text: 'Horas' }
            ],
            isDisplayTotalDeduct: false,
            subTotalPay: 0,
            totalDeduction: 0,
            totalHours: 0,
            totalPay: 0
        }
    },
    computed: {
        currentDate() {
            return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-')
        }
    },
    watch: {
        timesheets() {
            this.initialSetUp()
        },
        totalDeduction() {
            // In case user delets all, make sure default is 0
            if ( !this.totalDeduction && this.totalDeduction != 0 ) {
                this.totalDeduction = 0
            }
            this.calculateTotals()
        }
    },
    methods: {
        calculateTotals() {
            // Calculate total and subtotal pay
            // If is string convert
            if (typeof this.totalHours === 'string') {
                this.totalHours = parseFloat(this.totalHours)
            }
            // If is string convert
            if (typeof this.hourPay === 'string') {
                this.hourPay = parseFloat(this.hourPay)
            }
            // If is string convert
            if (typeof this.totalDeduction === 'string') {
                this.totalDeduction = parseFloat(this.totalDeduction)
            }

            this.subTotalPay = this.totalHours * this.hourPay
            this.totalPay = this.subTotalPay - this.totalDeduction
        },
        closeModal() {
            this.$emit('closeModal')
        },
        initialSetUp() {
            // Calculate total hours
            let hours = 0
            this.hourPay = this.outline.timesheet_hour_pay
            this.timesheets.forEach( (item, i) => {
                if (item.total_hours) {
                    hours = hours + item.total_hours
                }
            })
            this.totalHours = hours

            this.calculateTotals()
        },
        printContent() {
            const printableContent = document.getElementById('printable-modal');
            const contentToPrint = printableContent.cloneNode(true);

            // Get a reference to the iframe
            const printFrame = this.$refs.printFrame.contentWindow;

            // Open the iframe document for writing
            printFrame.document.open();

            printFrame.document.write('<html><head><title> </title></head><body>');
            printFrame.document.write(contentToPrint.outerHTML);
            printFrame.document.write('</body></html>');
            printFrame.document.close();

            // Print the iframe content
            printFrame.print();
        }
    },
    mounted() {
        this.initialSetUp()
    }
}
</script>

<style lang="scss" scoped>
    .modal-container {
        position: fixed;
        z-index: 100;
        top: 0px;
        left: 0px;
        display: block;
        width: 100%;
        height: 100%;
        padding: 50px 0;
        background: rgba(20, 20, 20, 0.54);
        overflow-y: auto;

        .modal-subcontainer{
            display: block;
            width: 900px;
            max-width: 100%;
            margin: auto;
            background: white;
            border-radius: 10px;
            font-size: 14px;
            text-align: center;

            .modal-table-header {
                display: inline-flex;
                justify-content: space-between;
                width: 100%;
                padding: 20px 50px 0px;
                background: #F5C241;
                border-radius: 10px;
            }

            .modal-table {
                display: inline-block;
                width: auto;
                margin: auto;
                padding-bottom: 50px;

                .modal-table-title {
                    cursor: pointer;
                    button {
                        display: none;
                        margin-left: 20px;
                    }
                }
                .modal-table-title:hover {
                    button {
                        display: inline-block;
                    }
                }

                .options-container {
                    display: none;
                    cursor: pointer;
                }

                table {
                    table-layout: auto;
                    width: auto;
                    border-collapse: collapse; /* Horizontal borders are collapsed */
                    td, th {
                        padding: 4px 10px; /* Adjust the spacing as needed */
                    }

                    .total-deduction-field:hover {
                        cursor: pointer;
                        .total-deduction-field-close {
                            display: inline-block;
                        }
                        .total-deduction-field-input {
                            display: inline-block;
                        }
                        .total-deduction-field-label {
                            display: none;
                        }
                    }
                    .total-deduction-field {
                        .total-deduction-field-close {
                            display: none;
                        }
                        .total-deduction-field-input {
                            display: none;
                        }
                    }
                }
            }

            .modal-table:hover {
                .options-container {
                    display: inline-block;
                }
            }
        }
    }

    /* Define styles for printing */
    @media print {
        #print-button {
            display: none !important;
        }

        .modal-container {
            position: static;
            display: block;
            width: auto;
            height: auto;
            padding: 0;
            background: none;
            overflow: visible;
        }

        .modal-subcontainer {
            display: block;
            width: 900px;
            max-width: 100%;
            margin: auto;
            background: white;
            border-radius: 10px;
            font-size: 14px;
            text-align: center;
        }

        .modal-table-header {
            display: inline-flex;
            justify-content: space-between;
            width: 100%;
            padding: 20px 50px 0px;
            background: #F5C241;
            border-radius: 10px;
        }

        .modal-table {
            display: inline-block;
            width: auto;
            margin: auto;
            padding-bottom: 50px;

            table {
                table-layout: auto;
                width: auto;
                border-collapse: collapse; /* Horizontal borders are collapsed */
                td, th {
                    padding: 4px 10px; /* Adjust the spacing as needed */
                }

                .total-deduction-field:hover {
                    .total-deduction-field-input {
                        display: inline-block;
                    }
                    .total-deduction-field-label {
                        display: none;
                    }
                }
                .total-deduction-field {
                    .total-deduction-field-input {
                        display: none;
                    }
                }
            }
        }
    }
</style>

import { defineComponent, ref } from 'vue'

export default defineComponent ({
	data() {
        return {
            headers: [
				{
					id: 1,
					text: 'Fecha',
					align: 'left',
					sortable: false,
					value: 'shift_date',
					visible: true
				},
				{
					id: 2,
					text: 'Día de la Semana',
					align: 'left',
					sortable: true,
					value: 'week_date',
					visible: true
				},
				{
					id: 3,
					text: 'Hora de Inicio',
					align: 'left',
					sortable: false,
					value: 'start_time',
					visible: true
				},
				{
					id: 4,
					text: 'Hora de Salida',
					align: 'left',
					sortable: false,
					value: 'end_time',
					visible: true
				},
				{
					id: 5,
					text: 'Horas de Trabajo',
					align: 'right',
					sortable: false,
					value: 'total_hours',
					visible: true
				},
				{
					id: 6,
					text: 'Pago Hora',
					align: 'right',
					sortable: false,
					value: 'hour_pay',
					visible: true
				},
				{
					id: 7,
					text: 'Pago Total',
					align: 'right',
					sortable: false,
					value: 'total_pay',
					visible: true
				},
				{
					id: 8,
					text: '',
					align: 'right',
					sortable: false,
					value: '',
					visible: true
				},
				{
					id: 9,
					text: '',
					align: 'right',
					sortable: false,
					value: '',
					visible: true
				}
			],
        }
    },
	methods: {
	}
})

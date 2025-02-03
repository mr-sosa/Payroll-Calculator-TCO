import { defineStore } from 'pinia';
import jsonData from '../data/payrollCalculator.json';
import { ref } from 'vue';

export const useCalculatorStore = defineStore('calculator', () => {
    const payData = ref(null);
    const positions = ref(null);
    const states = ref(null);
    const timeSlots = ref([
        'Hourly',
        'Monthly',
        'Yearly',
    ]);

    const viewData = () => {
        payData.value = jsonData.TCO;

        positions.value = jsonData.TCO.map((job) => ({
            title: job.name,
            value: job.value,
        }))

        states.value = jsonData.TCO[0].states.map((item) => item.state);
    }

    viewData();

    return {
        payData,
        positions,
        states,
        timeSlots,
    }
});

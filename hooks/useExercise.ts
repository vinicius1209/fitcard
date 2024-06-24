import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise, WorkoutData } from '@/constants/Exercise';



const initialData: WorkoutData = {
    Segunda: [
        {
            color: '#ff7979',
            name: 'Supino Inclinado',
            sets: [
                { reps: '15', weight: '17.5kg' },
                { reps: '12', weight: '20kg' },
                { reps: '10', weight: '25kg' },
                { reps: '8', weight: '27kg' },
            ],
        },
        {
            color: '#badc58',
            name: 'Supino Reto',
            sets: [
                { reps: '15', weight: '17.5kg' },
                { reps: '12', weight: '20kg' },
                { reps: '10', weight: '25kg' },
                { reps: '8', weight: '27kg' },
            ],
        },
        {
            color: '#f9ca24',
            name: 'Flexões',
            sets: [
                { reps: '20', weight: 'Peso corporal' },
                { reps: '15', weight: 'Peso corporal' },
                { reps: '10', weight: 'Peso corporal' },
            ],
        },
    ],
    Terça: [
        {
            color: '#badc58',
            name: 'Barra Livre',
            sets: [
                { reps: '10', weight: 'Peso corporal' },
                { reps: '8', weight: 'Peso corporal' },
                { reps: '6', weight: 'Peso corporal' },
            ],
        },
        {
            color: '#ff7979',
            name: 'Puxada Alta',
            sets: [
                { reps: '15', weight: '50kg' },
                { reps: '12', weight: '55kg' },
                { reps: '10', weight: '60kg' },
            ],
        },
        {
            color: '#6A1B9A',
            name: 'Remada Cavalinho',
            sets: [
                { reps: '15', weight: '40kg' },
                { reps: '12', weight: '45kg' },
                { reps: '10', weight: '50kg' },
            ],
        },
        {
            color: '#f9ca24',
            name: 'Remada Curvada',
            sets: [
                { reps: '15', weight: '40kg' },
                { reps: '12', weight: '45kg' },
                { reps: '10', weight: '50kg' },
            ],
        },
    ],
    Quarta: [
        {
            color: '#FF5252',
            name: 'Bike 30min',
            sets: [
                { reps: '1', weight: '30min' },
            ],
        },
        {
            color: '#1565C0',
            name: 'Abdominais',
            sets: [
                { reps: '20', weight: 'Peso corporal' },
                { reps: '15', weight: 'Peso corporal' },
                { reps: '10', weight: 'Peso corporal' },
            ],
        },
    ],
    Quinta: [
        {
            color: '#4DB6AC',
            name: 'Cadeira Extensora',
            sets: [
                { reps: '15', weight: '30kg' },
                { reps: '12', weight: '35kg' },
                { reps: '10', weight: '40kg' },
            ],
        },
        {
            color: '#00B8D4',
            name: 'Cadeira Flexora',
            sets: [
                { reps: '15', weight: '25kg' },
                { reps: '12', weight: '30kg' },
                { reps: '10', weight: '35kg' },
            ],
        },
        {
            color: '#004D40',
            name: 'Leg Press 90 graus',
            sets: [
                { reps: '15', weight: '100kg' },
                { reps: '12', weight: '120kg' },
                { reps: '10', weight: '140kg' },
            ],
        },
        {
            color: '#F4FF81',
            name: 'Agachamento',
            sets: [
                { reps: '15', weight: '40kg' },
                { reps: '12', weight: '50kg' },
                { reps: '10', weight: '60kg' },
            ],
        },
        {
            color: '#6D4C41',
            name: 'Terra',
            sets: [
                { reps: '15', weight: '50kg' },
                { reps: '12', weight: '60kg' },
                { reps: '10', weight: '70kg' },
            ],
        },
        {
            color: '#FF9E80',
            name: 'Panturrilha',
            sets: [
                { reps: '20', weight: '30kg' },
                { reps: '18', weight: '35kg' },
                { reps: '15', weight: '40kg' },
            ],
        },
        {
            color: '#546E7A',
            name: 'Glúteo',
            sets: [
                { reps: '15', weight: '20kg' },
                { reps: '12', weight: '25kg' },
                { reps: '10', weight: '30kg' },
            ],
        },
    ],
    Sexta: [
        {
            color: '#4A148C',
            name: 'Bíceps Rosta Alternada',
            sets: [
                { reps: '15', weight: '15kg' },
                { reps: '12', weight: '17.5kg' },
                { reps: '10', weight: '20kg' },
            ],
        },
        {
            color: '#64B5F6',
            name: 'Bíceps Martelo',
            sets: [
                { reps: '15', weight: '15kg' },
                { reps: '12', weight: '17.5kg' },
                { reps: '10', weight: '20kg' },
            ],
        },
        {
            color: '#B388FF',
            name: 'Tríceps Corda',
            sets: [
                { reps: '15', weight: '20kg' },
                { reps: '12', weight: '25kg' },
                { reps: '10', weight: '30kg' },
            ],
        },
        {
            color: '#00796B',
            name: 'Tríceps Testa',
            sets: [
                { reps: '15', weight: '20kg' },
                { reps: '12', weight: '25kg' },
                { reps: '10', weight: '30kg' },
            ],
        },
    ],
};

const useExercise = () => {
    const [data, setData] = useState<WorkoutData>(initialData);

    useEffect(() => {
        const loadData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@workout_data');
                if (jsonValue != null) {
                    setData(JSON.parse(jsonValue));
                }
            } catch (e) {
                console.error(e);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        const saveData = async () => {
            try {
                const jsonValue = JSON.stringify(data);
                await AsyncStorage.setItem('@workout_data', jsonValue);
            } catch (e) {
                console.error(e);
            }
        };
        saveData();
    }, [data]);

    const addExercise = (day: string, exercise: Exercise) => {
        const updatedDay = [...data[day], exercise];
        setData({ ...data, [day]: updatedDay });
    };

    return {
        data,
        addExercise
    }

}


export default useExercise
import { useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercise, ExerciseContextType, WorkoutData } from '@/constants/Exercise';

const initialData: WorkoutData = {
    Segunda: [
        {
            color: '#ff7979',
            name: 'Supino Inclinado',
            sets: [
                { reps: '15', weight: '17.5kg', _isCompleted: false },
                { reps: '12', weight: '20kg', _isCompleted: false },
                { reps: '10', weight: '25kg', _isCompleted: false },
                { reps: '8', weight: '27kg', _isCompleted: false },
            ],
        },
        {
            color: '#badc58',
            name: 'Supino Reto',
            sets: [
                { reps: '15', weight: '20kg', _isCompleted: false },
                { reps: '12', weight: '30kg', _isCompleted: false },
                { reps: '10', weight: '40kg', _isCompleted: false },
                { reps: '8', weight: '50kg', _isCompleted: false },
            ],
        },
        {
            color: '#f9ca24',
            name: 'Flexões',
            sets: [
                { reps: '20', weight: 'Peso corporal', _isCompleted: false },
                { reps: '15', weight: 'Peso corporal', _isCompleted: false },
                { reps: '10', weight: 'Peso corporal', _isCompleted: false },
                { reps: '8', weight: 'Peso corporal', _isCompleted: false },
            ],
        },
    ],
    Terça: [
        {
            color: '#badc58',
            name: 'Barra Livre',
            sets: [
                { reps: '10', weight: 'Peso corporal', _isCompleted: false },
                { reps: '8', weight: 'Peso corporal', _isCompleted: false },
                { reps: '6', weight: 'Peso corporal', _isCompleted: false },
            ],
        },
        {
            color: '#ff7979',
            name: 'Puxada Alta',
            sets: [
                { reps: '15', weight: '50kg', _isCompleted: false },
                { reps: '12', weight: '55kg', _isCompleted: false },
                { reps: '10', weight: '60kg', _isCompleted: false },
            ],
        },
    ],
};

type Action =
    | { type: 'INIT_DATA'; data: WorkoutData }
    | { type: 'ON_COMPLETE_STEP'; data: { exerciseName: string; stepIndex: number } }
    | { type: 'ON_COMPLETE_EXERCISE'; data: { exerciseName: string } }
    | { type: 'ADD'; data: { day: string; exercise: Exercise } };

const getDayName = (): string => {
    const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const currentDate = new Date();
    const dayName = daysOfWeek[currentDate.getDay()];
    return dayName;
};

const dayName = getDayName();

const exerciseReducer = (state: WorkoutData, action: Action): WorkoutData => {
    switch (action.type) {
        case 'INIT_DATA':
            return {
                ...state,
                ...action.data
            };
        case 'ON_COMPLETE_STEP':
            return {
                ...state,
                [dayName]: state[dayName].map((exercise: Exercise) => {
                    if (exercise.name === action.data.exerciseName) {
                        exercise.sets[action.data.stepIndex]._isCompleted = !exercise.sets[action.data.stepIndex]._isCompleted;
                    }
                    return exercise;
                })
            };
        case 'ON_COMPLETE_EXERCISE':
            return {
                ...state,
                [dayName]: state[dayName].map((exercise: Exercise) => {
                    if (exercise.name === action.data.exerciseName) {
                        exercise._isCompleted = !exercise._isCompleted;
                    }
                    return exercise;
                })
            };
        case 'ADD':
            return {
                ...state,
                [action.data.day]: [...state[action.data.day], action.data.exercise]
            };
        default:
            throw new Error('useExercise: Ação inválida');
    }
};


const useExercise = (): ExerciseContextType => {

    const [data, setData] = useReducer(exerciseReducer, initialData);

    useEffect(() => {
        const loadData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@workout_data');
                if (jsonValue != null) {
                    setData({ type: "INIT_DATA", data: JSON.parse(jsonValue) });
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
        setData({ type: 'ADD', data: { day, exercise } });
    };

    const completeStep = (exerciseName: string, stepIndex: number) => {
        setData({ type: 'ON_COMPLETE_STEP', data: { exerciseName, stepIndex } });
    };

    const completeExercise = (exerciseName: string) => {
        setData({ type: 'ON_COMPLETE_EXERCISE', data: { exerciseName } });

    }

    const exercisesForTheDay = data[dayName];
    const nonCompletedExercises = exercisesForTheDay ? exercisesForTheDay.filter((exerciseItem: Exercise) => !exerciseItem._isCompleted) : [];

    return {
        data,
        addExercise,
        completeStep,
        completeExercise,
        exercisesForTheDay,
        nonCompletedExercises
    };
};

export default useExercise;

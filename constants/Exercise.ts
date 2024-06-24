export interface ExerciseSet {
    reps: string;
    weight: string;
}

export interface Exercise {
    name: string;
    color: string;
    sets: ExerciseSet[];
}

export interface WorkoutData {
    [key: string]: Exercise[];
}

export interface ExerciseContextType {
    data: WorkoutData;
    addExercise: (day: string, exercise: Exercise) => void;
}
export interface ExerciseSet {
    reps: string;
    weight: string;
    _isCompleted: boolean;
}

export interface Exercise {
    _isCompleted?: boolean;
    name: string;
    color: string;
    sets: ExerciseSet[];
}

export interface WorkoutData {
    [key: string]: Exercise[];
}

export interface ExerciseContextType {
    data: WorkoutData;
    exercisesForTheDay: Exercise[];
    nonCompletedExercises: Exercise[];
    addExercise: (day: string, exercise: Exercise) => void;
    completeStep: (exerciseName: string, stepIndex: number) => void;
    completeExercise: (exerciseName: string) => void;
}
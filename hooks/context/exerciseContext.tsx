import { ReactNode, createContext } from "react";
import useExercise from "../useExercise";
import { ExerciseContextType } from "@/constants/Exercise";

const ExerciseContext = createContext<ExerciseContextType | undefined>(
  undefined
);

export const ExerciseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    data,
    addExercise,
    exercisesForTheDay,
    nonCompletedExercises,
    completeStep,
    completeExercise,
  } = useExercise();

  return (
    <ExerciseContext.Provider
      value={{
        data,
        addExercise,
        exercisesForTheDay,
        nonCompletedExercises,
        completeStep,
        completeExercise,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
};

import { ReactNode, createContext } from "react";
import useExercise from "../useExercise";
import { ExerciseContextType } from "@/constants/Exercise";

const ExerciseContext = createContext<ExerciseContextType | undefined>(
  undefined
);

export const ExerciseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data, addExercise } = useExercise();

  return (
    <ExerciseContext.Provider value={{ data, addExercise }}>
      {children}
    </ExerciseContext.Provider>
  );
};

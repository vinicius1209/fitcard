import { ExerciseCard } from "@/components/ExerciseCard";
import { RestTimer } from "@/components/RestTimer";
import { ExerciseSet } from "@/constants/Exercise";
import useExercise from "@/hooks/useExercise";
import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";

const HomeScreen: React.FC = () => {
  const { exercisesForTheDay, completeStep, completeExercise } = useExercise();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [currentSetIndex, setCurrentSetIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [resting, setResting] = useState(false);
  const [completedSets, setCompletedSets] = useState<boolean[][]>([]);

  const handleStartSet = (exerciseIndex: number) => {
    const firstStepNotCompleted = exercisesForTheDay[exerciseIndex].sets.find(
      (setItem: ExerciseSet) => !setItem._isCompleted
    );

    if (!firstStepNotCompleted) {
      return;
    }

    setCurrentExerciseIndex(exerciseIndex);
    setCurrentSetIndex(exercisesForTheDay[exerciseIndex].sets.indexOf(firstStepNotCompleted));
    setIsPlaying(true);
  };

  const handleCompleteSet = () => {

    completeStep(exercisesForTheDay[currentExerciseIndex].name, currentSetIndex);

    if (
      currentSetIndex <
      exercisesForTheDay[currentExerciseIndex].sets.length - 1
    ) {
      console.log('proxima série...')

      // Se ainda tenho séries a serem feitas
      setCurrentSetIndex(currentSetIndex + 1);

    } else {
      // Se ainda não acabou os exercício do dia, eu posso pular de exercício
      if (currentExerciseIndex < exercisesForTheDay.length - 1) {
        console.log('proximo exercício...')
        setResting(true);
        completeExercise(exercisesForTheDay[currentExerciseIndex].name);
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setCurrentSetIndex(0);
      } else {
        console.log('Completou tudo...')
        setResting(true);
        setCurrentSetIndex(0);
        setCurrentExerciseIndex(0);
      }
    }
  };

  const handleSkipRest = () => {
    setResting(false);
    // setCurrentExerciseIndex(0);
    // setCurrentSetIndex(0);
  };

  const handleToggleComplete = (exerciseIndex: number, setIndex: number) => {
    const updatedCompletedSets = [...completedSets];
    updatedCompletedSets[exerciseIndex][setIndex] = true;
    setCompletedSets(updatedCompletedSets);
    handleCompleteSet();
  };

  if (!exercisesForTheDay || exercisesForTheDay.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nenhum exercício configurado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {resting ? (
        <RestTimer
          duration={300}
          handleSkipRest={handleSkipRest}
          onComplete={handleSkipRest}
        />
      ) : (
        <FlatList
          data={exercisesForTheDay}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <ExerciseCard
              exercise={item}
              currentExerciseIndex={currentExerciseIndex}
              currentSetIndex={currentSetIndex}
              isPlaying={isPlaying}
              exerciseIndex={index}
              handleStartSet={handleStartSet}
              handleCompleteSet={handleCompleteSet}
              handleSkipExercise={handleSkipRest}
            />
          )}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flatListContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default HomeScreen;

import { ExerciseCard } from '@/components/ExerciseCard';
import { RestTimer } from '@/components/RestTimer';
import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSetIndex, setCurrentSetIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [resting, setResting] = useState(false);

  const exercises = [
    {
      id: '1',
      name: 'Bench Press',
      sets: [
        { reps: 15, weight: '17.5kg' },
        { reps: 12, weight: '20kg' },
        { reps: 10, weight: '25kg' },
        { reps: 8, weight: '27kg' },
      ],
      color: '#ff7979',
    },
    {
      id: '2',
      name: 'Incline Dumbbell Press',
      sets: [
        { reps: 15, weight: '17.5kg' },
        { reps: 12, weight: '20kg' },
        { reps: 10, weight: '25kg' },
        { reps: 8, weight: '27kg' },
      ],
      color: '#badc58',
    },
    {
      id: '3',
      name: 'Squat',
      sets: [
        { reps: 15, weight: '50kg' },
        { reps: 12, weight: '60kg' },
        { reps: 10, weight: '70kg' },
        { reps: 8, weight: '80kg' },
      ],
      color: '#f9ca24',
    },
    // Adicione mais exercícios conforme necessário
  ];

  const handleStartSet = (exerciseIndex: number, setIndex: number) => {
    setCurrentExerciseIndex(exerciseIndex);
    setCurrentSetIndex(setIndex);
    setIsPlaying(true);
  };

  const handleCompleteSet = () => {
    setIsPlaying(false);
    if (currentSetIndex! < exercises[currentExerciseIndex].sets.length - 1) {
      setCurrentSetIndex(currentSetIndex! + 1);
    } else {
      setCurrentSetIndex(null);
      setResting(true);
    }
  };

  const handleSkipRest = () => {
    setResting(false);
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSetIndex(0);
    } else {
      setCurrentExerciseIndex(null);
      setCurrentSetIndex(null);
    }
  };

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
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <ExerciseCard
              exercise={item}
              currentExerciseIndex={currentExerciseIndex}
              currentSetIndex={currentSetIndex}
              isPlaying={isPlaying}
              exerciseIndex={index}
              handleStartSet={handleStartSet}
              handleCompleteSet={handleCompleteSet}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;

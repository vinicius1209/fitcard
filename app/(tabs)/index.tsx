import { ExerciseCard } from '@/components/ExerciseCard';
import { RestTimer } from '@/components/RestTimer';
import useExercise from '@/hooks/useExercise';
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';


const HomeScreen: React.FC = () => {
  const { data } = useExercise();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number | null>(null);
  const [currentSetIndex, setCurrentSetIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [resting, setResting] = useState(false);

  useEffect(() => {
    const dayName = getDayName();
    const index = Object.keys(data).indexOf(dayName);
    if (index !== -1) {
      setCurrentExerciseIndex(index);
    }
  }, [data]);

  const getDayName = (): string => {
    const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const currentDate = new Date();
    const dayName = daysOfWeek[currentDate.getDay()];
    return dayName;
  };
  

  const handleStartSet = (exerciseIndex: number, setIndex: number) => {
    setCurrentExerciseIndex(exerciseIndex);
    setCurrentSetIndex(setIndex);
    setIsPlaying(true);
  };

  const handleCompleteSet = () => {
    setIsPlaying(false);
    const currentDay = Object.keys(data)[currentExerciseIndex];
    if (currentSetIndex! < data[currentDay][currentExerciseIndex].sets.length - 1) {
      setCurrentSetIndex(currentSetIndex! + 1);
    } else {
      setCurrentSetIndex(null);
      setResting(true);
    }
  };

  const handleSkipRest = () => {
    setResting(false);
    if (currentExerciseIndex < Object.keys(data).length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSetIndex(0);
    } else {
      setCurrentExerciseIndex(null);
      setCurrentSetIndex(null);
    }
  };

  if (currentExerciseIndex === null || !data || Object.keys(data).length === 0) {
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
          data={Object.values(data)[currentExerciseIndex]}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SetItemProps } from './SetItem';
import { SetItem } from './SetItem';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ExerciseCardProps {
  exercise: {
    id: string;
    name: string;
    sets: SetItemProps[];
    color: string;
  };
  currentExerciseIndex: number;
  currentSetIndex: number | null;
  isPlaying: boolean;
  exerciseIndex: number;
  handleStartSet: (exerciseIndex: number, setIndex: number) => void;
  handleCompleteSet: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  currentExerciseIndex,
  currentSetIndex,
  isPlaying,
  exerciseIndex,
  handleStartSet,
  handleCompleteSet,
}) => {
  return (
    <View style={[styles.card, { backgroundColor: exercise.color }]}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <View style={styles.setsContainer}>
        {exercise.sets.map((set, setIndex) => (
          <SetItem
            key={setIndex}
            set={set}
            isCurrent={currentExerciseIndex === exerciseIndex && currentSetIndex === setIndex}
            isPlaying={isPlaying}
            handleStartSet={() => handleStartSet(exerciseIndex, setIndex)}
            handleCompleteSet={handleCompleteSet}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: height * 0.75,
    marginVertical: height * 0.05, // Espaço entre os cards
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  exerciseName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    alignSelf: 'center',
  },
  setsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

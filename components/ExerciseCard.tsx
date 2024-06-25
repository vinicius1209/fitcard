import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SetItem } from './SetItem';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import { Exercise } from '@/constants/Exercise';

const { width, height } = Dimensions.get('window');

interface ExerciseCardProps {
  exercise: Exercise,
  currentExerciseIndex: number;
  currentSetIndex: number;
  isPlaying: boolean;
  exerciseIndex: number;
  handleStartSet: (exerciseIndex: number) => void;
  handleCompleteSet: () => void;
  handleSkipExercise: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  currentExerciseIndex,
  currentSetIndex,
  isPlaying,
  exerciseIndex,
  handleStartSet,
  handleCompleteSet,
  handleSkipExercise,
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
            isCompleted={set._isCompleted}
          />
        ))}
      </View>
      <View style={styles.controlContainer}>
        <TouchableOpacity onPress={handleSkipExercise} style={styles.skipButton}>
          <Ionicons name="play-skip-forward" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={isPlaying ? handleCompleteSet : () => handleStartSet(exerciseIndex)}
          style={styles.playButton}
        >
          <Ionicons name={isPlaying ? "stop" : "play"} size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    height: height * 0.75,
    marginVertical: height * 0.05,
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
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  playButton: {
    backgroundColor: '#1e90ff',
    borderRadius: 50,
    padding: 10,
  },
  skipButton: {
    backgroundColor: '#ff6347',
    borderRadius: 50,
    padding: 10,
  },
});

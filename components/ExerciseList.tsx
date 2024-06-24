import { Exercise } from '@/constants/Exercise';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface ExerciseListProps {
  exercises: Exercise[];
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises }) => {
  return (
    <FlatList
      data={exercises}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      renderItem={({ item }) => (
        <View style={styles.exerciseContainer}>
          <Text style={styles.exerciseName}>{item.name}</Text>
          {item.sets.map((set, index) => (
            <Text key={index} style={styles.setText}>
              {set.reps} repetições com {set.weight}
            </Text>
          ))}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  exerciseContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  setText: {
    fontSize: 16,
  },
});

export default ExerciseList;

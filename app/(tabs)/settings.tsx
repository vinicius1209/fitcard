import ExerciseForm from '@/components/ExerciseForm';
import ExerciseList from '@/components/ExerciseList';
import useExercise from '@/hooks/useExercise';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SettingsScreen: React.FC = () => {
  const { data, addExercise } = useExercise();
  const [selectedDay, setSelectedDay] = useState<string>('Segunda');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações de Treino</Text>
      <View style={styles.daySelector}>
        {Object.keys(data).map((day) => (
          <TouchableOpacity key={day} onPress={() => setSelectedDay(day)} style={styles.dayButton}>
            <Text style={styles.dayButtonText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ExerciseList exercises={data[selectedDay]} />
      <ExerciseForm addExercise={(exercise) => addExercise(selectedDay, exercise)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  dayButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  dayButtonText: {
    fontSize: 16,
  },
});

export default SettingsScreen;

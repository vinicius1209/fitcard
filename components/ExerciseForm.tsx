import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

interface ExerciseSet {
  reps: string;
  weight: string;
}

interface Exercise {
  name: string;
  sets: ExerciseSet[];
}

interface ExerciseFormProps {
  addExercise: (exercise: Exercise) => void;
}

const ExerciseForm: React.FC<ExerciseFormProps> = ({ addExercise }) => {
  const [name, setName] = useState('');
  const [sets, setSets] = useState<ExerciseSet[]>([{ reps: '', weight: '' }]);

  const handleAddSet = () => {
    setSets([...sets, { reps: '', weight: '' }]);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newSets = sets.map((set, i) => (i === index ? { ...set, [field]: value } : set));
    setSets(newSets);
  };

  const handleSubmit = () => {
    addExercise({ name, sets });
    setName('');
    setSets([{ reps: '', weight: '' }]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Exercício:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Séries:</Text>
      {sets.map((set, index) => (
        <View key={index} style={styles.setContainer}>
          <TextInput
            style={styles.input}
            placeholder="Repetições"
            value={set.reps}
            onChangeText={(value) => handleInputChange(index, 'reps', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Peso"
            value={set.weight}
            onChangeText={(value) => handleInputChange(index, 'weight', value)}
          />
        </View>
      ))}
      <Button title="Adicionar Série" onPress={handleAddSet} />
      <Button title="Salvar Exercício" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
  setContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ExerciseForm;

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const DetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [weight, setWeight] = useState('80kg'); // Fetch the weight based on the id

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detalhes do Exercício</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <Button title="Salvar" onPress={() => { /* Save logic */ }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 20,
    width: '80%',
  },
});

export default DetailsScreen;

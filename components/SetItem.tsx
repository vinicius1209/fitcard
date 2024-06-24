import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export interface SetItemProps {
  reps: number;
  weight: string;
}

interface SetItemComponentProps {
  set: SetItemProps;
  isCurrent: boolean;
  isPlaying: boolean;
  handleStartSet: () => void;
  handleCompleteSet: () => void;
}

export const SetItem: React.FC<SetItemComponentProps> = ({
  set,
  isCurrent,
  isPlaying,
  handleStartSet,
  handleCompleteSet,
}) => {
  return (
    <View style={[styles.setContainer, isCurrent && styles.currentSet]}>
      <Text style={[styles.setText, isCurrent && styles.currentSetText]}>
        {set.reps} repetições com {set.weight}
      </Text>
      <TouchableOpacity
        style={styles.controlButton}
        onPress={isPlaying ? handleCompleteSet : handleStartSet}
      >
        <Text style={styles.controlButtonText}>{isPlaying && isCurrent ? 'Stop' : 'Play'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  setContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  currentSet: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  setText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  currentSetText: {
    color: '#000',
  },
  controlButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  controlButtonText: {
    fontSize: 18,
    color: '#000',
  },
});

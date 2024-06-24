import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

interface RestTimerProps {
  duration: number;
  handleSkipRest: () => void;
  onComplete: () => void;
}

export const RestTimer: React.FC<RestTimerProps> = ({ duration, handleSkipRest, onComplete }) => {
  return (
    <View style={styles.restContainer}>
      <Text style={styles.restText}>Descanso</Text>
      <CountdownCircleTimer
        isPlaying
        duration={duration}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        onComplete={onComplete}
      >
        {({ remainingTime }) => <Text style={styles.timerText}>{remainingTime}</Text>}
      </CountdownCircleTimer>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkipRest}>
        <Text style={styles.skipButtonText}>Pular Descanso</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  restContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  restText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  skipButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  skipButtonText: {
    fontSize: 18,
    color: '#000',
  },
});

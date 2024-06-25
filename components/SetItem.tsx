import { ExerciseSet } from "@/constants/Exercise";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface SetItemComponentProps {
  set: ExerciseSet;
  isCurrent: boolean;
  isPlaying: boolean;
  isCompleted?: boolean;
}

export const SetItem: React.FC<SetItemComponentProps> = ({
  set,
  isCurrent,
  isPlaying,
  isCompleted,
}) => {
  
  return (
    <View
      style={[
        styles.setContainer,
        isCurrent && isPlaying && styles.currentSet,
        isCompleted && styles.completedSet,
      ]}
    >
      <Text
        style={[
          styles.setText,
          isCurrent && isPlaying && styles.currentSetText,
          isCompleted && styles.completedSetText,
        ]}
      >
        {set.reps} repetições com {set.weight}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  setContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  currentSet: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  completedSet: {
    opacity: 0.5,
  },
  setText: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  currentSetText: {
    color: "#000",
  },
  completedSetText: {
    color: "#000",
  },
  completeButton: {
    backgroundColor: "#4caf50",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  completeButtonText: {
    fontSize: 18,
    color: "#fff",
  },
});

import { Stack } from "expo-router";
import "react-native-reanimated";

export default function ScreensLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="LoginScreen"
        options={{ headerShown: false, title: "Login" }}
      />
      <Stack.Screen
        name="RegisterScreen"
        options={{ headerShown: false, title: "Signup" }}
      />
    </Stack>
  );
}

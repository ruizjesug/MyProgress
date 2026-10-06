import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "MyProgress" }} />
      <Stack.Screen name="login" options={{ title: "Iniciar sesión" }} />
    </Stack>
  );
}

import { StyleSheet, Text, View, Button } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyProgress</Text>

      <Text style={styles.subtitle}>
        Seguimiento de mis rutinas de gimnasio
      </Text>

      <Button title="Iniciar sesión" onPress={() => router.push("/login")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddHabitScreen() {
  const [nombre, setNombre] = useState("");

  const guardarHabito = async () => {
    if (!nombre) {
      Alert.alert("Error", "Escribe un nombre para el hábito");
      return;
    }

    const nuevoHabito = {
      nombre: nombre,
      completado: false,
    };

    await AsyncStorage.setItem("habito", JSON.stringify(nuevoHabito));

    Alert.alert("Correcto", "Hábito guardado", [
      {
        text: "Aceptar",
        onPress: () => router.push("/home"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar hábito</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del hábito"
        value={nombre}
        onChangeText={setNombre}
      />

      <Button title="Guardar hábito" onPress={guardarHabito} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
  },
});

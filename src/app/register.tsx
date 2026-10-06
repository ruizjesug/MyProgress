import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function RegisterScreen() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const crearCuenta = async () => {
    if (!correo || !contrasena) {
      Alert.alert("Error", "Completa todos los campos");
      return;
    }

    const usuario = {
      correo: correo,
      contrasena: contrasena,
    };

    await AsyncStorage.setItem("usuario", JSON.stringify(usuario));

    Alert.alert("Correcto", "Cuenta creada correctamente", [
      {
        text: "Aceptar",
        onPress: () => router.push("/login"),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
      />

      <Button title="Crear cuenta" onPress={crearCuenta} />
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
    marginBottom: 15,
    borderRadius: 8,
  },
});

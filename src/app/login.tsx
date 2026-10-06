import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginScreen() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  const iniciarSesion = async () => {
    const usuarioGuardado = await AsyncStorage.getItem("usuario");

    if (!usuarioGuardado) {
      Alert.alert("Error", "No existe ningún usuario registrado");
      return;
    }

    const usuario = JSON.parse(usuarioGuardado);

    if (correo === usuario.correo && contrasena === usuario.contrasena) {
      Alert.alert("Correcto", "Sesión iniciada", [
        {
          text: "Aceptar",
          onPress: () => router.push("/home"),
        },
      ]);
    } else {
      Alert.alert("Error", "Correo o contraseña incorrectos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

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

      <Button title="Entrar" onPress={iniciarSesion} />

      <View style={styles.registro}>
        <Button title="Crear cuenta" onPress={() => router.push("/register")} />
      </View>
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

  registro: {
    marginTop: 15,
  },
});

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [habito, setHabito] = useState("");

  useEffect(() => {
    cargarHabito();
  }, []);

  const cargarHabito = async () => {
    const habitoGuardado = await AsyncStorage.getItem("habito");

    if (habitoGuardado) {
      const datos = JSON.parse(habitoGuardado);
      setHabito(datos.nombre);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis rutinas</Text>

      {habito ? (
        <>
          <Text style={styles.habito}>🏋️ {habito}</Text>
          <Text style={styles.estado}>Estado: Pendiente</Text>
        </>
      ) : (
        <Text style={styles.estado}>No tienes hábitos registrados</Text>
      )}

      <Button
        title="Agregar hábito"
        onPress={() => router.push("/add-habit")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  habito: {
    fontSize: 18,
    marginBottom: 10,
  },

  estado: {
    fontSize: 16,
    marginBottom: 25,
    textAlign: "center",
  },
});

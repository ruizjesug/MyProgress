import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen() {
  const [habito, setHabito] = useState("");
  const [completado, setCompletado] = useState(false);

  useEffect(() => {
    cargarHabito();
    configurarNotificaciones();
  }, []);

  const cargarHabito = async () => {
    const habitoGuardado = await AsyncStorage.getItem("habito");

    if (habitoGuardado) {
      const datos = JSON.parse(habitoGuardado);
      setHabito(datos.nombre);
      setCompletado(datos.completado);
    }
  };

  const configurarNotificaciones = async () => {
    await Notifications.requestPermissionsAsync();
  };

  const marcarCompletado = async () => {
    const habitoGuardado = await AsyncStorage.getItem("habito");

    if (habitoGuardado) {
      const datos = JSON.parse(habitoGuardado);

      datos.completado = true;

      await AsyncStorage.setItem("habito", JSON.stringify(datos));

      setCompletado(true);
    }
  };

  const enviarNotificacion = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "MyProgress",
        body: "Recuerda realizar tu rutina de hoy 💪",
      },
      trigger: null,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis rutinas</Text>

      {habito ? (
        <>
          <Text style={styles.habito}>🏋️ {habito}</Text>

          <Text style={styles.estado}>
            Estado: {completado ? "Completado ✅" : "Pendiente"}
          </Text>

          {!completado && (
            <Button title="Marcar como completado" onPress={marcarCompletado} />
          )}
        </>
      ) : (
        <Text style={styles.estado}>No tienes hábitos registrados</Text>
      )}

      <View style={styles.boton}>
        <Button
          title="Agregar hábito"
          onPress={() => router.push("/add-habit")}
        />
      </View>

      <View style={styles.boton}>
        <Button title="Probar notificación" onPress={enviarNotificacion} />
      </View>
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
  boton: {
    marginTop: 15,
  },
});

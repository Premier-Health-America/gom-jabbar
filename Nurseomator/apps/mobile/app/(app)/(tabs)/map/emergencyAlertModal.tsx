import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet } from "react-native";

const EmergencyAlertModal = () => {
  const [message, setMessage] = useState("");
  const { apiClient } = useAuth();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const handleSubmit = async () => {
    if (!message) {
      Alert.alert("Please enter a message");
      return;
    }

    const res = await Location.requestForegroundPermissionsAsync();
    if (res.status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;
    console.log("Location:", latitude, longitude);

    try {
      const { data, error } = await apiClient["emergency-alerts"].post({
        latitude,
        longitude,
        message,
      });

      if (error) {
        console.log("Error sending emergency alert:", error);
        Alert.alert("Failed to send emergency alert");
        return;
      }

      console.log(data);
      router.back();
    } catch (error) {
      console.error("Error sending emergency alert:", error);
      Alert.alert("An error occurred while sending emergency alert");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>
        Emergency Alert at your position
      </ThemedText>
      <ThemedText style={{ paddingBottom: 10 }}>Message:</ThemedText>
      <ThemedTextInput
        placeholder="Enter message"
        onChangeText={(message) => setMessage(message)}
      />
      <Button title="Send Alert" onPress={handleSubmit} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default EmergencyAlertModal;

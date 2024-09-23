import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { Picker } from "@react-native-picker/picker";
import { nurseStatuses } from "@repo/schemas/db";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, useColorScheme } from "react-native";

const LocationReporter = () => {
  const [status, setStatus] =
    useState<(typeof nurseStatuses)[number]>("available");
  const theme = useColorScheme() ?? "light";
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
    console.log("Status:", status);
    const res = await Location.requestForegroundPermissionsAsync();
    if (res.status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;
    console.log("Location:", latitude, longitude);

    try {
      const { data, error } = await apiClient.nurse.status.post({
        status,
        latitude,
        longitude,
      });

      if (error) {
        console.log("Error reporting location:", error);
        Alert.alert("Failed to report location");
        return;
      }

      console.log(data);
      router.back();
    } catch (error) {
      console.error("Error reporting location:", error);
      Alert.alert("An error occurred while reporting location");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Report Your Status</ThemedText>
      <ThemedText>Status:</ThemedText>
      <Picker
        itemStyle={{ color: Colors[theme].text }}
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
      >
        {nurseStatuses.map((status) => (
          <Picker.Item
            key={status}
            label={`${status[0].toUpperCase()}${status.slice(1)}`}
            value={status}
          />
        ))}
      </Picker>
      <Button title="Report Status" onPress={handleSubmit} />
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

export default LocationReporter;

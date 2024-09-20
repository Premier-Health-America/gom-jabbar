import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useApi } from "@/hooks/useApiClient";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, useColorScheme } from "react-native";

const LocationReporter = () => {
  const [name, setName] = useState("Sylvie");
  const [status, setStatus] = useState("On Duty");
  const theme = useColorScheme() ?? "light";

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
    if (!name) {
      Alert.alert("Please enter your name");
      return;
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    try {
      const { data, error } = await useApi()["nurse-locations"].post({
        id: "1",
        name: "Sylvie",
        latitude,
        longitude,
        status: "active",
      });

      if (error) {
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
      <ThemedTextInput
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <ThemedText>Status:</ThemedText>
      <Picker
        itemStyle={{ color: Colors[theme].text }}
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
      >
        <Picker.Item label="On Duty" value="On Duty" />
        <Picker.Item label="Resting" value="Resting" />
        <Picker.Item label="Away" value="Away" />
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

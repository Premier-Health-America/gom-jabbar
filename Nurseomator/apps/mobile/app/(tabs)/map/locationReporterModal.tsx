import { useApi } from "@/hooks/useApiClient";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

const LocationReporter = () => {
  const [name, setName] = useState("Sylvie");
  const [status, setStatus] = useState("On Duty");

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
      Alert.alert("Please enter your name and allow location access");
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
    <View style={styles.container}>
      <Text style={styles.title}>Report Your Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Status:</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue) => setStatus(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="On Duty" value="On Duty" />
        <Picker.Item label="Resting" value="Resting" />
        <Picker.Item label="Away" value="Away" />
      </Picker>
      <Button title="Report Location" onPress={handleSubmit} />
    </View>
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    marginBottom: 10,
  },
  locationText: {
    marginBottom: 10,
  },
});

export default LocationReporter;

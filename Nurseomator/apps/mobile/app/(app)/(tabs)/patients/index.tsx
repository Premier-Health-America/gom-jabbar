import PatientCard from "@/components/PatientCard";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { Patient } from "@repo/schemas/db";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function PatientsScreen() {
  const { apiClient } = useAuth();
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await apiClient.patients.get();
      if (error) {
        console.log("ERROR:", error);
        return;
      }

      setPatients(data);
    };

    fetchPatients();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedScrollView
        style={{
          marginVertical: 10,
          width: "100%",
          paddingHorizontal: 5,
        }}
        contentContainerStyle={{ gap: 10 }}
      >
        {patients.map((patient) => (
          <TouchableOpacity
            key={patient.id}
            onPress={() =>
              router.push({
                pathname: "/(app)/(tabs)/patients/[id]",
                params: { id: patient.id, patient: JSON.stringify(patient) },
              })
            }
          >
            <PatientCard patient={patient} />
          </TouchableOpacity>
        ))}
      </ThemedScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

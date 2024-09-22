import PatientCard from "@/components/PatientCard";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedSafeAreaView, ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { Patient } from "@repo/schemas/db";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

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
    <ThemedSafeAreaView>
      <ThemedView style={styles.container}>
        <ThemedText
          style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
        >
          Patients
        </ThemedText>

        <ThemedScrollView
          style={{
            marginBottom: 10,
            width: "100%",
            paddingHorizontal: 3,
          }}
          contentContainerStyle={{ gap: 10 }}
        >
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </ThemedScrollView>
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

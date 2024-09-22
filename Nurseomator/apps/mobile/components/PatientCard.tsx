import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import {
  FontAwesome6,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Patient } from "@repo/schemas/db";
import { StyleSheet, useColorScheme, View } from "react-native";

export default function PatientCard({ patient }: { patient: Patient }) {
  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.name}>{patient.name}</ThemedText>
        <ThemedText style={styles.email}>{patient.email}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.infoRow}>
        <View style={styles.infoItem}>
          {patient.sex === "male" ? (
            <Fontisto name="male" size={18} color={Colors[theme].icon} />
          ) : (
            <Fontisto name="female" size={18} color={Colors[theme].icon} />
          )}
          <ThemedText style={styles.infoText}>
            {patient.age} years old
          </ThemedText>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons
            name="human-male-height-variant"
            size={18}
            color={Colors[theme].icon}
          />
          <ThemedText style={styles.infoText}>{patient.height} cm</ThemedText>
        </View>
        <View style={styles.infoItem}>
          <FontAwesome6
            name="weight-scale"
            size={18}
            color={Colors[theme].icon}
          />
          <ThemedText style={styles.infoText}>{patient.weight} kg</ThemedText>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
});

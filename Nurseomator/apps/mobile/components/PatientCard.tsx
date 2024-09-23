import Card from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Patient } from "@repo/schemas/db";
import { StyleSheet, View } from "react-native";

export default function PatientCard({ patient }: { patient: Patient }) {
  const theme = useColorScheme();
  const styles = getStyles(theme);

  return (
    <Card>
      <ThemedView style={{ flex: 1 }}>
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
          <Ionicons
            name="chevron-forward"
            size={24}
            color={Colors[theme].tint}
          />
        </ThemedView>
      </ThemedView>
    </Card>
  );
}

const getStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
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

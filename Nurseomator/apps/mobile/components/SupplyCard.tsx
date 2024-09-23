import Card from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { Supply } from "@repo/schemas/db";
import { StyleSheet } from "react-native";

export default function SupplyCard({ supply }: { supply: Supply }) {
  const theme = useColorScheme();
  const styles = getStyles(theme);

  return (
    <Card>
      <ThemedView style={styles.itemContent}>
        <ThemedText style={styles.itemName}>{supply.name}</ThemedText>
        <ThemedView style={styles.itemDetails}>
          <ThemedText style={styles.itemQuantity}>
            Quantity: {supply.quantity} {supply.measurementUnit}
          </ThemedText>
        </ThemedView>
      </ThemedView>
      <Ionicons name="chevron-forward" size={24} color={Colors[theme].tint} />
    </Card>
  );
}

const getStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    itemContent: {
      flex: 1,
    },
    itemName: {
      fontSize: 18,
      fontWeight: "600",
      color: theme === "dark" ? "#F9FAFB" : "#111827",
      marginBottom: 4,
    },
    itemDetails: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    itemQuantity: {
      fontSize: 14,
      color: theme === "dark" ? "#D1D5DB" : "#4B5563",
    },
  });

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Supply } from "@repo/schemas/db";
import { StyleSheet, useColorScheme } from "react-native";

export default function SupplyCard({ supply }: { supply: Supply }) {
  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.supplyName}>{supply.name}</ThemedText>
      <ThemedText style={styles.supplyQuantity}>
        Quantity: {supply.quantity}
      </ThemedText>
      <ThemedText style={styles.supplyUnit}>
        Unit: {supply.measurementUnit}
      </ThemedText>
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
  supplyName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  supplyQuantity: {
    fontSize: 16,
    color: "#666",
  },
  supplyUnit: {
    fontSize: 16,
    color: "#666",
  },
});

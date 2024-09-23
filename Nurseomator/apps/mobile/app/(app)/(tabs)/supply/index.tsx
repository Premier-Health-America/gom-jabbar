import SupplyCard from "@/components/SupplyCard";
import { ThemedScrollView } from "@/components/ThemedScrollView";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { Supply } from "@repo/schemas/db";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function SupplyScreen() {
  const { apiClient } = useAuth();
  const [supplies, setSupplies] = useState<Supply[]>([]);

  useEffect(() => {
    const fetchSupplies = async () => {
      const { data, error } = await apiClient.supplies.get();
      if (error) {
        console.log("ERROR:", error);
        return;
      }

      setSupplies(data);
    };

    fetchSupplies();
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
        {supplies.map((supply) => (
          <TouchableOpacity
            key={supply.id}
            onPress={() =>
              router.push({
                pathname: "/(app)/(tabs)/supply/[id]",
                params: { id: supply.id, supply: JSON.stringify(supply) },
              })
            }
          >
            <SupplyCard supply={supply} />
          </TouchableOpacity>
        ))}
      </ThemedScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  supplyCard: {
    padding: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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

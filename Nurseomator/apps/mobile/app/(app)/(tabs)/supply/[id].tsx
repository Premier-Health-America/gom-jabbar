import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Supply } from "@repo/schemas/db";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Fragment, useState } from "react";
import { Alert, Button, StyleSheet } from "react-native";

export default function PatientDetailsScreen() {
  const { apiClient } = useAuth();
  const theme = useColorScheme();
  const styles = getStyles(theme);

  const { id, supply: supplyStringified } = useLocalSearchParams<{
    id: string;
    supply: string;
  }>();

  const supply =
    supplyStringified !== undefined
      ? (JSON.parse(supplyStringified) as Supply)
      : null;

  if (!id || !supply) {
    if (router.canGoBack()) {
      router.back();
      return;
    } else {
      router.replace("/(app)/(tabs)/supply/");
      return;
    }
  }

  const [quantity, setQuantity] = useState("");

  const requestSupply = async () => {
    const qty = Number(quantity);
    if (isNaN(qty) || qty <= 0) {
      console.log("INVALID QUANTITY:", quantity);
      Alert.alert("Invalid quantity. Please enter a positive number.");
      return;
    }

    const { data, error } = await apiClient.supplies({ id }).request.post({
      quantity: qty,
    });

    if (error) {
      console.log("ERROR:", error);
      return;
    }

    console.log("DATA:", data);
    Alert.alert(data.message);
    router.back();
  };

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: supply.name,
          headerShown: true,
        }}
      />

      <ThemedView style={styles.container}>
        <ThemedView style={styles.card}>
          <ThemedText style={styles.title}>{supply.name}</ThemedText>
          <ThemedView style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>
              Current Quantity: {supply.quantity} {supply.measurementUnit}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.requestSection}>
          <ThemedText style={styles.requestTitle}>Request Supply</ThemedText>
          <ThemedView style={styles.inputContainer}>
            <ThemedTextInput
              style={styles.input}
              placeholder="Enter quantity"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              placeholderTextColor={"#888"}
            />
            <ThemedText style={styles.unitText}>
              {supply.measurementUnit}
            </ThemedText>
          </ThemedView>
          <Button title="Request Supply" onPress={requestSupply} />
        </ThemedView>
      </ThemedView>
    </Fragment>
  );
}

const getStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    card: {
      borderRadius: 12,
      padding: 20,
      marginBottom: 20,
      shadowColor: theme === "dark" ? "#000" : "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme === "dark" ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 15,
    },
    detailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    detailLabel: {
      fontSize: 16,
      color: "#888",
    },
    detailValue: {
      fontSize: 16,
      fontWeight: "600",
      color: "#888",
    },
    requestSection: {
      borderRadius: 12,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme === "dark" ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    requestTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    input: {
      flex: 1,
      height: 50,
      borderWidth: 1,
      borderColor: "#BBB",
      borderRadius: 8,
      paddingHorizontal: 15,
      fontSize: 16,
    },
    unitText: {
      marginLeft: 10,
      fontSize: 16,
      color: "#888",
    },
    button: {
      backgroundColor: "#007AFF",
      borderRadius: 8,
      paddingVertical: 10,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "600",
    },
  });

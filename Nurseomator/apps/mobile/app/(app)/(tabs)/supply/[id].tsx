import SupplyCard from "@/components/SupplyCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Supply } from "@repo/schemas/db";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Fragment, useState } from "react";
import { Alert, Button } from "react-native";

export default function PatientDetailsScreen() {
  const { apiClient } = useAuth();
  const theme = useColorScheme();
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
      <ThemedView style={{ flex: 1, padding: 16 }}>
        <SupplyCard supply={supply} />

        <ThemedText style={{ marginVertical: 10, fontSize: 18 }}>
          Request Supply
        </ThemedText>
        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <ThemedText>Quantity:</ThemedText>
          <ThemedTextInput
            style={{ flex: 1 }}
            keyboardType="number-pad"
            value={quantity}
            onChangeText={setQuantity}
          />
          <Button title="Request Supply" onPress={requestSupply} />
        </ThemedView>
      </ThemedView>
    </Fragment>
  );
}

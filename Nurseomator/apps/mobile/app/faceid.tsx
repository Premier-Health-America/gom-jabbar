import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as LocalAuthentication from "expo-local-authentication";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useFaceId = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [hasHardware, setHasHardware] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      const isAvailable = await LocalAuthentication.hasHardwareAsync();
      setIsAvailable(isAvailable);
      if (!isAvailable) {
        Alert.alert("Face ID", "Face ID is not available on this device.");
        return;
      }

      const hasHardware = await LocalAuthentication.isEnrolledAsync();
      setHasHardware(hasHardware);
      if (hasHardware) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Use Face ID to authenticate",
        });
        setIsAuthenticated(result.success);
      }
    })();
  }, []);

  return {
    isAvailable,
    hasHardware,
    isAuthenticated,
  };
};

export default function FaceIdScreen() {
  const { isAvailable, hasHardware, isAuthenticated } = useFaceId();

  if (!isAvailable) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ThemedText style={{ fontSize: 24, fontWeight: "bold" }}>
          Face ID
        </ThemedText>
        <ThemedText>Face ID is not available on this device.</ThemedText>
      </ThemedView>
    );
  }

  if (!hasHardware) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ThemedText style={{ fontSize: 24, fontWeight: "bold" }}>
          Face ID
        </ThemedText>
        <ThemedText>Face ID is not enrolled on this device.</ThemedText>
      </ThemedView>
    );
  }

  if (!isAuthenticated) {
    return (
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ThemedText style={{ fontSize: 24, fontWeight: "bold" }}>
          Face ID
        </ThemedText>
        <ThemedText>Face ID is not authenticated.</ThemedText>
      </ThemedView>
    );
  }

  return <Redirect href="/(app)/(tabs)/" />;
}

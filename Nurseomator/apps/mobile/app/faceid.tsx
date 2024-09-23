import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import * as Haptics from "expo-haptics";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button } from "react-native";

export default function FaceIdScreen() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [hasHardware, setHasHardware] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);

  const authenticate = async () => {
    const isAvailable = await LocalAuthentication.hasHardwareAsync();
    const hasHardware = await LocalAuthentication.isEnrolledAsync();

    setIsAvailable(isAvailable);
    setHasHardware(hasHardware);

    console.log({ isAvailable, hasHardware });

    if (!isAvailable || !hasHardware) {
      if (!isAvailable) {
        console.log("Face ID is not available on this device.");
      } else {
        console.log("Face ID is not enrolled on this device.");
      }

      setIsAuthenticated(true);
      router.replace("/(app)/(tabs)/map");
      return;
    }

    console.log("Authenticating...");
    const result = await LocalAuthentication.authenticateAsync();
    setIsAuthenticated(result.success);
    setHasPrompted(true);
    console.log({ hasPrompted, isAuthenticated });
    if (!result.success) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } else {
      router.replace("/(app)/(tabs)/map");
    }
  };

  useEffect(() => {
    (async () => {
      await authenticate();
    })();
  }, []);

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText style={{ fontSize: 24, fontWeight: "bold" }}>
        Biometrics 2FA
      </ThemedText>
      {hasPrompted && !isAuthenticated && (
        <>
          <ThemedText>Biometrics failed. Try again.</ThemedText>
          <Button title="Try Again" onPress={authenticate} />
        </>
      )}
    </ThemedView>
  );
}

import { ThemedText } from "@/components/ThemedText";
import { ThemedSafeAreaView, ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { Button, StyleSheet } from "react-native";

export default function AccountScreen() {
  const { signOut, user } = useAuth();

  if (!user) {
    return <Redirect href="/signin" />;
  }

  return (
    <ThemedSafeAreaView>
      <ThemedView style={[styles.container, { width: "100%" }]}>
        <ThemedText style={{ fontSize: 24, fontWeight: "bold" }}>
          Account
        </ThemedText>
        <ThemedView style={[{ width: "100%", marginVertical: 10 }]}>
          <ThemedText>Name: {user.name}</ThemedText>
          <ThemedText>Email: {user.email}</ThemedText>
        </ThemedView>
        <Button title="Sign out" onPress={signOut} />
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

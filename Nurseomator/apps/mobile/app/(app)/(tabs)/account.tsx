import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { Redirect, Tabs } from "expo-router";
import { Fragment } from "react";
import { Button, StyleSheet, View } from "react-native";

export default function AccountScreen() {
  const { signOut, user } = useAuth();

  if (!user) {
    return <Redirect href="/signin" />;
  }

  return (
    <Fragment>
      <Tabs.Screen
        options={{
          headerRight(props) {
            return (
              <View style={{ marginRight: 10 }}>
                <Button title="Sign out" onPress={signOut} {...props} />
              </View>
            );
          },
        }}
      />
      <ThemedView style={[styles.container, { width: "100%" }]}>
        <ThemedView style={[{ width: "100%", marginVertical: 10 }]}>
          <ThemedText>Name: {user.name}</ThemedText>
          <ThemedText>Email: {user.email}</ThemedText>
        </ThemedView>
      </ThemedView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
});

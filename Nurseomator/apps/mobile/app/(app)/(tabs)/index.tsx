import { ThemedText } from "@/components/ThemedText";
import { ThemedSafeAreaView, ThemedView } from "@/components/ThemedView";
import { Fragment } from "react";
import { StyleSheet } from "react-native";

export default function SupplyScreen() {
  return (
    <Fragment>
      <ThemedSafeAreaView>
        <ThemedView style={styles.container}>
          <ThemedText>Supply</ThemedText>
        </ThemedView>
      </ThemedSafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

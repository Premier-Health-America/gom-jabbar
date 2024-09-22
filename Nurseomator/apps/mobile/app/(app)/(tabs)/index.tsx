import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Fragment } from "react";
import { StyleSheet } from "react-native";

export default function SupplyScreen() {
  return (
    <Fragment>
      <ThemedView style={styles.container}>
        <ThemedText>Supply</ThemedText>
      </ThemedView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

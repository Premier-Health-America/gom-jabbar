import InteractiveMap from "@/components/InteractiveMap";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

export default function MapScreen() {
  return (
    <ThemedView style={styles.container}>
      <InteractiveMap />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

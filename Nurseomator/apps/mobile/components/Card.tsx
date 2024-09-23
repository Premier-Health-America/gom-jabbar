import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { StyleSheet } from "react-native";

export default function Card({ children }: { children: React.ReactNode }) {
  const theme = useColorScheme();
  const styles = getStyles(theme);

  return <ThemedView style={styles.itemContainer}>{children}</ThemedView>;
}

const getStyles = (theme: "light" | "dark") =>
  StyleSheet.create({
    itemContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 12,
      padding: 16,
      shadowColor: theme === "dark" ? "#000" : "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme === "dark" ? 0.3 : 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  });

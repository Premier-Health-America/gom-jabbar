import { StyleSheet, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedView } from "@/components/ThemedView";
import { Card, Text } from "@rneui/themed";
import PushNotifications from "@/components/expo/PushNotifications";

export default function SummaryPage() {
  return (
    <View>
      <ThemedView style={styles.titleContainer}>
        <Text h1>Bonjour !</Text>
        <HelloWave />
      </ThemedView>
      <Text>Que voulez vous faire aujourd'hui ?</Text>
      <PushNotifications></PushNotifications>
      <Card>
        <Card.Title>Messagerie</Card.Title>
        <Card.Image
          source={{
            uri: "https://images.pexels.com/photos/48604/pexels-photo-48604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          }}
        />
      </Card>
      <Card>
        <Card.Title>Fournitures</Card.Title>
        <Card.Image
          source={{
            uri: "https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          }}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});

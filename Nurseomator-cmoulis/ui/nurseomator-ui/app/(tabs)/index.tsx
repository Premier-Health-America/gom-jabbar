import { StyleSheet, Text, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Card } from "@rneui/themed";
import { Image } from "react-native";
import LocationApp from "@/components/expo/LocationApp";
import PushNotifications from "@/components/expo/PushNotifications";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "white", dark: "white" }}
      headerImage={
        <Image
          source={require("@/assets/images/app-illus.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bonjour !</ThemedText>
        <HelloWave />
      </ThemedView>
      <Text>Que voulez vous faire aujourd'hui ?</Text>
      <PushNotifications></PushNotifications>
      <Card>
        <Card.Title>Messagerie</Card.Title>
        <Card.Image
          source={{
            uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
          }}
        />
      </Card>
      <Card>
        <Card.Title>Fournitures</Card.Title>
        <Card.Image
          source={{
            uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
          }}
        />
      </Card>
      <LocationApp></LocationApp>
    </ParallaxScrollView>
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
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

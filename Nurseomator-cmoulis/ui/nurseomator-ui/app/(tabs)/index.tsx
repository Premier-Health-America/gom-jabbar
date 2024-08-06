import { StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Image } from "react-native";
import LocationApp from "@/components/expo/LocationApp";
import SummaryPage from "@/components/SummaryPage";

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
      <SummaryPage/>
      <LocationApp></LocationApp>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

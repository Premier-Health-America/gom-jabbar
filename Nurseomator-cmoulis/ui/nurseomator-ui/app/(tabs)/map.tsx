
import { StyleSheet} from "react-native";

import MapView, { Marker } from "react-native-maps";

export default function TabTwoScreen() {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 62.52428506215461,
        longitude: -42.21197515676883,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
{/*       <Marker
        coordinate={{
          latitude: 62.52428506215461,
          longitude: -42.21197515676883,
        }}
        image={{uri: 'red.png'}}
      /> */}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

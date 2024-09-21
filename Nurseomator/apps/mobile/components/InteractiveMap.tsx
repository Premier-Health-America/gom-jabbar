import { ThemedText } from "@/components/ThemedText";
import { useRealTimeLocations } from "@/hooks/ws";
import { NurseLocation, NurseStatus } from "@repo/schemas/db";
import * as Location from "expo-location";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";

type HealthcareFacility = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

type UrgentArea = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
};

const InteractiveMap = () => {
  const [region, setRegion] = useState({
    latitude: 60,
    longitude: -95,
    latitudeDelta: 30,
    longitudeDelta: 30,
  });
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [nursesLocation, setNursesLocation] = useState<
    (NurseLocation & NurseStatus & { name: string })[]
  >([]);
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [urgentAreas, setUrgentAreas] = useState<UrgentArea[]>([]);
  const [viewAll, setViewAll] = useState(true);

  const realTimeLocations = useRealTimeLocations();
  realTimeLocations.on("message", (message) => {
    console.log("Received message:", message);
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      loadHealthcareFacilities();
      loadUrgentAreas();
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        const { latitude, longitude } = location.coords;

        realTimeLocations.send({
          latitude,
          longitude,
        });
      } catch (err) {
        console.error("Error sending location:", err);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadHealthcareFacilities = async () => {
    setFacilities([
      { id: 1, name: "Northern Igloo Hospital", latitude: 61, longitude: -98 },
      { id: 2, name: "Polar Bear Clinic", latitude: 64, longitude: -103 },
    ]);
  };

  const loadUrgentAreas = async () => {
    setUrgentAreas([
      {
        id: 1,
        name: "Yeti Cave",
        latitude: 65,
        longitude: -105,
        radius: 50000,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        {location && (
          <Marker
            key={`${location.coords.latitude}-${
              location.coords.longitude
            }-${Math.random()}`}
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You"
            pinColor="blue"
          />
        )}
        {viewAll &&
          nursesLocation.map((nurse) => (
            <Marker
              key={nurse.id}
              coordinate={{
                latitude: nurse.latitude,
                longitude: nurse.longitude,
              }}
              title={nurse.name}
              description={nurse.status}
              pinColor="blue"
            />
          ))}
        {viewAll &&
          facilities.map((facility) => (
            <Marker
              key={facility.id}
              coordinate={{
                latitude: facility.latitude,
                longitude: facility.longitude,
              }}
              title={facility.name}
              description="Healthcare Facility"
              pinColor="green"
            />
          ))}
        {viewAll &&
          urgentAreas.map((area) => (
            <Circle
              key={area.id}
              center={{ latitude: area.latitude, longitude: area.longitude }}
              radius={area.radius}
              fillColor="rgba(255, 0, 0, 0.2)"
              strokeColor="rgba(255, 0, 0, 0.5)"
            />
          ))}
      </MapView>
      <Link asChild href={"/(tabs)/map/statusReporterModal"}>
        <TouchableOpacity style={styles.statusButton}>
          <ThemedText>Report status</ThemedText>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  statusButton: {
    position: "absolute",
    top: 60,
    right: 10,
    backgroundColor: "#ffffff45",
    padding: 10,
    borderRadius: 13,
    overflow: "hidden",
  },
});

export default InteractiveMap;

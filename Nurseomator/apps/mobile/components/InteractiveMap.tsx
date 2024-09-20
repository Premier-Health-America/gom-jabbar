import { ThemedText } from "@/components/ThemedText";
import { InferResponseType, useApiClient } from "@/hooks/useApiClient";
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
  const nurseLocationsFetcher = useApiClient()["nurse-locations"].get;
  const [nurses, setNurses] = useState<
    InferResponseType<typeof nurseLocationsFetcher>
  >([]);
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [urgentAreas, setUrgentAreas] = useState<UrgentArea[]>([]);
  const [viewAll, setViewAll] = useState(false);

  const fetchNurseLocations = async () => {
    try {
      const { data, error } = await nurseLocationsFetcher();
      if (error) {
        console.error("Error fetching nurse locations:", error);
        return;
      }

      console.log("Got nurse locations", data);
      setNurses(data);
    } catch (error) {
      console.error("Error fetching nurse locations:", error);
    }
  };

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

  const reportCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      console.log("Current location", latitude, longitude);
      const { data, error } = await useApiClient()["nurse-locations"].post({
        id: "1",
        name: "Sylvie",
        latitude,
        longitude,
        status: "active",
      });

      if (error) {
        console.error("Error reporting location:", error);
        return;
      }
    } catch (error) {
      console.error("Error reporting location:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // reportCurrentLocation();
      fetchNurseLocations();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadHealthcareFacilities = async () => {
    // Fetch healthcare facilities from API
    // This is a mock example
    setFacilities([
      { id: 1, name: "Northern Igloo Hospital", latitude: 61, longitude: -98 },
      { id: 2, name: "Polar Bear Clinic", latitude: 64, longitude: -103 },
    ]);
  };

  const loadUrgentAreas = async () => {
    // Fetch urgent areas from API
    // This is a mock example
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
          nurses.map((nurse) => (
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

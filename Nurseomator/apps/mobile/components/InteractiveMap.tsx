import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { useRealTimeLocations } from "@/hooks/ws";
import type { HealthcareFacility, UrgentArea } from "@repo/schemas/db";
import type { NurseLocationAndStatus } from "@repo/server/src/routers/ws";
import * as Location from "expo-location";
import { Link, Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";

const InteractiveMap = () => {
  const { apiClient, user } = useAuth();
  if (!user) {
    return <Redirect href="/signin" />;
  }

  const [region, setRegion] = useState({
    latitude: 65.32,
    longitude: -105,
    latitudeDelta: 3,
    longitudeDelta: 3,
  });
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [nursesLocation, setNursesLocation] = useState<NurseLocationAndStatus>(
    []
  );
  const [facilities, setFacilities] = useState<HealthcareFacility[]>([]);
  const [urgentAreas, setUrgentAreas] = useState<UrgentArea[]>([]);
  const [viewAll, setViewAll] = useState(true);
  const realTimeLocations = useRealTimeLocations();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      await loadHealthcareFacilities();
      await loadUrgentAreas();
    })();

    const handleNewNurseLocation = (
      message: MessageEvent<NurseLocationAndStatus>
    ) => {
      setNursesLocation(message.data);
    };
    realTimeLocations.on("message", handleNewNurseLocation);

    return () => {
      realTimeLocations.off("message", handleNewNurseLocation);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        console.log("Fetching location");
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        const { latitude, longitude } = location.coords;
        console.log("Sending location:", latitude, longitude);

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
    const { data, error } = await apiClient.facilities.get();
    if (error) {
      console.error("Error fetching facilities:", error);
      return;
    }

    setFacilities(data);
  };

  const loadUrgentAreas = async () => {
    const { data, error } = await apiClient["urgent-areas"].get();
    if (error) {
      console.error("Error fetching urgent areas:", error);
      return;
    }

    setUrgentAreas(data);
  };

  return (
    <View style={styles.container}>
      <ThemedView
        style={{
          width: "100%",
          backgroundColor: "transparent",
          position: "absolute",
          top: 60,
          zIndex: 10,
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 30,
        }}
      >
        <Link asChild href={"/(tabs)/map/statusReporterModal"}>
          <TouchableOpacity style={styles.button}>
            <ThemedText>Report status</ThemedText>
          </TouchableOpacity>
        </Link>
        <Link asChild href={"/(tabs)/map/emergencyAlertModal"}>
          <TouchableOpacity style={styles.button}>
            <ThemedText>Send alert</ThemedText>
          </TouchableOpacity>
        </Link>
      </ThemedView>
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
            description="Nurse"
            pinColor="blue"
          />
        )}
        {viewAll &&
          nursesLocation
            .filter((n) => n.id !== user.id)
            .map((nurse) => (
              <Marker
                key={nurse.id}
                coordinate={{
                  latitude: nurse.location.latitude,
                  longitude: nurse.location.longitude,
                }}
                title={nurse.name}
                description="Nurse"
                pinColor="red"
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#ffffff45",
    padding: 10,
    borderRadius: 13,
    overflow: "hidden",
  },
});

export default InteractiveMap;

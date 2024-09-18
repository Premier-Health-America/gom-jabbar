import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Map",
          // headerRight(props) {
          //   return (
          // <Link href="/(tabs)/map/locationReporterModal">
          //   Report Location
          // </Link>
          //   );
          // },
        }}
      />
      <Stack.Screen
        name="locationReporterModal"
        options={{
          title: "Location Reporter",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}

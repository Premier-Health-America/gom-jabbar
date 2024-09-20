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
        }}
      />
      <Stack.Screen
        name="statusReporterModal"
        options={{
          title: "Location Reporter",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}

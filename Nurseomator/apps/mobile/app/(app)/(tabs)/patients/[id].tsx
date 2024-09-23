import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  FontAwesome6,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Patient, PatientRecord } from "@repo/schemas/db";
import { Redirect, router, Stack, useLocalSearchParams } from "expo-router";
import { Fragment, useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, StyleSheet } from "react-native";

export default function PatientDetailsScreen() {
  const { apiClient, user } = useAuth();
  const theme = useColorScheme();

  if (!user) {
    return <Redirect href="/signin" />;
  }

  const { id, patient: patientStringified } = useLocalSearchParams<{
    id: string;
    patient: string;
  }>();

  const patient =
    patientStringified !== undefined
      ? (JSON.parse(patientStringified) as Patient)
      : null;

  if (!id || !patient) {
    if (router.canGoBack()) {
      router.back();
      return;
    } else {
      router.replace("/(app)/(tabs)/patients");
      return;
    }
  }

  const [records, setRecords] = useState<PatientRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, [id, cursor]);

  const fetchRecords = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      console.log("HAVE CURSOR:", !!cursor);
      const { data, error } = await apiClient.patients({ id }).records.get({
        query: { pageSize: 10, cursor: cursor ?? "" },
      });

      if (error) {
        console.log("ERROR:", error);
        return;
      }

      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        setRecords((prevRecords) => [...prevRecords, ...data.data]);
        setCursor(data.cursor);
      }
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: PatientRecord }) => (
    <ThemedView
      style={[styles.recordItem, { borderColor: Colors[theme].icon }]}
    >
      <ThemedText style={styles.recordDate}>{item.createdAt}</ThemedText>
      <ThemedText style={styles.recordDescription}>
        {item.recordDescription}
      </ThemedText>
    </ThemedView>
  );

  const renderFooter = () => {
    if (loading) {
      return (
        <ThemedView style={styles.footer}>
          <ActivityIndicator size="large" />
        </ThemedView>
      );
    } else if (!hasMore) {
      return (
        <ThemedView style={styles.footer}>
          <ThemedText>No more records</ThemedText>
        </ThemedView>
      );
    } else {
      return null;
    }
  };

  return (
    <Fragment>
      <Stack.Screen
        options={{
          title: patient.name,
          headerShown: true,
          headerRight(props) {
            return (
              <Button
                title="Open chat"
                onPress={() =>
                  router.navigate({
                    pathname: "/(app)/(tabs)/patients/chat",
                    params: {
                      patient: JSON.stringify(patient),
                      nurseId: user.id,
                    },
                  })
                }
              />
            );
          },
        }}
      />
      <ThemedView style={{ flex: 1, padding: 16 }}>
        <ThemedView style={styles.infoRow}>
          <ThemedView style={styles.infoItem}>
            {patient.sex === "male" ? (
              <Fontisto name="male" size={18} color={Colors[theme].icon} />
            ) : (
              <Fontisto name="female" size={18} color={Colors[theme].icon} />
            )}
            <ThemedText style={styles.infoText}>
              {patient.age} years old
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoItem}>
            <MaterialCommunityIcons
              name="human-male-height-variant"
              size={18}
              color={Colors[theme].icon}
            />
            <ThemedText style={styles.infoText}>{patient.height} cm</ThemedText>
          </ThemedView>
          <ThemedView style={styles.infoItem}>
            <FontAwesome6
              name="weight-scale"
              size={18}
              color={Colors[theme].icon}
            />
            <ThemedText style={styles.infoText}>{patient.weight} kg</ThemedText>
          </ThemedView>
        </ThemedView>

        {records.length > 0 ? (
          <FlatList
            data={records}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={{ marginTop: 16 }}
            ListFooterComponent={renderFooter}
            onEndReached={fetchRecords}
            onEndReachedThreshold={0.5}
          />
        ) : (
          <ThemedView>
            <ThemedText>Loading patient records...</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  recordItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  recordDate: {
    fontSize: 12,
  },
  recordDescription: {
    fontSize: 14,
    marginTop: 4,
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
});

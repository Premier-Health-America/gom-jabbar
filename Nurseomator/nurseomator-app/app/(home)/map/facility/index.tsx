import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, FlatList, StyleSheet, Text, View } from 'react-native';
import PatientRecordApi from '@/lib/patientRecordApi';
import { getSavedToken } from '@/utils/tokenService';
import { PatientItem } from '@/components/PatientItem';

interface PatientRecord {
    id: number;
    patientName: string;
    record: any;
}

export default function Facility() {
    const [patientRecordsList, setPatientRecordsList] = useState<PatientRecord[]>([]);
    const { facilityId } = useLocalSearchParams<{ facilityId: string }>();

    useEffect(() => {
        (async () => {
            try {
                const token = await getSavedToken();
                const list = await PatientRecordApi.getListByFacility({ facilityId, token });
                setPatientRecordsList(list);
            } catch (error) {
                console.error('Error initializing patient records', error);
                setPatientRecordsList([]);
            }
        })();
    }, [facilityId]);

    const myListEmpty = () => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text>No patient records found</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={patientRecordsList}
                renderItem={({ item }) => <PatientItem patient={item} />}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={myListEmpty}
                ListHeaderComponent={() => <Text style={styles.header}>Patient Records</Text>}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flex: 1,
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

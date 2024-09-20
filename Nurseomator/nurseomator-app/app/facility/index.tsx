import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import PatientRecordApi from '@/lib/patientRecordApi';
import { getSavedToken } from '@/utils/tokenService';
import { PatientItem } from '@/components/PatientItem';

import { List } from '@/components/List';
import { useModal } from '@/context/modal';
import PatientRecordForm from '@/components/forms/PatientRecordForm';

interface PatientRecord {
    id: number;
    patientName: string;
    record: any;
}

export default function Facility() {
    const [patientRecordsList, setPatientRecordsList] = useState<PatientRecord[]>([]);
    const { facilityId, facilityName } = useLocalSearchParams<{
        facilityId: string;
        facilityName: string;
    }>();
    const { showModal, hideModal } = useModal();
    const router = useRouter();

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

    const reloadPage = () => {
        router.push(`/facility?facilityId=${facilityId}&facilityName=${facilityName}`);
    };

    const afterAction = () => {
        hideModal();
        reloadPage();
    };

    const openAddModal = () => {
        showModal(<PatientRecordForm facilityId={facilityId} afterAction={afterAction} />);
    };

    return (
        <SafeAreaView style={styles.container}>
            <List
                itemsList={patientRecordsList}
                title={'Patient Records'}
                renderItem={({ item }) => <PatientItem patient={item} reloadPage={reloadPage} />}
            />
            <View style={styles.btnContainer}>
                <FAB icon="plus" style={styles.addBtn} onPress={openAddModal} />
            </View>
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
    addBtn: {
        bottom: 20,
    },
    btnContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});

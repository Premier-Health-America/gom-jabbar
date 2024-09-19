import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import { getSavedToken } from '@/utils/tokenService';
import { Colors } from '@/constants/Colors';
import patientRecordApi from '@/lib/patientRecordApi';

const LeftContent = () => <Avatar.Icon icon="account" size={50} style={styles.avatar} />;

export function PatientItem({ patient }: any) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newPatientRecord, setNewPatientRecord] = useState(patient.record);

    const updatePressed = async () => {
        setIsLoading(true);
        if (isUpdating) {
            try {
                const token = await getSavedToken();
                const body = { record: newPatientRecord };
                await patientRecordApi.updatePatientRecord({
                    patientRecordId: patient.id,
                    body,
                    token,
                });
            } catch (error) {
                console.error('Error updating patient records', error);
                Toast.show('Error');
            }
        }
        setIsUpdating(!isUpdating);
        setIsLoading(false);
    };

    return (
        <Card style={styles.card}>
            <Card.Title title={`Name: ${patient.patient_name}`} left={LeftContent} />
            <Card.Content>
                <Text variant="bodyLarge">Record:</Text>
                {isUpdating ? (
                    <TextInput
                        mode="outlined"
                        multiline={true}
                        value={newPatientRecord}
                        onChangeText={setNewPatientRecord}
                        style={styles.input}
                    />
                ) : (
                    <Text variant="bodyMedium">{newPatientRecord}</Text>
                )}
            </Card.Content>
            <Card.Actions>
                <Button style={styles.deleteBtn}>Delete</Button>
                <Button style={styles.updateBtn} onPress={updatePressed} disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update'}
                </Button>
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        marginHorizontal: 5,
        backgroundColor: Colors.white,
    },
    deleteBtn: {
        color: Colors.primary,
        backgroundColor: Colors.white,
    },
    updateBtn: {
        color: Colors.white,
        backgroundColor: Colors.primary,
    },
    confirmBtn: {
        backgroundColor: Colors.secondary,
        marginTop: 20,
    },
    avatar: {
        backgroundColor: Colors.secondary,
    },
    modalContent: {
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        marginBottom: 20,
    },
});

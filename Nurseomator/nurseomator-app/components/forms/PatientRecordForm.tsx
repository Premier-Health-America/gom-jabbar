import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import { getSavedToken } from '@/utils/tokenService';
import { Colors } from '@/constants/Colors';
import PatientRecordApi from '@/lib/patientRecordApi';

interface PatientRecordFormProps {
    facilityId: number | string;
    afterAction: () => void;
}

const PatientRecordForm = ({ facilityId, afterAction }: PatientRecordFormProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        setIsLoading(true);
        try {
            const token = await getSavedToken();
            const body = {
                facility_id: facilityId,
                patient_name: values.patient_name,
                record: values.record,
            };
            console.log(body);
            await PatientRecordApi.createPatientRecord({ body, token });
            afterAction();
        } catch (error) {
            console.error('Error creating patient records', error);
            Toast.show('Error');
        }
        setIsLoading(false);
    };
    return (
        <Formik initialValues={{ patient_name: '', record: '' }} onSubmit={handleSubmit}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }) => (
                <View>
                    <TextInput
                        label="Patient Name"
                        onChangeText={handleChange('patient_name')}
                        onBlur={handleBlur('patient_name')}
                        value={values.patient_name}
                        error={!!errors.patient_name}
                        style={styles.input}
                    />

                    <TextInput
                        label="Record"
                        onChangeText={handleChange('record')}
                        onBlur={handleBlur('record')}
                        value={values.record}
                        error={!!errors.record}
                        multiline
                        style={styles.input}
                    />

                    <TouchableOpacity
                        onPress={() => handleSubmit()}
                        disabled={isSubmitting || !values.patient_name || !values.record}
                        style={[
                            styles.button,
                            (isSubmitting || !values.patient_name || !values.record) &&
                                styles.buttonDisabled,
                        ]}
                    >
                        <LinearGradient
                            colors={[Colors.primary, Colors.secondary]}
                            style={styles.buttonGradient}
                        >
                            <Text style={styles.buttonText}>
                                {isSubmitting ? 'Processing...' : 'Create'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    );
};

// Styles for the input and error message
const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
    },
    error: {
        color: Colors.error,
        marginBottom: 10,
    },
    button: {
        width: '100%',
        borderRadius: 50,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonGradient: {
        paddingVertical: 14,
        borderRadius: 50,
    },
    buttonText: {
        color: Colors.buttonText,
        textAlign: 'center',
        fontSize: 16,
    },
});

export default PatientRecordForm;

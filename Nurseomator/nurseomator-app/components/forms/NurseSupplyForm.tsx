import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import { getSavedToken } from '@/utils/tokenService';
import { Colors } from '@/constants/Colors';
import SupplyApi from '@/lib/supplyApi';

interface NurseSupplyFormProps {
    type: string;
    supplyId: number | string;
    afterAction: () => void;
}

const NurseSupplyForm = ({ type, supplyId, afterAction }: NurseSupplyFormProps) => {
    const handleSubmit = async (values: any) => {
        try {
            const token = await getSavedToken();
            const body = {
                supply_id: supplyId,
                quantity: +values.quantity,
            };
            if (type === 'restock') await SupplyApi.restock({ body, token });
            if (type === 'consumption') await SupplyApi.consumption({ body, token });
            afterAction();
        } catch (error) {
            console.error('Error creating nurse supply', error);
            Toast.show('Error');
        }
    };

    const isValidNumber = (str: string) => {
        if (str == '') return true;
        return !isNaN(+str) && !isNaN(parseFloat(str));
    };

    return (
        <Formik initialValues={{ quantity: '' }} onSubmit={handleSubmit}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }) => (
                <View>
                    <TextInput
                        label="Quantity:"
                        onChangeText={handleChange('quantity')}
                        onBlur={handleBlur('quantity')}
                        value={values.quantity}
                        error={!isValidNumber(values.quantity)}
                        style={styles.input}
                    />

                    <TouchableOpacity
                        onPress={() => handleSubmit()}
                        disabled={
                            isSubmitting || !values.quantity || !isValidNumber(values.quantity)
                        }
                        style={[
                            styles.button,
                            (isSubmitting || !values.quantity || !isValidNumber(values.quantity)) &&
                                styles.buttonDisabled,
                        ]}
                    >
                        <LinearGradient
                            colors={[Colors.primary, Colors.secondary]}
                            style={styles.buttonGradient}
                        >
                            <Text style={styles.buttonText}>
                                {isSubmitting ? 'Processing...' : 'Request'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    );
};

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

export default NurseSupplyForm;

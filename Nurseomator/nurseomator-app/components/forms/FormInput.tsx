import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface FormInputProps {
    placeholder: string;
    value: string;
    handleChange: (text: string) => void;
    handleBlur: (e?: any) => void; // Update the type to accept an optional argument
    secureTextEntry?: boolean;
    showIcon?: boolean;
    onToggleVisibility?: () => void;
}

export function FormInput({
    placeholder,
    value,
    handleChange,
    handleBlur,
    secureTextEntry = false,
    showIcon = false,
    onToggleVisibility,
}: FormInputProps) {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder={placeholder}
                autoCapitalize="none"
                value={value}
                onChangeText={handleChange}
                onBlur={handleBlur} // Correctly type the handleBlur prop
                secureTextEntry={secureTextEntry}
                style={styles.textInput}
            />
            {showIcon && (
                <TouchableOpacity onPress={onToggleVisibility} style={styles.icon}>
                    <Ionicons
                        name={secureTextEntry ? 'eye-off' : 'eye'}
                        size={20}
                        color="#455fff"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 16,
        width: 250,
    },
    textInput: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 8,
    },
    icon: {
        marginLeft: 8,
    },
});

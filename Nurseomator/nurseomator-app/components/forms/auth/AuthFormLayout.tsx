import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Formik, FormikHelpers } from 'formik';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { FormInput } from '../FormInput';

interface AuthFormLayoutProps {
    title: string;
    subText: string;
    buttonText: string;
    initialValues: { username: string; password: string };
    onSubmit: (
        values: { username: string; password: string },
        formikHelpers: FormikHelpers<{ username: string; password: string }>
    ) => void | Promise<void>;
    isRegister?: boolean;
    errorMessage: string | undefined;
}

export function AuthFormLayout({
    title,
    subText,
    buttonText,
    initialValues,
    onSubmit,
    isRegister = false,
    errorMessage,
}: AuthFormLayoutProps) {
    const router = useRouter();
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    return (
        <LinearGradient colors={[Colors.primary, Colors.background]} style={styles.gradient}>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subText}>
                            {subText}{' '}
                            <Text
                                style={styles.linkText}
                                onPress={() => router.push(isRegister ? '/login' : '/register')}
                            >
                                {isRegister ? 'Login' : 'Register now'}
                            </Text>
                        </Text>

                        <FormInput
                            placeholder="Username"
                            value={values.username}
                            handleChange={handleChange('username')}
                            handleBlur={() => handleBlur}
                        />

                        <FormInput
                            placeholder="Password"
                            value={values.password}
                            handleChange={handleChange('password')}
                            handleBlur={() => handleBlur}
                            secureTextEntry={!passwordVisible}
                            showIcon={true}
                            onToggleVisibility={() => setPasswordVisible(!passwordVisible)}
                        />

                        {!!errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

                        <TouchableOpacity
                            onPress={() => handleSubmit()}
                            disabled={isSubmitting || !values.username || !values.password}
                            style={[
                                styles.button,
                                (isSubmitting || !values.username || !values.password) &&
                                    styles.buttonDisabled,
                            ]}
                        >
                            <LinearGradient
                                colors={[Colors.primary, Colors.secondary]}
                                style={styles.buttonGradient}
                            >
                                <Text style={styles.buttonText}>
                                    {isSubmitting ? 'Processing...' : buttonText}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        backgroundColor: Colors.background,
        borderRadius: 20,
        padding: 24,
        width: '90%',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 8,
    },
    subText: {
        color: Colors.text,
        fontSize: 16,
        marginBottom: 20,
    },
    linkText: {
        color: Colors.primary,
    },
    errorText: {
        color: Colors.error,
        marginTop: 8,
        marginBottom: 16,
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

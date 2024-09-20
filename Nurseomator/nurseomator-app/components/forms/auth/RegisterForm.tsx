import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { AuthFormLayout } from './AuthFormLayout';
import { useRouter } from 'expo-router';

export function RegisterForm() {
    const { register } = useAuth();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = async (
        values: { username: string; password: string },
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        const { data, error } = await register(values.username, values.password);
        setSubmitting(false);
        if (data) router.replace('/map');
        else if (error) setErrorMessage(error.message);
    };

    return (
        <AuthFormLayout
            title="Register"
            subText="Back to"
            buttonText="Register"
            initialValues={{ username: '', password: '' }}
            isRegister={true}
            errorMessage={errorMessage}
            onSubmit={handleSubmit}
        />
    );
}

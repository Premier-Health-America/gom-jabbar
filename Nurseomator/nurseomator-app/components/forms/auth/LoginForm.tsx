import React, { useState } from 'react';
import { useAuth } from '@/context/auth';
import { AuthFormLayout } from './AuthFormLayout';
import { useRouter } from 'expo-router';

export function LoginForm() {
    const { login } = useAuth();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = async (
        values: { username: string; password: string },
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        const { data, error } = await login(values.username, values.password);
        setSubmitting(false);
        if (data) router.replace('/map');
        else if (error) setErrorMessage(error.message);
    };

    return (
        <AuthFormLayout
            title="Login"
            subText="Don't have an account?"
            buttonText="Login"
            initialValues={{ username: '', password: '' }}
            errorMessage={errorMessage}
            onSubmit={handleSubmit}
        />
    );
}

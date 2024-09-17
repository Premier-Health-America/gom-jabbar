import { Stack } from 'expo-router';
import { RegisterForm } from '@/components/forms/auth/RegisterForm';

export default function Register() {
    return (
        <>
            <Stack.Screen options={{ title: 'sign up', headerShown: false }} />
            <RegisterForm />
        </>
    );
}

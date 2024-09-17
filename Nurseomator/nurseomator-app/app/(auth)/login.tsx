import { Stack } from 'expo-router';
import { LoginForm } from '@/components/forms/auth/LoginForm';

export default function Login() {
    return (
        <>
            <Stack.Screen options={{ title: 'Login', headerShown: false }} />
            <LoginForm />
        </>
    );
}

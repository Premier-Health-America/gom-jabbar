import { useRouter, useSegments, useFocusEffect } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { saveToken, getSavedToken, clearToken } from '@/utils/tokenService';
import { useIsNavReady } from '@/hooks/useIsNavReady';
import * as NurseApi from '@/lib/nurseApi';

interface LoginResponse {
    data: {} | undefined;
    error: Error | undefined;
}

interface LogoutResponse {
    error: any | undefined;
    data: {} | undefined;
}

interface AuthContextValue {
    login: (username: string, password: string) => Promise<LoginResponse>;
    logout: () => Promise<LogoutResponse>;
    register: (username: string, password: string) => Promise<LoginResponse>;
    nurse: {} | null;
    authInitialized: boolean;
}

interface ProviderProps {
    children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: ProviderProps) {
    const [nurse, setNurse] = useState<{} | null>(null);
    const [authInitialized, setAuthInitialized] = useState<boolean>(false);
    const isNavigationReady = useIsNavReady();

    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if (!isNavigationReady) return;

        const inAuthGroup = segments[0] === '(auth)';

        if (!authInitialized) return;

        if (!nurse && !inAuthGroup) {
            router.push('/login');
        } else if (nurse && inAuthGroup) {
            router.push('/map');
        }
    }, [nurse, segments, authInitialized, isNavigationReady, router]);

    useEffect(() => {
        (async () => {
            try {
                // If authToken is saved, retrive Nurse
                const savedToken = await getSavedToken();
                if (savedToken) {
                    const response = await NurseApi.getNurse(savedToken);
                    setNurse(response.nurse);
                }
            } catch (error) {
                console.error('Error initializing auth', error);
                setNurse(null);
            }

            setAuthInitialized(true);
        })();
    }, []);

    const login = async (username: string, password: string): Promise<LoginResponse> => {
        try {
            const response = await NurseApi.login(username, password);
            setNurse(response.nurse);
            await saveToken(response.token);
            return { data: response.nurse, error: undefined };
        } catch (error) {
            setNurse(null);
            return { error: error as Error, data: undefined };
        }
    };

    const logout = async (): Promise<LogoutResponse> => {
        try {
            // Clear token and nurse info
            setNurse(null);
            await clearToken();
            return { error: undefined, data: undefined };
        } catch (error) {
            return { error, data: undefined };
        }
    };

    const register = async (username: string, password: string): Promise<LoginResponse> => {
        try {
            const response = await NurseApi.register(username, password);
            setNurse(response.nurse);
            await saveToken(response.token);
            return { data: response.nurse, error: undefined };
        } catch (error) {
            setNurse(null);
            return { error: error as Error, data: undefined };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                register,
                nurse,
                authInitialized,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }

    return authContext;
};

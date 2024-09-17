import { useRouter, useSegments } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { saveToken, getSavedToken, clearToken } from '@/utils/tokenService';
import { useIsNavReady } from '@/hooks/useIsNavReady';
import NurseApi from '@/lib/nurseApi';
interface LoginResponse {
    data: {} | undefined;
    error: Error | undefined;
}

interface LogoutResponse {
    error: any | undefined;
}

interface AuthContextValue {
    login: (username: string, password: string) => Promise<LoginResponse>;
    logout: () => Promise<LogoutResponse>;
    register: (username: string, password: string) => Promise<LoginResponse>;
    nurse: { username: string } | null;
    authInitialized: boolean;
}

interface ProviderProps {
    children: React.ReactNode;
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: ProviderProps) {
    const [nurse, setNurse] = useState<{ username: string } | null>(null);
    const [authInitialized, setAuthInitialized] = useState<boolean>(false);
    const isNavigationReady = useIsNavReady();

    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if (!isNavigationReady || !authInitialized) return;

        const isInAuthScreen = segments[0] === '(auth)';
        if (nurse && isInAuthScreen) {
            router.push('/map');
        } else if (!nurse && !isInAuthScreen) {
            router.push('/login');
        }
    }, [nurse, segments, authInitialized, isNavigationReady, router]);

    useEffect(() => {
        (async () => {
            if (!nurse) {
                try {
                    // If authToken is saved, retrieve Nurse
                    const savedToken = await getSavedToken();
                    if (savedToken) {
                        const response = await NurseApi.getNurse({ token: savedToken });
                        console.log('GET NURSE response', response);
                        setNurse(response.nurse);
                    }
                } catch (error) {
                    console.error('Error initializing auth', error);
                    setNurse(null);
                }
                setAuthInitialized(true);
            }
        })();
    }, []);

    const login = async (username: string, password: string): Promise<LoginResponse> => {
        try {
            const response = await NurseApi.login({ username, password });
            console.log('LOGIN response', response);
            setNurse(response.nurse);
            await saveToken(response.token);
            return { data: response.nurse, error: undefined };
        } catch (error) {
            console.log('error', error);
            setNurse(null);
            return { error: error as Error, data: undefined };
        }
    };

    const logout = async (): Promise<LogoutResponse> => {
        try {
            // Clear token and nurse info
            await clearToken();
            setNurse(null);
            console.log('here');
            return { error: undefined };
        } catch (error) {
            return { error };
        }
    };

    const register = async (username: string, password: string): Promise<LoginResponse> => {
        try {
            const response = await NurseApi.register({ username, password });
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

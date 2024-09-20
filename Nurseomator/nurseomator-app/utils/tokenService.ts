import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const TOKEN_KEY = 'authToken';
const EXPIRATION_KEY = 'authTokenExpiration';
const TOKEN_EXPIRATION_DURATION_MS = 1 * 60 * 60 * 1000; // 1h

const browserStorage = {
    setItem: (key: string, value: string) => localStorage.setItem(key, value),
    getItem: (key: string) => localStorage.getItem(key),
    removeItem: (key: string) => localStorage.removeItem(key),
};

export async function saveToken(token: string): Promise<void> {
    try {
        const expirationDate = new Date(Date.now() + TOKEN_EXPIRATION_DURATION_MS).toISOString();
        if (Platform.OS === 'web') {
            browserStorage.setItem(TOKEN_KEY, token);
            browserStorage.setItem(EXPIRATION_KEY, expirationDate);
        } else {
            await SecureStore.setItemAsync(TOKEN_KEY, token);
            await SecureStore.setItemAsync(EXPIRATION_KEY, expirationDate);
        }
    } catch (error) {
        console.error('Failed to save token', error);
    }
}

export async function getSavedToken(): Promise<string | null> {
    try {
        let token: string | null = null;
        let expirationDateStr: string | null = null;

        if (Platform.OS === 'web') {
            token = browserStorage.getItem(TOKEN_KEY);
            expirationDateStr = browserStorage.getItem(EXPIRATION_KEY);
        } else {
            token = await SecureStore.getItemAsync(TOKEN_KEY);
            expirationDateStr = await SecureStore.getItemAsync(EXPIRATION_KEY);
        }

        if (!token || !expirationDateStr) {
            return null;
        }

        const expirationDate = new Date(expirationDateStr);
        if (Date.now() > expirationDate.getTime()) {
            await clearToken();
            return null;
        }

        return token;
    } catch (error) {
        console.error('Failed to get token', error);
        return null;
    }
}

export async function clearToken(): Promise<void> {
    try {
        if (Platform.OS === 'web') {
            browserStorage.removeItem(TOKEN_KEY);
            browserStorage.removeItem(EXPIRATION_KEY);
        } else {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
            await SecureStore.deleteItemAsync(EXPIRATION_KEY);
        }
    } catch (error) {
        console.error('Failed to clear token', error);
    }
}

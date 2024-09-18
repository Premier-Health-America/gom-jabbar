import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { AuthProvider } from '@/context/auth';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={DefaultTheme}>
            <AuthProvider>
                <RootSiblingParent>
                    <Stack>
                        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                        <Stack.Screen name="map" options={{ headerShown: false }} />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                </RootSiblingParent>
            </AuthProvider>
        </ThemeProvider>
    );
}

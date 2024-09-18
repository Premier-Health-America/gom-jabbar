import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Text } from 'react-native';
import { useIsNavReady } from '@/hooks/useIsNavReady';

export default function Home() {
    const router = useRouter();
    const isNavigationReady = useIsNavReady();

    useEffect(() => {
        if (isNavigationReady) router.push('/map');
    }, [isNavigationReady]);

    return <Text>Loading...</Text>;
}

import React, { useState } from 'react';
import { useNavigation, useFocusEffect } from 'expo-router';

export function useIsNavReady() {
    const [isNavigationReady, setNavigationReady] = useState(false);

    const navigation = useNavigation();

    // Check if the navigation is ready
    useFocusEffect(
        React.useCallback(() => {
            setNavigationReady(true);
            return () => {
                setNavigationReady(false);
            };
        }, [navigation])
    );

    return isNavigationReady;
}

import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getSavedToken } from '@/utils/tokenService';

export default function Map() {
    const [token, setToken] = useState<string | null>('');

    useEffect(() => {
        (async () => {
            try {
                const savedToken = await getSavedToken();
                setToken(savedToken);
            } catch (_) {}
        })();
    }, []);
    return (
        <>
            <View>
                <Text>This is Map Page</Text>
                <Text>{token}</Text>
            </View>
        </>
    );
}

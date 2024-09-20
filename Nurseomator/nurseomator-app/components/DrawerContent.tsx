import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/context/auth';

export function DrawerContent(props: any) {
    const { bottom } = useSafeAreaInsets();
    const { nurse, logout } = useAuth();

    const logoutPressed = async () => {
        await logout();
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} scrollEnabled={false}>
                {nurse && (
                    <View style={{ padding: 40 }}>
                        <Text>Hello {nurse.username}!</Text>
                    </View>
                )}
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <Pressable onPress={logoutPressed} style={{ padding: 20, paddingBottom: bottom + 10 }}>
                <Text>Logout</Text>
            </Pressable>
        </View>
    );
}

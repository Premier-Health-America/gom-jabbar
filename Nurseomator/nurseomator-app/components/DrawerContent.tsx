import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { useAuth } from '@/context/auth';

export function DrawerContent(props: any) {
    const { bottom } = useSafeAreaInsets();
    const router = useRouter();
    const { logout } = useAuth();

    const closeDrawer = async () => {
        console.log('close');
        const { error } = await logout();
        if (error) {
            console.log(error);
        } else {
            router.replace('/login');
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} scrollEnabled={false}>
                <View style={{ padding: 20 }}>
                    <Image
                        style={{ height: 35 }}
                        resizeMode="contain"
                        source={require('../assets/images/logo.png')}
                    />
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <Pressable onPress={closeDrawer} style={{ padding: 20, paddingBottom: bottom + 10 }}>
                <Text>Logout</Text>
            </Pressable>
        </View>
    );
}

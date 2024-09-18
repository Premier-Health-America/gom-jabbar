import React from 'react';
import 'react-native-reanimated';
import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AuthProvider } from '@/context/auth';
import { Colors } from '@/constants/Colors';
import { DrawerContent } from '@/components/DrawerContent';
import { OpenDrawerBtn } from '@/components/navigation/OpenDrawerBtn';

export default function MapLayout() {
    return (
        <AuthProvider>
            <Drawer
                screenOptions={{
                    drawerLabelStyle: {
                        marginLeft: -20,
                    },
                    drawerActiveTintColor: Colors.primary,
                    drawerInactiveTintColor: Colors.text,
                    headerLeft: () => <OpenDrawerBtn />,
                }}
                drawerContent={DrawerContent}
            >
                <Drawer.Screen
                    name="index"
                    options={{
                        headerShown: false,
                        drawerLabel: 'Map',
                        drawerIcon: ({ size, color }) => (
                            <Ionicons name="map" size={size} color={color} />
                        ),
                    }}
                />

                <Drawer.Screen
                    name="supplies"
                    options={{
                        title: 'Supplies',
                        drawerLabel: 'Supplies',
                        drawerIcon: ({ size, color }) => (
                            <Ionicons name="medkit-outline" size={size} color={color} />
                        ),
                    }}
                />

                <Drawer.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        drawerLabel: 'Settings',
                        drawerIcon: ({ size, color }) => (
                            <Ionicons name="settings" size={size} color={color} />
                        ),
                    }}
                />
            </Drawer>
        </AuthProvider>
    );
}

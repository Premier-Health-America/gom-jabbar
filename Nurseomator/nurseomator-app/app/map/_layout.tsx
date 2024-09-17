import React from 'react';
import 'react-native-reanimated';
import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerContent } from '@/components/DrawerContent';

export default function MapLayout() {
    return (
        <Drawer
            screenOptions={{
                drawerLabelStyle: {
                    marginLeft: -20,
                },
                // drawerActiveBackgroundColor: 'gray',
                // drawerActiveTintColor: 'white',
                // drawerInactiveTintColor: 'white'
            }}
            drawerContent={DrawerContent}
        >
            <Drawer.Screen
                name="index"
                options={{
                    drawerLabel: 'Map',
                    title: 'Map',
                    drawerIcon: ({ size, color }) => (
                        <Ionicons name="map" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="supplies"
                options={{
                    drawerLabel: 'Supplies',
                    title: 'Supplies',
                    drawerIcon: ({ size, color }) => (
                        <Ionicons name="medkit-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="settings"
                options={{
                    drawerLabel: 'Settings',
                    title: 'Settings',
                    drawerIcon: ({ size, color }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    ),
                }}
            />
        </Drawer>
    );
}

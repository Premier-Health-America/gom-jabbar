import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'My Supplies',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'medkit' : 'medkit-outline'} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="requests"
                options={{
                    title: 'My Requests',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? 'document' : 'document-outline'}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

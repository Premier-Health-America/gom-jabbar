import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

export default function Facility() {
    const { facilityId } = useLocalSearchParams<{ facilityId: string }>();

    return <Text>facility: {facilityId}</Text>;
}

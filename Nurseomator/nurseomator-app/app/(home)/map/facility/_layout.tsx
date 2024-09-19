import { Stack, useLocalSearchParams } from 'expo-router';

export default function FacilityLayout() {
    const { facilityName } = useLocalSearchParams<{ facilityName: string }>();

    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: facilityName || 'Facility' }} />
        </Stack>
    );
}

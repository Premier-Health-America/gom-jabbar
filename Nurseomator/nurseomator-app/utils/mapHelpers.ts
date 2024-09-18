import * as Location from 'expo-location';
import MapView from 'react-native-maps';

export const INIT_LOCATION = {
    latitude: 45.5258464,
    longitude: -73.5515539,
};

const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

export interface Facility {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

export interface LocationCoords {
    latitude: number;
    longitude: number;
}

export interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

export function convertLocationToRegion(location: LocationCoords): Region {
    return {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta,
        longitudeDelta,
    };
}

export function moveToLocation(mapRef: React.RefObject<MapView>, location: LocationCoords) {
    const region = convertLocationToRegion(location);

    if (mapRef.current) {
        mapRef.current.animateToRegion(region, 1000);
    }
}

export async function getMyLocation(): Promise<Location.LocationObject | undefined> {
    try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            console.warn('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        return location;
    } catch (err) {
        console.warn('Error getting location:', err);
    }
}

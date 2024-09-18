import { Platform, Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import MapView from 'react-native-maps';
import Toast from 'react-native-root-toast';
import { CustomMarker } from '@/components/map/CustomMarker';
import {
    INIT_LOCATION,
    LocationCoords,
    Region,
    convertLocationToRegion,
    getMyLocation,
    moveToLocation,
} from '@/utils/mapHelpers';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LocationApi from '@/lib/locationApi';
import { Colors } from '@/constants/Colors';
import { FloatingBtn } from '@/components/navigation/FloatingBtn';
import { useAuth } from '@/context/auth';
import { getSavedToken } from '@/utils/tokenService';

export function MapComponent() {
    if (Platform.OS === 'web') {
        return <Text>No map on web</Text>;
    }

    const [myLocation, setMyLocation] = useState<LocationCoords>(INIT_LOCATION);
    const [region, setRegion] = useState<Region>(convertLocationToRegion(INIT_LOCATION));
    const [reportLocationActions, setReportLocationActions] = useState([]);
    const mapRef = useRef<MapView>(null);
    const { nurse } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                const statusOptions = await LocationApi.getStatusOptions();
                const actions = statusOptions.map((label: string) => {
                    const icon = LocationApi.getStatusIcon(label);
                    return { icon, label, onPress: () => reportMyLocation(label) };
                });

                setReportLocationActions(actions);
            } catch (error) {
                console.error('Error initializing status options', error);
                setReportLocationActions([]);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (mapRef.current) {
                const location = await getMyLocation();
                if (location) {
                    setMyLocation(location.coords);
                    moveToLocation(mapRef, location.coords);
                }
            }
        })();
    }, [mapRef]);

    const focusOnLocation = () => {
        if (myLocation.latitude && myLocation.longitude) {
            moveToLocation(mapRef, myLocation);
        }
    };

    const reportMyLocation = async (status: string) => {
        const token = await getSavedToken();
        if (token) {
            try {
                const body = {
                    latitude: myLocation.latitude,
                    longitude: myLocation.longitude,
                    status: status,
                };
                await LocationApi.reportLocation({ body, token });
                Toast.show('Success');
            } catch (error) {
                console.error('Error reporting location', error);
                Toast.show('Error');
            }
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
                ref={mapRef}
            >
                {myLocation.latitude && myLocation.longitude && (
                    <CustomMarker
                        coordinate={myLocation}
                        title={nurse?.username || 'Nurse'}
                        image={require('@/assets/images/nurse.png')}
                    />
                )}
            </MapView>

            <View style={styles.locateBtn}>
                <TouchableOpacity onPress={focusOnLocation} activeOpacity={0.8}>
                    <Ionicons name="locate" size={30} color={Colors.primary} />
                </TouchableOpacity>
            </View>

            <FloatingBtn mainIcon="map-marker-right" actionItems={reportLocationActions} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    locateBtn: {
        position: 'absolute',
        top: 50,
        right: 20,
        backgroundColor: Colors.white,
        borderRadius: 30,
        padding: 10,
    },
    reportBtn: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.white,
        borderRadius: 30,
        padding: 10,
    },
});

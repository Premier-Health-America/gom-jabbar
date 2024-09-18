import { StyleSheet, View, Image, ImageSourcePropType } from 'react-native';
import React from 'react';
import { Marker } from 'react-native-maps';

interface CustomMarkerProps {
    coordinate: {
        latitude: number;
        longitude: number;
    };
    title: string | undefined;
    image: ImageSourcePropType;
}
export function CustomMarker({ coordinate, title, image }: CustomMarkerProps) {
    return (
        <Marker coordinate={coordinate} title={title}>
            <View style={styles.markerContainer}>
                <Image source={image} style={styles.markerImage} />
            </View>
        </Marker>
    );
}

const styles = StyleSheet.create({
    markerImage: {
        width: '100%',
        height: '100%',
    },
    markerContainer: {
        width: 30,
        height: 30,
        overflow: 'hidden',
    },
});

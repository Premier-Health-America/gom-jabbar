import React from 'react';
import { View, StyleSheet } from 'react-native';
import { OpenDrawerBtn } from '@/components/navigation/OpenDrawerBtn';
import { MapComponent } from '@/components/map/MapComponent';
import { Colors } from '@/constants/Colors';

export default function Map() {
    return (
        <View style={styles.fullView}>
            <View style={styles.openDrawerBtnContainer}>
                <OpenDrawerBtn />
            </View>
            <MapComponent />
        </View>
    );
}

const styles = StyleSheet.create({
    fullView: {
        ...StyleSheet.absoluteFillObject,
    },
    openDrawerBtnContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        backgroundColor: Colors.white,
        borderRadius: 30,
        padding: 10,
    },
});

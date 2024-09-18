import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OpenDrawerBtn } from '@/components/navigation/OpenDrawerBtn';

export default function Map() {
    return (
        <>
            <View>
                <View style={styles.openDrawerBtnContainer}>
                    <OpenDrawerBtn />
                </View>
                <Text>This is Map Page</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    openDrawerBtnContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
    },
});

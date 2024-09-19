import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import { Colors } from '@/constants/Colors';

export function NurseSupplyItem({ nurseSupply }: any) {
    const restocking = nurseSupply.restocking_in_progress;

    return (
        <Card style={styles.card}>
            <Card.Content style={styles.content}>
                <Text>{nurseSupply.supply.name}</Text>
                <Text>Qty: {nurseSupply.quantity}</Text>
            </Card.Content>

            <Card.Actions>
                <Button style={styles.requestBtn}>-</Button>
                <Button style={styles.requestBtn} disabled={restocking}>
                    {restocking ? 'Restocking in progress...' : '+'}
                </Button>
            </Card.Actions>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        marginHorizontal: 5,
        backgroundColor: Colors.white,
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    requestBtn: {},
});

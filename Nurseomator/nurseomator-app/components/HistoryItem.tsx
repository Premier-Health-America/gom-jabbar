import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, Text, TextInput } from 'react-native-paper';
import { format } from 'date-fns';
import { Colors } from '@/constants/Colors';

export function HistoryItem({ history }: any) {
    const restock = history.type === 'restock';

    const udapteDate = new Date(history.updated_at);
    const formattedUdapteDate = format(udapteDate, 'MMM dd, yyyy H:mma');

    const deliveryDate = history.delivery_date ? new Date(history.delivery_date) : null;
    const formattedDeliveryDate = deliveryDate ? format(deliveryDate, 'MMM dd, yyyy') : null;

    return (
        <Card style={styles.card}>
            <Card.Content>
                <Text>{history.supply.name}</Text>
            </Card.Content>

            <Card.Content style={styles.content}>
                <Text>Type: {history.type}</Text>
                <Text>
                    Qty {restock ? 'requested' : 'consumed'}: {history.quantity}
                </Text>
            </Card.Content>

            {history.delivery_date && (
                <Card.Content>
                    <Text>Delivery date: {formattedDeliveryDate}</Text>
                </Card.Content>
            )}

            <Card.Actions>
                <Text>Updated {formattedUdapteDate}</Text>
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
});

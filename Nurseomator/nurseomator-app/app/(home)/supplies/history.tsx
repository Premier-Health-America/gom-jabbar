import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getSavedToken } from '@/utils/tokenService';
import SupplyApi from '@/lib/supplyApi';
import { List } from '@/components/List';
import { HistoryItem } from '@/components/HistoryItem';

interface History {
    id: number;
    quantity: number;
    type: string;
    delivery_date: Date;
    updated_at: Date;
    supply: {
        supply_id: number;
        name: string;
    };
}

export default function MyHistory() {
    const [historyList, setHistoryList] = useState<History[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const token = await getSavedToken();
                const list = await SupplyApi.getMyHistory({ token });
                setHistoryList(list);
            } catch (error) {
                console.error('Error initializing history', error);
                setHistoryList([]);
            }
        })();
    }, []);

    return (
        <View>
            <List
                itemsList={historyList}
                title={'My History'}
                renderItem={({ item }) => <HistoryItem history={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({});

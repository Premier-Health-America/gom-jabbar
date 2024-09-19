import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getSavedToken } from '@/utils/tokenService';
import SupplyApi from '@/lib/supplyApi';
import { List } from '@/components/List';
import { NurseSupplyItem } from '@/components/NurseSupplyItem';

interface NurseSupply {
    id: number;
    quantity: number;
    restocking_in_progress: boolean;
    supply: {
        supply_id: number;
        name: string;
    };
}

export default function MySupplies() {
    const [suppliesList, setSuppliesList] = useState<NurseSupply[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const token = await getSavedToken();
                const list = await SupplyApi.getMySupplies({ token });
                setSuppliesList(list);
            } catch (error) {
                console.error('Error initializing supplies', error);
                setSuppliesList([]);
            }
        })();
    }, []);

    return (
        <View>
            <List
                itemsList={suppliesList}
                title={'My supplies'}
                renderItem={({ item }) => <NurseSupplyItem nurseSupply={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({});

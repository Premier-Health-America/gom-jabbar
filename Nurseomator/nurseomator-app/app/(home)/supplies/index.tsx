import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getSavedToken } from '@/utils/tokenService';
import SupplyApi from '@/lib/supplyApi';
import { List } from '@/components/List';
import { NurseSupplyItem } from '@/components/NurseSupplyItem';
import { FAB } from 'react-native-paper';
import Toast from 'react-native-root-toast';
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
    const { refresh } = useLocalSearchParams<{
        refresh: string;
    }>();

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
    }, [refresh]);

    const openAddModal = () => {
        Toast.show('To implement');
    };

    return (
        <View style={styles.container}>
            <List
                itemsList={suppliesList}
                title={'My supplies'}
                renderItem={({ item }) => <NurseSupplyItem nurseSupply={item} />}
            />
            <View style={styles.btnContainer}>
                <FAB icon="plus" style={styles.addBtn} onPress={openAddModal} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addBtn: {
        bottom: 20,
    },
    btnContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});

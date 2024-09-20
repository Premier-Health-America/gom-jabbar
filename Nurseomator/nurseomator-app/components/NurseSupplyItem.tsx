import { StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { Colors } from '@/constants/Colors';
import { useModal } from '@/context/modal';
import { useRouter } from 'expo-router';
import NurseSupplyForm from './forms/NurseSupplyForm';

export function NurseSupplyItem({ nurseSupply }: any) {
    const restocking = nurseSupply.restocking_in_progress;
    const { showModal, hideModal } = useModal();
    const router = useRouter();

    const afterAction = () => {
        hideModal();
        router.push(`/supplies?refresh=true`);
    };

    const openModal = (type: string) => {
        showModal(
            <NurseSupplyForm type={type} supplyId={nurseSupply.id} afterAction={afterAction} />
        );
    };

    return (
        <Card style={styles.card}>
            <Card.Content style={styles.content}>
                <Text>{nurseSupply.supply.name}</Text>
                <Text>Qty: {nurseSupply.quantity}</Text>
            </Card.Content>

            <Card.Actions>
                <Button style={styles.requestBtn} onPress={() => openModal('consumption')}>
                    -
                </Button>
                <Button
                    style={styles.requestBtn}
                    disabled={restocking}
                    onPress={() => openModal('restock')}
                >
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

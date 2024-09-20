import React, { useState } from 'react';
import { FAB, FABGroupProps } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface FloatingBtnProps {
    actionItems: FABGroupProps['actions'];
    mainIcon: string;
}

export function FloatingBtn({ actionItems, mainIcon }: FloatingBtnProps) {
    const [open, setOpen] = useState(false);

    const onStateChange = ({ open }: { open: boolean }) => setOpen(open);

    return (
        <FAB.Group
            open={open}
            visible
            icon={mainIcon}
            actions={actionItems}
            onStateChange={onStateChange}
            color={Colors.primary}
            rippleColor={Colors.white}
            fabStyle={styles.fab}
        />
    );
}

const styles = StyleSheet.create({
    fab: {
        borderRadius: 30,
        backgroundColor: Colors.white,
    },
});

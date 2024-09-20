import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Modal, Portal, Button, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

// Define the shape of the modal context
interface ModalContextType {
    showModal: (content: ReactNode) => void;
    hideModal: () => void;
    visible: boolean;
}

// Create context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Create a custom hook to use the modal context
export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

// ModalProvider Component
export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [modalContent, setModalContent] = useState<ReactNode>(null);

    // Function to show the modal
    const showModal = (content: ReactNode) => {
        setModalContent(content);
        setVisible(true);
    };

    // Function to hide the modal
    const hideModal = () => {
        setVisible(false);
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal, visible }}>
            {children}
            <Portal>
                <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={styles.modalContainer}
                >
                    <Button onPress={hideModal} style={styles.closeButton}>
                        Close
                    </Button>
                    <View>{modalContent}</View>
                </Modal>
            </Portal>
        </ModalContext.Provider>
    );
};

// Styling for modal
const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 8,
        display: 'flex',
    },
    closeButton: {
        width: 50,
        alignSelf: 'flex-end',
    },
});

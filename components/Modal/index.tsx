import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, Layout, Button, CardHeader } from '@ui-kitten/components';

interface ModalProps {
    isOpen: boolean,
    title: string,
    onCloseModal: () => void,
    children: React.ReactNode
}

export default ({ isOpen, onCloseModal, children, title }: ModalProps) => {
    return (
        <Layout>
            <Modal 
                visible={isOpen}
                backdropStyle={styles.backdrop}
                onBackdropPress={onCloseModal}
            >
                <Layout style={styles.modalContainer}> 
                    <CardHeader title={title} />  
                    {children}      
                    <Button onPress={onCloseModal} style={styles.confirmButton}>
                        CONFIRM
                    </Button>
                </Layout>
            </Modal>
        </Layout>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 256,
        padding: 16,
    },
    confirmButton: {
        marginTop: 20
    }
});
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Modal, Layout, Button } from '@ui-kitten/components';

interface ModalProps {
    isOpen: boolean,
    title: string,
    onCloseModal: (hasConfirmed: boolean) => void,
    children: React.ReactNode
}

export default ({ isOpen, onCloseModal, children, title }: ModalProps) => {
    return (
        <Layout>
            <Modal 
                visible={isOpen}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => onCloseModal(false)}
            >
                <Layout style={styles.modalContainer}> 
                    <Text style={styles.title}>{title}</Text> 
                    {children}      
                    <Button 
                        onPress={() => onCloseModal(true)} 
                        style={styles.confirmButton}
                    >
                        CONFIRM
                    </Button>
                </Layout>
            </Modal>
        </Layout>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 24,
        marginBottom: 20
    },
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
        marginTop: 20,
        width: '100%'
    }
});
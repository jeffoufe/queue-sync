import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Modal, Layout, Button, Spinner } from '@ui-kitten/components';

interface ModalProps {
    isOpen: boolean,
    title: string,
    loading?: boolean,
    onCloseModal: (hasConfirmed: boolean) => void,
    children: React.ReactNode
}

const LoadingIndicator = () => (
    <View style={styles.indicator}>
      <Spinner size='small' status='basic' />
    </View>
  );

export default ({ isOpen, onCloseModal, children, title, loading }: ModalProps) => {
    const buttonProps = loading
        ? { accessoryLeft: LoadingIndicator }
        : {};
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
                        {...buttonProps}
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
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
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
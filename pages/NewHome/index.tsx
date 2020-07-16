import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_PARTY_ACTIONS } from '../../reducers/queue/constants';
import { TopNavigation, List, Modal, Input, QRScanner } from '../../components';

interface NewHomeProps {
    navigation: any
};

export default ({ navigation }: NewHomeProps) => {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [userName, setUserName] = useState('');
    const [isQRScannerVisible, setQRScannerVisible] = useState(false);
    const { loading } = useSelector((state: any) => state.queue)
    const dispatch = useDispatch();

    const onCreateRoom = () => setShowCreationModal(true);

    const onCloseModal = (hasConfirmed: boolean) => {
        if (hasConfirmed) {
            dispatch({
                type: CREATE_PARTY_ACTIONS.saga,
                successCallback: () => {
                    setShowCreationModal(false);
                    navigation.navigate('Queue');
                },
                payload: { 
                    name: roomName,
                    hostName: userName
                }
            });
        }
    }

    const data = [
        { title: 'Create a new party', icon: 'plus-outline', onPress: onCreateRoom },
        { title: 'Join an existing party', icon: 'log-in-outline', onPress: () => setQRScannerVisible(true) }
    ];

    return (
        <SafeAreaView>
            {isQRScannerVisible && <QRScanner />}

            <TopNavigation title='QueueSync' navigation={navigation} />
            <View>
                <List data={data} />
            </View>
            <Modal
                isOpen={showCreationModal}
                title='Enter party name'
                loading={loading}
                onCloseModal={onCloseModal}
            >
                <Input
                    placeholder='Party name...'
                    onChange={setRoomName}
                />
                <Input
                    placeholder='Admin name... (optional)'
                    onChange={setUserName}
                />
            </Modal>
        </SafeAreaView>
    );
}
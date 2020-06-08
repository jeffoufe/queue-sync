import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { SET_ROOM_NAME } from '../../reducers/queue/constants';
import { TopNavigation, List, Modal, Input } from '../../components';

interface NewHomeProps {
    navigation: any
};

export default ({ navigation }: NewHomeProps) => {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [roomName, setRoomName] = useState('');
    const dispatch = useDispatch();

    const onCreateRoom = () => setShowCreationModal(true);

    const onCloseModal = (hasConfirmed: boolean) => {
        if (hasConfirmed) {
            dispatch({
                type: SET_ROOM_NAME,
                payload: { roomName }
            });
            navigation.navigate('Queue');
        }
        setShowCreationModal(false);
    }

    const data = [
        { title: 'Create a new party', icon: 'plus-outline', onPress: onCreateRoom },
        { title: 'Join an existing party', icon: 'log-in-outline' }
    ];

    return (
        <SafeAreaView>
            <TopNavigation title='QueueSync' />
            <View>
                <List data={data} />
            </View>
            <Modal
                isOpen={showCreationModal}
                title='Enter party name'
                onCloseModal={onCloseModal}
            >
                <Input
                    placeholder='Party name...'
                    onChange={setRoomName}
                />
            </Modal>
        </SafeAreaView>
    );
}
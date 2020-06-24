import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TopNavigation, Modal } from '../../components';
import { TrackList } from '../../components';
import { Track } from '../../components/TrackList';
import { GET_PARTY_ACTIONS, DELETE_FROM_QUEUE_ACTIONS } from '../../reducers/queue/constants';
import QRCode from 'react-native-qrcode-svg';

interface QueueProps {
    navigation: any
};

export default ({ navigation }: QueueProps) => {
    const { name, tracks, _id } = useSelector((state: any) => state.queue);
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: GET_PARTY_ACTIONS.saga,
            urlParams: {
                id: _id
            }
        })
    }, []);

    const onDeleteTrackFromQueue = (track: any) => {
        dispatch({
            type: DELETE_FROM_QUEUE_ACTIONS.saga,
            urlParams: {
                id: _id,
                trackId: track.id
            }
        })
    }

    const rightControls = [
        {
            icon: 'search-outline',
            onPress: () => navigation.navigate('Search')
        },
        {
            icon: 'radio-outline',
            onPress: () => navigation.navigate('Settings')
        },
        {
            icon: 'share-outline',
            onPress: () => setShareModalOpen(true)
        }
    ]

    return (
        <SafeAreaView>
            <Modal
                isOpen={isShareModalOpen}
                title={'Share this queue'}
                onCloseModal={() => setShareModalOpen(false)}
            >
                <QRCode value={_id} />
            </Modal>

            <TopNavigation 
                navigation={navigation} 
                title={name ? `${name}'s Queue` : ''}
                rightControls={rightControls}
            />
            <View>
                <TrackList 
                    tracks={tracks}
                    accessory={{
                        icon: 'close-outline',
                        onPress: onDeleteTrackFromQueue
                    }} 
                />
            </View>
        </SafeAreaView>
    );
}
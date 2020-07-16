import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TopNavigation, Modal } from '../../components';
import { TrackList } from '../../components';
import { GET_PARTY_ACTIONS, DELETE_FROM_QUEUE_ACTIONS } from '../../reducers/queue/constants';
import QRCode from 'react-native-qrcode-svg';

interface QueueProps {
    navigation: any,
};

export default ({ navigation }: QueueProps) => {
    const { name, tracks, _id } = useSelector((state: any) => state.queue);
    const [isShareModalOpen, setShareModalOpen] = useState(false);
    const dispatch = useDispatch();

    const getParty = () => {
        dispatch({
            type: GET_PARTY_ACTIONS.saga,
            urlParams: {
                id: _id
            }
        });
    }

    useEffect(() => {
        getParty();
        return () => Alert.alert(
            "Leave the party",
            "As the party host, the music will stop if you leave the party",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { 
                    text: "OK", 
                }
            ],
            { cancelable: false }
        );
      
        // setInterval(getParty, 1000);
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

    const NoTrack = () => (
        <View>
            <Text>No track in the queue</Text>
            <Text>You can add a track by tapping the search icon</Text>
        </View>
    );

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
                leftControl={{
                    icon: 'arrow-back-outline',
                    onPress: navigation.goBack
                }}
            />
            <View>
                {!!tracks.length 
                    ? (
                        <TrackList 
                            tracks={tracks}
                            accessory={{
                                icon: 'close-outline',
                                onPress: onDeleteTrackFromQueue
                            }} 
                        />
                    )
                    : <NoTrack />
                }
            </View>
        </SafeAreaView>
    );
}
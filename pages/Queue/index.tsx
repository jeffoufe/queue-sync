import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TopNavigation, Modal, TrackList, Content } from '../../components';
import { GET_PARTY_ACTIONS, DELETE_FROM_QUEUE_ACTIONS } from '../../reducers/queue/constants';
import QRCode from 'react-native-qrcode-svg';
import { Icon } from '@ui-kitten/components';
import { REFRESH_SPOTIFY } from '../../reducers/user/constants';

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

    const refreshToken = () => {
        dispatch({
            type: REFRESH_SPOTIFY
        })
    }

    const showWarning = () => Alert.alert(
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
    )

    useEffect(() => {
        getParty();
        refreshToken();
        return showWarning;
      
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
            icon: 'share-outline',
            onPress: () => setShareModalOpen(true)
        }
    ]

    const NoTrack = () => (
        <View style={styles.noTrack}>
            <View style={styles.noTrackIcon}>
                <Icon name='info-outline' height={75} width={75} fill='#8F9BB3' />
            </View>
            <Text style={styles.noTrackText}>
                No track in the queue
            </Text>
        </View>
    );

    return (
        <>
            <Modal
                isOpen={isShareModalOpen}
                title={'Share this party'}
                buttonText='CLOSE'
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
                    onPress: showWarning
                }}
            />
            
            <Content>
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
            </Content>
        </>
    );
}

const styles = StyleSheet.create({
    noTrack: {
        marginTop: Dimensions.get('window').height * 0.5 - 130,
    },
    noTrackIcon: {
        marginLeft: Dimensions.get('window').width * 0.5 - 37.5,
    },
    noTrackText: {
        color: 'rgb(143, 155, 179)',
        textAlign: 'center'
    }
})
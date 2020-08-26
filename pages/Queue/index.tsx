import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { TopNavigation, Modal, TrackList, Content, Header } from '../../components';
import { GET_PARTY_ACTIONS } from '../../reducers/queue/constants';
import { GET_CREDENTIALS_ACTIONS } from '../../reducers/user/constants';
import QRCode from 'react-native-qrcode-svg';
import { Icon } from '@ui-kitten/components';

/* const DZ = require('../../public/js/dz.js');
console.log(DZ.init); */

interface QueueProps {
    navigation: any,
};

export default ({ navigation }: QueueProps) => {
    const { name, tracks, _id, loadingGetParty } = useSelector((state: any) => state.queue);
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

    const getCredentials = () => {
        dispatch({
            type: GET_CREDENTIALS_ACTIONS.saga,
            payload: {
                id: _id
            }
        })
    }

    useEffect(() => {
        getParty();
        getCredentials();
      
        // setInterval(getParty, 1000);
    }, []);

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
                No Track In Queue
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
            />
            
            <Content loading={loadingGetParty}>
                {!!tracks.length 
                    ? (
                        <View>
                            <Header noMarginTop>Currently Playing</Header>
                            <TrackList 
                                navigation={navigation}
                                tracks={[tracks[0]]}
                                actions={['addToPlaylist']}
                            />
                            {tracks.length > 1 && (
                                <>
                                    <Header>Next In Queue</Header>
                                    <TrackList 
                                        navigation={navigation}
                                        tracks={tracks.slice(1)}
                                        actions={['deleteFromQueue', 'addToPlaylist']}
                                    />
                                </>
                            )}
                        </View>
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
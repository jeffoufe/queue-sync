import React, { useState } from 'react';
import { List, Modal } from '../../components';
import { INSTANT_PLAY_TRACK } from '../../reducers/queue/constants';
import { ACTIONS } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Button, Icon, IconProps } from '@ui-kitten/components';
import { renderItem } from '../../components/List';

export interface Track {
    image: string,
    name: string,
    artist: string,
    isPlayed: boolean,
    duration?: number,
    id: string,
    type: string,
    onPress?: (track: Track) => void, 
    progress: number
}

interface TrackListProps {
    tracks: Array<Track>,
    onPressPlay?: boolean,
    navigation: any,
    actions: Array<string>,
    loading?: boolean
}

export default ({ tracks, onPressPlay, loading, navigation, actions }: TrackListProps) => {
    const dispatch = useDispatch();
    const { _id } = useSelector((state: any) => state.queue);
    const { id } = useSelector((state: any) => state.trackList)
    const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

    const onInstantPlayTrack = (track: Track) => {
        dispatch({ type: INSTANT_PLAY_TRACK, payload: { tracks: [track] } });
    }

    const allActions = ACTIONS(dispatch, navigation, _id);

    const data = tracks.map((track: Track) => ({
        title: track.name,
        progress: track.progress,
        description: track.artist,
        avatar: track.image,
        type: track.type,
        onPress: track.onPress || (() => ({})),
        // onPress: () => onPressPlay ? onInstantPlayTrack(track) : ({}),
        ...(actions.length 
            ? {
                accessory: {
                    icon: 'more-vertical-outline',
                    onPress: () => setSelectedTrack(track)
                }
            }
            : {}
        )
    }));

    const onCloseModal = () => setSelectedTrack(null);

    const dataActions = actions.map((action: string, index: number) => (
        <Button 
            style={styles.button} 
            status='basic'
            appearance='ghost'
            accessoryLeft={(props: IconProps) => <Icon {...props} name={allActions[action].icon}/>}
            onPress={() => {
                allActions[action].action(selectedTrack, id);
                onCloseModal();
            }}
        >
            {allActions[action].title}
        </Button>
    ))

    return <>
        <List data={data} loading={loading} />
        <Modal isOpen={!!selectedTrack} title={'Actions'} onCloseModal={onCloseModal}>
            <View>
                {dataActions}
            </View>
        </Modal>
    </>
}

const styles = StyleSheet.create({
    button: {
        color: 'black'
    }
});
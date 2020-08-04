import React, { useState } from 'react';
import { List, Modal } from '../../components';
import { INSTANT_PLAY_TRACK } from '../../reducers/queue/constants';
import { ACTIONS } from './constants';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
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
    actions: Array<string>
}

export default ({ tracks, onPressPlay, navigation, actions }: TrackListProps) => {
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

    const dataActions = actions.map((action: string, index: number) => renderItem({
        item: {
            title: allActions[action].title,
            icon: allActions[action].icon,
            onPress: () => {
                allActions[action].action(selectedTrack, id);
                onCloseModal();
            }
        },
        noBorder: true
    }, index))

    return <>
        <List data={data} />
        <Modal isOpen={!!selectedTrack} title={'Actions'} onCloseModal={onCloseModal}>
            <View>
                {dataActions}
            </View>
        </Modal>
    </>
}
import React from 'react';
import { List } from '../../components';
import { INSTANT_PLAY_TRACK } from '../../reducers/queue/constants';
import { useDispatch } from 'react-redux';

export interface Track {
    image: string,
    name: string,
    artist: string,
    isPlayed: boolean,
    duration?: number,
    id: string,
    type: string,
    progress: number
}

interface TrackListProps {
    tracks: Array<Track>,
    onPressPlay?: boolean,
    accessory?: {
        icon: string,
        onPress: (track?: Track) => void
    }
}

export default ({ tracks, accessory, onPressPlay }: TrackListProps) => {
    const dispatch = useDispatch();

    const onInstantPlayTrack = (track: Track) => {
        dispatch({ type: INSTANT_PLAY_TRACK, payload: { tracks: [track] } });
    }

    const data = tracks.map((track: Track) => ({
        title: track.name,
        progress: track.progress,
        description: track.artist,
        avatar: track.image,
        onPress: () => onPressPlay ? onInstantPlayTrack(track) : ({}),
        ...(accessory 
            ? {
                accessory: {
                    icon: accessory.icon,
                    onPress: () => accessory.onPress(track)
                }
            }
            : {}
        )
    }));

    return <List data={data} />
}
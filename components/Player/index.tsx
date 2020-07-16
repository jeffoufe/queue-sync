import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, Icon } from '@ui-kitten/components';
import { TrackImage } from '..';
import { canSeePlayer } from '../../utils'
import { Track } from '../TrackList';
import { PLAY_PAUSE_TRACK, NEXT_SONG } from '../../reducers/queue/constants';
import { start } from 'repl';

interface PlayerTrackImageProps {
    track: Track
};

interface PlayerProps {
    tracks: Array<Track>
    accessoryLeft?: any
    accessoryRight?: any
}

const renderItemAccessory = (style: any, track: Track, onPressPlay: () => void, onPressNext: () => void, hasNext: boolean) => (
    <View style={styles.icons}>
        <Icon {...style} name={`${track.isPlayed ? 'pause' : 'play'}-circle`} height={25} width={25} onPress={onPressPlay} color='black' />
        {hasNext && <Icon {...style} name='skip-forward' height={25} width={25} onPress={onPressNext} color='black' />}
    </View>
);

const PlayerTrackImage = ({ track: { image } }: PlayerTrackImageProps) => (
    <View style={styles.icon}>
        {image && <TrackImage image={image} />}
    </View>
);

const Player = ({ tracks }) => {
    if (!tracks.length) {
        return null;
    }
    
    const dispatch = useDispatch();
    const onPressNext = () => dispatch({ type: NEXT_SONG });
    const onPressPlay = () => dispatch({ type: PLAY_PAUSE_TRACK });

    return (
        <ListItem
            title={tracks[0].name}
            description={tracks[0].artist}
            style={styles.listItem}
            accessoryLeft={() => <PlayerTrackImage track={tracks[0]} />}
            accessoryRight={(style: any) => renderItemAccessory(style, tracks[0], onPressPlay, onPressNext, tracks.length > 1)}
        />
    );
}

export default () => {
    const { route } = useSelector((state: any) => state.router);
    const { tracks } = useSelector((state: any) => state.queue);

    return canSeePlayer(route) && (
        <Player tracks={tracks} />
    )
};

const styles = StyleSheet.create({
    listItem: {
        marginLeft: 5
    },
    youtubePlayer: {
        height: 35,
        width: 35
    },
    icon: {
        marginLeft: 5,
        marginRight: 5
    },
    icons: {
        display: 'flex',
        flexDirection: 'row',
        width: 70,
        marginRight: 10,
        justifyContent: 'space-between'
    }
});
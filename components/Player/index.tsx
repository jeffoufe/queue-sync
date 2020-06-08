import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, Icon } from '@ui-kitten/components';
import { TrackImage } from '..';
import { canSeePlayer } from '../../utils'
import { Track } from '../TrackList';
import { PLAY_PAUSE_TRACK, NEXT_SONG } from '../../reducers/queue/constants';

interface PlayerTrackImageProps {
    image: string
};

const renderItemAccessory = (track: Track, onPressPlay: () => void, onPressNext: () => void, hasNext: boolean) => (
    <View style={styles.icons}>
        <Icon name={`${track.isPlayed ? 'pause' : 'play'}-circle`} height={25} onPress={onPressPlay} />
        {hasNext && <Icon name='skip-forward' height={25} onPress={onPressNext} />}
    </View>
);

const PlayerTrackImage = ({ image }: PlayerTrackImageProps) => (
    <View style={styles.icon}>
        {image && <TrackImage image={image} />}
    </View>
)

export default () => { 
    const { route } = useSelector((state: any) => state.router);
    const { tracks } = useSelector((state: any) => state.queue);
    const dispatch = useDispatch(); 
        
    const onPressPlay = () => dispatch({ type: PLAY_PAUSE_TRACK });
    const onPressNext = () => dispatch({ type: NEXT_SONG });

    const playerProps = tracks[0] 
        ? { 
            accessoryRight: () => renderItemAccessory(tracks[0], onPressPlay, onPressNext, tracks.length > 1),
            accessoryLeft: () => <PlayerTrackImage image={tracks[0].image} />
        }
        : {};

    return canSeePlayer(route) && (
        <ListItem
            title={tracks[0] ? tracks[0].name : 'No track'}
            description={tracks[0] ? tracks[0].artist : ''}
            style={styles.listItem}
            {...playerProps}
        />
    )
}

const styles = StyleSheet.create({
    listItem: {
        marginLeft: 5
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
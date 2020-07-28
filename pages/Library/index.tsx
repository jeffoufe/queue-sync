import React from 'react';
import { View } from 'react-native';
import { TopNavigation, List } from '../../components';
import { useDispatch } from 'react-redux';
import { CHANGE_PROVIDER, SOUNDCLOUD, SPOTIFY } from '../../reducers/library/constants';

interface NewHomeProps {
    navigation: any
};

export default ({ navigation }: NewHomeProps) => {
    const dispatch = useDispatch();
    const goToPlaylists = () => navigation.navigate('Playlist');

    const goToSoundCloudPlaylists = () => {
        dispatch({
            type: CHANGE_PROVIDER,
            payload: { currentProvider: SOUNDCLOUD }
        })
        goToPlaylists()
    }

    const goToSpotifyPlaylists = () => {
        dispatch({
            type: CHANGE_PROVIDER,
            payload: { currentProvider: SPOTIFY }
        })
        goToPlaylists()
    }

    const data = [
        { title: 'Your Spotify Playlists', icon: 'list-outline', onPress: goToSpotifyPlaylists },
        { title: 'Your SoundCloud Playlists', icon: 'list-outline', onPress: goToSoundCloudPlaylists }
    ];

    return (
        <>
            <TopNavigation title='QueueSync' navigation={navigation} />
            <View>
                <List data={data} />
            </View>
        </>
    )
}
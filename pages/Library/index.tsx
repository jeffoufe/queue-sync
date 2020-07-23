import React from 'react';
import { View } from 'react-native';
import { TopNavigation, List } from '../../components';

interface NewHomeProps {
    navigation: any
};

export default ({ navigation }: NewHomeProps) => {
    const goToSpotifyPlaylists = () => navigation.navigate('SpotifyPlaylists');

    const data = [
        { title: 'Spotify Playlists', icon: 'list-outline', onPress: goToSpotifyPlaylists }
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
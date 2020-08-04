import React from 'react';
import { View, Image } from 'react-native';
import { TopNavigation, List } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_PROVIDER, SOUNDCLOUD, SPOTIFY, MIXED, RESET_SELECTED_TRACK } from '../../reducers/library/constants';
import { Svg, Path } from 'react-native-svg';

interface NewHomeProps {
    navigation: any
};

export default ({ navigation }: NewHomeProps) => {
    const dispatch = useDispatch();
    const { selectedTrack } = useSelector((state: any) => state.library);
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

    const goToMixedPlaylists = () => {
        dispatch({
            type: CHANGE_PROVIDER,
            payload: { currentProvider: MIXED }
        })
        goToPlaylists()
    }

    /* const renderIcon = (style: any) => (
        <Image
            {...style}
          source={{
            // uri: 'data:image/png;base64,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',
            uri: 'https://www.pinclipart.com/picdir/middle/62-627098_social-spotify-svg-png-icon-free-download-80298.png'
            }}
        />
    ); */

    const data = [
        ...(!selectedTrack || selectedTrack.type === SPOTIFY 
            ? [{ title: 'Your Spotify Playlists', icon: 'list-outline', onPress: goToSpotifyPlaylists, accessory: { icon: 'arrow-ios-forward-outline' } }]
            : []
        ),
        ...(!selectedTrack
            ? [{ title: 'Your SoundCloud Playlists', icon: 'list-outline', onPress: goToSoundCloudPlaylists, accessory: { icon: 'arrow-ios-forward-outline' } }]
            : []
        ),
        { title: 'Your Mixed Playlists', icon: 'list-outline', onPress: goToMixedPlaylists, accessory: { icon: 'arrow-ios-forward-outline' } }
    ];

    const onGoBack = () => {
        dispatch({ type: RESET_SELECTED_TRACK });
        navigation.goBack();
    }

    const leftControl = selectedTrack
        ? { leftControl: { icon: 'arrow-back-outline', onPress: onGoBack } }
        : {}

    return (
        <>
            <TopNavigation 
                title={!!selectedTrack ? 'Add to a playlist' : 'Library'}
                navigation={navigation} 
                {...leftControl}
            />
            <View>
                <List data={data} />
            </View>
        </>
    )
}
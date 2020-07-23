import React, { useEffect } from 'react';
import { TopNavigation, List, Content } from '../../components';
import { SpotifyPlaylist } from '../../reducers/library/types';
import { GET_SPOTIFY_PLAYLISTS_ACTIONS } from '../../reducers/library/constants';
import { useDispatch, useSelector } from 'react-redux';
import { GO_TO_PLAYLIST } from '../../reducers/trackList/constants';

interface NewHomeProps {
    navigation: any
};

export default ({ navigation }: NewHomeProps) => {
    const dispatch = useDispatch();
    const { spotifyPlaylists } = useSelector((state: any) => state.library);

    const goBack = () => navigation.navigate('Library');
    const goToTrackList = (id: string, name: string) => {
        dispatch({
            type: GO_TO_PLAYLIST,
            payload: { id, name }
        })
        navigation.navigate('TrackList');
    }

    useEffect(() => {
        dispatch({
            type: GET_SPOTIFY_PLAYLISTS_ACTIONS.saga
        })
    }, [])

    const spotifyData = spotifyPlaylists.map((spotifyPlaylist: SpotifyPlaylist) => { 
        const onPress = () => {
            goToTrackList(spotifyPlaylist.id, spotifyPlaylist.name)
        };
        return {
            title: spotifyPlaylist.name,
            avatar: spotifyPlaylist.images[0].url,
            onPress,
            accessory: {
                icon: 'arrow-ios-forward-outline',
            }
        }
    })

    return (
        <>
            <TopNavigation 
                navigation={navigation} 
                title='Spotify Playlists'
                leftControl={{
                    icon: 'arrow-back-outline',
                    onPress: goBack
                }}
            />
            
            <Content>
                <List data={spotifyData} />
            </Content>
        </>
    )
}

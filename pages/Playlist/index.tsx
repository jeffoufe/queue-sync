import React, { useEffect } from 'react';
import { TopNavigation, List, Content } from '../../components';
import { Playlist } from '../../reducers/library/types';
import { GET_SPOTIFY_PLAYLISTS_ACTIONS, GET_SOUNDCLOUD_PLAYLISTS_ACTIONS } from '../../reducers/library/constants';
import { useDispatch, useSelector } from 'react-redux';
import { GO_TO_PLAYLIST } from '../../reducers/trackList/constants';
import { CHANGE_PROVIDER } from '../../reducers/tracks/constants';

interface SpotifyPlaylistsProps {
    navigation: any
};

export default ({ navigation }: SpotifyPlaylistsProps) => {
    const dispatch = useDispatch();
    const { _id } = useSelector((state: any) => state.queue);
    const { playlists, currentProvider, loadingGetPlaylists } = useSelector((state: any) => state.library);

    const goBack = () => navigation.navigate('Library');
    const goToTrackList = (id: string, name: string, ids: Array<string>) => {
        dispatch({
            type: GO_TO_PLAYLIST,
            payload: { id, name, ids }
        })
        navigation.navigate('TrackList');
    }

    const providerData = (() => {
        switch(currentProvider) {
            case 1:
                return {
                    actions: GET_SOUNDCLOUD_PLAYLISTS_ACTIONS,
                    urlParams: { id: _id },
                    title: 'Your SoundCloud Playlists'
                }
            case 0:
            default:
                return {
                    actions: GET_SPOTIFY_PLAYLISTS_ACTIONS,
                    title: 'Your Spotify Playlists'
                }
        }
    })();

    useEffect(() => {
        dispatch({ 
            type: providerData.actions.saga,
            urlParams: providerData.urlParams,
        })
    }, [currentProvider])

    const data = playlists.map((playlist: Playlist) => { 
        const onPress = () => {
            goToTrackList(playlist.id, playlist.name, playlist.ids)
        };
        return {
            title: playlist.name,
            avatar: playlist.images[0].url,
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
                title={providerData.title}
                leftControl={{
                    icon: 'arrow-back-outline',
                    onPress: goBack
                }}
                rightControls={[{
                    icon: 'plus',
                    onPress: () => {
                        dispatch({
                            type: CHANGE_PROVIDER,
                            payload: { currentProviderIndex: -1 }
                        });
                        navigation.navigate('Search');
                    }
                }]}
            />
            
            <Content loading={loadingGetPlaylists}>
                <List data={data} />
            </Content>
        </>
    )
}

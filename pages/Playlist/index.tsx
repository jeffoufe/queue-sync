import React, { useEffect, useState } from 'react';
import { TopNavigation, TrackList, Content, Modal, Input } from '../../components';
import { Playlist } from '../../reducers/library/types';
import {
    CREATE_MIXED_PLAYLIST_ACTIONS,
    SPOTIFY, 
    SOUNDCLOUD, 
    MIXED, 
    ADD_TO_PLAYLIST_ACTIONS,
    RESET_SELECTED_TRACK,
    ADD_PLAYLIST_TO_PLAYLIST_ACTIONS,
    GET_PLAYLISTS_ACTIONS
} from '../../reducers/library/constants';
import { useDispatch, useSelector } from 'react-redux';
import { GO_TO_PLAYLIST } from '../../reducers/trackList/constants';
import { CHANGE_PROVIDER } from '../../reducers/tracks/constants';

interface SpotifyPlaylistsProps {
    navigation: any
};

export default ({ navigation }: SpotifyPlaylistsProps) => {
    const dispatch = useDispatch();
    const { _id } = useSelector((state: any) => state.queue);
    const { playlists, currentProvider, loadingGetPlaylists, selectedTrack, playlistToBeAdded } = useSelector((state: any) => state.library);
    const [showCreationModal, setShowCreationModal] = useState<boolean>(false);
    const [playlistName, setPlaylistName] = useState<string>('');

    const onCloseModal = () => {
        dispatch({
            type: CREATE_MIXED_PLAYLIST_ACTIONS.saga,
            urlParams: { id: _id },
            successCallback: () => {
                setShowCreationModal(false);
                dispatch({ 
                    type: GET_PLAYLISTS_ACTIONS.saga,
                    urlParams: { id: _id, type: -1 }
                })
            },
            payload: {
                playlist: {
                    userId: _id,
                    name: playlistName,
                    image: ''
                }
            }
        })
    }

    const goBack = () => navigation.navigate('Library');

    const goToTrackList = (id: string, name: string, ids: Array<string>) => {
        dispatch({
            type: GO_TO_PLAYLIST,
            payload: { id, name, ids }
        })
        navigation.navigate('TrackList');
    }

    const addToPlaylist = (playlistId: string) => {
        dispatch({
            type: ADD_TO_PLAYLIST_ACTIONS.saga,
            urlParams: { playlistId, id: _id },
            payload: { track: selectedTrack },
            successCallback: () => {
                dispatch({ type: RESET_SELECTED_TRACK });
                navigation.goBack();
                navigation.goBack();
            }
        })
    }

    const addPlaylistToPlaylist = (playlistId: string, playlistName: string, playlistImages: string) => {
        dispatch({
            type: ADD_PLAYLIST_TO_PLAYLIST_ACTIONS.saga,
            urlParams: { playlistId: playlistToBeAdded, id: _id },
            payload: { 
                playlist: { 
                    id: playlistId, 
                    type: currentProvider,
                    name: playlistName,
                    images: playlistImages
                }
            },
            successCallback: () => {
                dispatch({ 
                    type: GET_PLAYLISTS_ACTIONS.saga,
                    urlParams: { id: _id }
                });
                navigation.goBack();
            }
        })
    }

    const providerData = (() => {
        switch(currentProvider) {
            case MIXED:
                return {
                    actions: GET_PLAYLISTS_ACTIONS,
                    urlParams: { id: _id, type: -1 },
                    title: 'Your Mixed Playlists'
                }
            case SPOTIFY:
                return {
                    actions: GET_PLAYLISTS_ACTIONS,
                    urlParams: { id: _id, type: 0 },
                    title: 'Your Spotify Playlists',
                }
            case SOUNDCLOUD:
            default:
                return {
                    actions: GET_PLAYLISTS_ACTIONS,
                    title: 'Your SoundCloud Playlists',
                    urlParams: { id: _id, type: 1 },
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
            const { id, image, name } = playlist;
            if (selectedTrack) {
                addToPlaylist(id);
            } 
            else if (playlistToBeAdded) { 
                addPlaylistToPlaylist(id, name, image);
            }  
            else {
                goToTrackList(id, name, playlist.ids)
            }
        };
        return {
            ...playlist,
            onPress
        }
    })

    const onPressPlus = () => {
        switch (currentProvider) {
            case SOUNDCLOUD:
                dispatch({
                    type: CHANGE_PROVIDER,
                    payload: { currentProviderIndex: -1 }
                });
                navigation.navigate('Search');
                break;
            case MIXED:
                setShowCreationModal(true);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <TopNavigation 
                navigation={navigation} 
                title={!!selectedTrack ? 'Add to a playlist' : providerData.title}
                leftControl={{
                    icon: 'arrow-back-outline',
                    onPress: goBack
                }}
                rightControls={currentProvider === SPOTIFY || !!selectedTrack || playlistToBeAdded
                    ? [] 
                    : [{
                        icon: 'plus',
                        onPress: onPressPlus
                    }]
                }
            />

            {currentProvider === MIXED && <Modal
                isOpen={showCreationModal}
                title='Enter new playlist name'
                loading={false}
                onCloseModal={onCloseModal}
            >
                <Input
                    placeholder='Playlist name...'
                    onChange={setPlaylistName}
                />
            </Modal>}
            
            <Content loading={loadingGetPlaylists} noPadding>
                <TrackList 
                    navigation={navigation}
                    tracks={data}
                    actions={(!!selectedTrack || !!playlistToBeAdded)
                        ? []
                        : ['addPlaylistToQueue', ...(currentProvider === 1 ? ['deletePlaylist'] : [])]
                    }
                />
            </Content>
        </>
    )
}

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TrackList, TopNavigation, DropdownModal, Content } from '../../components';
import { CHANGE_PROVIDER, FETCH_PLAYLISTS } from '../../reducers/tracks/constants';
import { PROVIDERS, FETCH_TRACKS } from '../../reducers/tracks/constants';
import { ADD_TO_QUEUE_ACTIONS } from '../../reducers/queue/constants';
import { SAVE_PLAYLIST_ACTIONS, GET_SOUNDCLOUD_PLAYLISTS_ACTIONS } from '../../reducers/library/constants';

interface QueueProps {
    navigation: any
};

export default ({ navigation }: QueueProps) => {
    const [ isModalOpen, setModalOpen ] = useState(true);
    const { _id } = useSelector((state: any) => state.queue);
    const tracksReducer = useSelector((state: any) => state.tracks);
    const { currentProviderIndex } = tracksReducer;
    const provider = currentProviderIndex >= 0 ? PROVIDERS[currentProviderIndex]. toLowerCase() : 'playlists';
    const { loading, tracks, playlists } = tracksReducer[provider]
    const dispatch = useDispatch();

    const onSearch = (search: string) => {
        dispatch({ type: currentProviderIndex >= 0 ? FETCH_TRACKS : FETCH_PLAYLISTS, payload: { search } })
    }
    
    const onAddTrackToQueue = (track: any) => {
        dispatch({
            type: ADD_TO_QUEUE_ACTIONS.saga,
            payload: { track },
            urlParams: { id: _id }
        })
    }

    const onSavePlaylist = (playlist: any) => {
        dispatch({
            type: SAVE_PLAYLIST_ACTIONS.saga,
            payload: { playlist },
            urlParams: { id: _id },
            successCallback: () => {
                dispatch({
                    type: GET_SOUNDCLOUD_PLAYLISTS_ACTIONS.saga,
                    urlParams: { id: _id },
                });
                navigation.navigate('Playlist')
            }
        })
    }

    return (
        <>
            <TopNavigation 
                onSearch={onSearch} 
                navigation={navigation}
                leftControl={{
                    icon: 'arrow-back-outline',
                    onPress: navigation.goBack
                }}
                rightControls={currentProviderIndex >= 0
                    ? [{
                        icon: 'menu-2-outline',
                        onPress: () => setModalOpen(true)
                    }]
                    : []}
            />
            {currentProviderIndex > -1 && <DropdownModal 
                isOpen={isModalOpen} 
                onCloseModal={() => setModalOpen(false)} 
                options={PROVIDERS}
                title='Choose a provider'
                selectedIndex={currentProviderIndex}
                onChange={(currentProviderIndex: number) => {
                    dispatch({ type: CHANGE_PROVIDER, payload: { currentProviderIndex } })
                }}
            />}
            <Content>
                <TrackList 
                    tracks={currentProviderIndex === -1 ? playlists : tracks}
                    onPressPlay={currentProviderIndex >= 0}
                    accessory={{
                        icon: 'plus',
                        onPress: currentProviderIndex >= 0 ? onAddTrackToQueue : onSavePlaylist
                    }} 
                />
            </Content>
        </>
    );
}
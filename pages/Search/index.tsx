import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TrackList, TopNavigation, DropdownModal, Content } from '../../components';
import { FETCH_PLAYLISTS_ACTIONS, FETCH_TRACKS_ACTIONS, PROVIDERS, CHANGE_PROVIDER_ACTIONS } from '../../reducers/tracks/constants';

interface QueueProps {
    navigation: any
};

export default ({ navigation }: QueueProps) => {
    const [ isModalOpen, setModalOpen ] = useState(true);
    const [ searchValue, setSearchValue ] = useState("");
    const tracksReducer = useSelector((state: any) => state.tracks);
    const { _id } = useSelector((state: any) => state.queue);
    const { currentProviderIndex } = tracksReducer;
    const provider = currentProviderIndex >= 0 ? PROVIDERS[currentProviderIndex].toLowerCase() : 'playlists';
    const { loading, tracks, playlists } = tracksReducer[provider]
    const dispatch = useDispatch();

    const onSearch = (search: string) => {
        dispatch({ 
            type: currentProviderIndex >= 0 
                ? FETCH_TRACKS_ACTIONS.saga 
                : FETCH_PLAYLISTS_ACTIONS.saga, 
            loadingPayload: {
                provider: currentProviderIndex === 0 ? 'spotify' : 'soundcloud',
                search
            },
            urlParams: { id: _id, q: search, type: currentProviderIndex },
        })
        setSearchValue(search);
    }

    return (
        <>
            <TopNavigation 
                onSearch={onSearch} 
                navigation={navigation}
                rightControls={currentProviderIndex >= 0
                    ? [
                        {
                            icon: 'menu-2-outline',
                            onPress: () => setModalOpen(true)
                        }
                    ]
                    : []}
            />
            {currentProviderIndex > -1 && <DropdownModal 
                isOpen={isModalOpen} 
                onCloseModal={() => setModalOpen(false)} 
                options={PROVIDERS}
                title='Choose a provider'
                selectedIndex={currentProviderIndex}
                onChange={(currentProviderIndex: number) => {
                    dispatch({ 
                        type: CHANGE_PROVIDER_ACTIONS.saga, 
                        payload: { currentProviderIndex, search: searchValue } 
                    })
                }}
            />}
            <Content noPadding loading={loading}>
                <TrackList 
                    navigation={navigation}
                    tracks={currentProviderIndex === -1 ? playlists : tracks}
                    onPressPlay={currentProviderIndex >= 0}
                    actions={currentProviderIndex >= 0 ? ['addToQueue'] : ['savePlaylist']}
                />
            </Content>
        </>
    );
}
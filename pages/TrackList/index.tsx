import React, { useEffect, useState } from 'react';
import { TopNavigation, TrackList, Content, Header, List, DropdownModal } from '../../components';
import { Button } from '@ui-kitten/components';
import { GET_PLAYLIST_ACTIONS } from '../../reducers/trackList/constants'
import { MIXED, SOUNDCLOUD, SWITCH_IS_ADDING_PLAYLIST, CHANGE_PROVIDER } from '../../reducers/library/constants';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { SPOTIFY } from '../../reducers/library/constants';
import { PROVIDERS } from '../../reducers/tracks/constants';

interface TrackListProps {
    navigation: any
};

export default ({ navigation }: TrackListProps) => {
    const { currentProvider } = useSelector((state: any) => state.library);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [currentProviderIndex, setCurrentProviderIndex] = useState<number>(0);
    const { id, name, tracks, playlists, loading, offset, total } = useSelector((state: any) => state.trackList)
    const { _id } = useSelector((state: any) => state.queue);
    const dispatch = useDispatch();

    const onLoad = () => {
        if (total === 0) {
            dispatch({
                type: GET_PLAYLIST_ACTIONS.saga,
                urlParams: {
                    id: _id,
                    playlistId: id,
                    offset: 0,
                    type: currentProvider
                }
            });   
        } else if (currentProvider !== MIXED) {
            for (let i = 1; i <= total / 50; i++) {
                dispatch({
                    type: GET_PLAYLIST_ACTIONS.saga,
                    urlParams: {
                        id: _id,
                        playlistId: id,
                        offset: i * 50,
                        type: currentProvider
                    }
                });
            }
        }
    }

    useEffect(onLoad, [id, total]);

    const onCloseProviderModal = (isConfirmed: boolean) => {
        setModalOpen(false)
        if (isConfirmed) {
            dispatch({
                type: SWITCH_IS_ADDING_PLAYLIST,
                payload: { playlistToBeAdded: id }
            })
            dispatch({
                type: CHANGE_PROVIDER,
                payload: { currentProvider: currentProviderIndex }
            })
            navigation.navigate('Playlist');
        }
    }

    const onOpenProviderModal = () => setModalOpen(true);

    const playlistList = [
        { title: 'Add A Playlist', icon: 'plus', onPress: onOpenProviderModal },
        ...playlists.map((playlist: any) => ({
            title: playlist.name,
            avatar: playlist.images,
            description: `${playlist.type === SPOTIFY ? 'Spotify' : 'SoundCloud'} Playlist`
        }))
    ]

    return (
        <>
            <TopNavigation
                navigation={navigation}
                title={name}
                leftControl={{
                    icon: 'arrow-back-outline',
                    onPress: navigation.goBack
                }}
            />
            <Content loading={loading && offset === 0} noPadding={currentProvider !== MIXED}>
                <View>
                    {currentProvider === MIXED && (
                        <>
                            <Header noMarginTop>Playlists</Header>
                            <List data={playlistList} />
                            <DropdownModal 
                                isOpen={isModalOpen} 
                                onCloseModal={onCloseProviderModal} 
                                options={PROVIDERS}
                                title='Choose a provider'
                                selectedIndex={currentProviderIndex}
                                onChange={setCurrentProviderIndex}
                            />
                        </>
                    )}
                    {tracks.length > 0 && (
                        <>
                            {currentProvider === MIXED && <Header>Tracks</Header>}
                            <TrackList
                                onEndReached={onLoad}
                                navigation={navigation}
                                loading={tracks.length !== total}
                                tracks={tracks}
                                actions={[
                                    'addToQueue',
                                    ...(currentProvider === MIXED ? ['deleteFromPlaylist'] : [])
                                ]}
                            />
                        </>
                    )}
                </View>
            </Content>
        </>
    )
}
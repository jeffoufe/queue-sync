import React, { useEffect, useState } from 'react';
import { TopNavigation, TrackList, Content, Header, List, DropdownModal } from '../../components';
import { GET_SPOTIFY_PLAYLIST_ACTIONS, GET_SOUNDCLOUD_PLAYLIST_ACTIONS, GET_MIXED_PLAYLIST_ACTIONS } from '../../reducers/trackList/constants'
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
    const { id, name, tracks, playlists } = useSelector((state: any) => state.trackList)
    const { _id } = useSelector((state: any) => state.queue);
    const dispatch = useDispatch();

    useEffect(() => {
        const actions = (() => {
            switch (currentProvider) {
                case SPOTIFY:
                    return GET_SPOTIFY_PLAYLIST_ACTIONS;
                case SOUNDCLOUD:
                    return GET_SOUNDCLOUD_PLAYLIST_ACTIONS;
                case MIXED:
                default:
                    return GET_MIXED_PLAYLIST_ACTIONS;
            }
        })();

        dispatch({
            type: actions.saga,
            urlParams: {
                id: _id,
                playlistId: id
            }
        });
    }, [id]);

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
            avatar: playlist.images[0].url,
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
            <Content>
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
                    <Header>Tracks</Header>
                    <TrackList
                        navigation={navigation}
                        tracks={tracks}
                        actions={[
                            'addToQueue',
                            ...(currentProvider === MIXED ? ['deleteFromPlaylist'] : [])
                        ]}
                    />
                </View>
            </Content>
        </>
    )
}
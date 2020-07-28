import React, { useEffect } from 'react';
import { TopNavigation, TrackList, Content } from '../../components';
import { GET_SPOTIFY_PLAYLIST_ACTIONS, GET_SOUNDCLOUD_PLAYLIST_ACTIONS } from '../../reducers/trackList/constants'
import { useSelector, useDispatch } from 'react-redux';
import { ADD_TO_QUEUE_ACTIONS } from '../../reducers/queue/constants';
import { SPOTIFY } from '../../reducers/library/constants';

interface TrackListProps {
    navigation: any
};

export default ({ navigation }: TrackListProps) => {
    const { currentProvider } = useSelector((state: any) => state.library);
    const { id, name, tracks } = useSelector((state: any) => state.trackList)
    const { _id } = useSelector((state: any) => state.queue);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: currentProvider === SPOTIFY ? GET_SPOTIFY_PLAYLIST_ACTIONS.saga : GET_SOUNDCLOUD_PLAYLIST_ACTIONS.saga,
            urlParams: {
                playlistId: id
            }
        });
    }, [id]);

    const onAddTrackToQueue = (track: any) => {
        dispatch({
            type: ADD_TO_QUEUE_ACTIONS.saga,
            payload: { track },
            urlParams: { id: _id }
        })
    }

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
                <TrackList 
                    tracks={tracks}
                    accessory={{
                        icon: 'plus',
                        onPress: onAddTrackToQueue
                    }}
                />
            </Content>
        </>
    )
}
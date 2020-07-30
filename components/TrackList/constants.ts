import { ADD_TO_QUEUE_ACTIONS, DELETE_FROM_QUEUE_ACTIONS, ADD_PLAYLIST_TO_QUEUE } from '../../reducers/queue/constants';
import { SAVE_PLAYLIST_ACTIONS, GET_SOUNDCLOUD_PLAYLISTS_ACTIONS, SELECT_TRACK, DELETE_FROM_PLAYLIST_ACTIONS } from '../../reducers/library/constants';
import { GET_MIXED_PLAYLIST_ACTIONS } from '../../reducers/trackList/constants';

export const ACTIONS = (dispatch: any, navigation: any, id: string) => ({
    addToQueue: {
        title: 'Add To Queue',
        icon: 'plus',
        action: (track: any) => dispatch({
            type: ADD_TO_QUEUE_ACTIONS.saga,
            payload: { tracks: [track] },
            urlParams: { id }
        })
    },
    addPlaylistToQueue: {
        title: 'Add Playlist To Queue',
        icon: 'plus',
        action: (playlist: any) => dispatch({
            type: ADD_PLAYLIST_TO_QUEUE,
            payload: { playlistId: playlist.id, type: playlist.type }
        })
    },
    deleteFromQueue: {
        title: 'Delete from queue',
        icon: 'close-outline',
        action: (track: any) => dispatch({
            type: DELETE_FROM_QUEUE_ACTIONS.saga,
            urlParams: {
                id,
                trackId: track.id
            }
        })
    },
    deleteFromPlaylist: {
        title: 'Delete from playlist',
        icon: 'close-circle-outline',
        action: (track: any, playlistId: string) => dispatch({
            type: DELETE_FROM_PLAYLIST_ACTIONS.saga,
            urlParams: {
                id,
                playlistId,
                trackId: track.id,

            },
            successCallback: () => {
                dispatch({
                    type: GET_MIXED_PLAYLIST_ACTIONS.saga,
                    urlParams: { 
                        id,
                        playlistId
                    },
                });
            }
        })
    },
    addToPlaylist: {
        icon: 'plus-circle-outline',
        title: 'Add to a playlist',
        action: (track: any) => {
            dispatch({
                type: SELECT_TRACK,
                payload: { track }
            });
            navigation.navigate('Library')
        }
    },
    savePlaylist: {
        title: 'Save this playlist',
        icon: 'save-outline',
        action: (playlist: any) => dispatch({
            type: SAVE_PLAYLIST_ACTIONS.saga,
            payload: { playlist },
            urlParams: { id },
            successCallback: () => {
                dispatch({
                    type: GET_SOUNDCLOUD_PLAYLISTS_ACTIONS.saga,
                    urlParams: { id },
                });
                navigation.navigate('Playlist')
            }
        })
    }
})
import { ADD_TO_QUEUE_ACTIONS, DELETE_FROM_QUEUE_ACTIONS, ADD_PLAYLIST_TO_QUEUE } from '../../reducers/queue/constants';
import { SAVE_PLAYLIST_ACTIONS, SELECT_TRACK, DELETE_FROM_PLAYLIST_ACTIONS, GET_PLAYLISTS_ACTIONS, DELETE_PLAYLIST_ACTIONS } from '../../reducers/library/constants';
import { GET_PLAYLIST_ACTIONS } from '../../reducers/trackList/constants';

export const ACTIONS = (dispatch: any, navigation: any, id: string) => ({
    addToQueue: {
        title: 'Add To Queue',
        icon: 'plus',
        action: (track: any) => dispatch({
            type: ADD_TO_QUEUE_ACTIONS.saga,
            payload: { tracks: [{ ...track, userId: id }] },
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
                trackId: track['_id']
            }
        })
    },
    deletePlaylist: {
        title: 'Delete playlist',
        icon: 'close-circle-outline',
        action: (playlist: any) => dispatch({
            type: DELETE_PLAYLIST_ACTIONS.saga,
            urlParams: { id, playlistId: playlist.id },
            successCallback: () => {
                dispatch({
                    type: GET_PLAYLISTS_ACTIONS.saga,
                    urlParams: { id, type: 1 },
                });
            }
        })
    },
    deleteFromPlaylist: {
        title: 'Delete from playlist',
        icon: 'close-circle-outline',
        action: (track: any, playlistId: string, type: number) => dispatch({
            type: DELETE_FROM_PLAYLIST_ACTIONS.saga,
            urlParams: {
                id,
                playlistId,
                trackId: track.id,

            },
            successCallback: () => {
                dispatch({
                    type: GET_PLAYLIST_ACTIONS.saga,
                    urlParams: { 
                        id,
                        playlistId,
                        type: -1
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
                    type: GET_PLAYLISTS_ACTIONS.saga,
                    urlParams: { id, type: 1 },
                });
                navigation.navigate('Playlist')
            }
        })
    }
})
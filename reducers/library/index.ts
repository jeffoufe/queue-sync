import { GET_SPOTIFY_PLAYLISTS_ACTIONS, CHANGE_PROVIDER, SAVE_PLAYLIST_ACTIONS, GET_SOUNDCLOUD_PLAYLISTS_ACTIONS } from './constants';
import { LibraryReducerState, LibraryAction } from './types';

const initialState = {
    loadingGetPlaylists: false,
    loadingSavePlaylist: false,
    currentProvider: 1,
    playlists: [],
};

export default (state: LibraryReducerState = initialState, action: LibraryAction) => {
    switch (action.type) {
        case SAVE_PLAYLIST_ACTIONS.loading:
            return {
                ...state,
                loadingSavePlaylist: true
            }
        case SAVE_PLAYLIST_ACTIONS.success:
                return {
                    ...state,
                    loadingSavePlaylist: false
                }
        case GET_SPOTIFY_PLAYLISTS_ACTIONS.loading:
        case GET_SOUNDCLOUD_PLAYLISTS_ACTIONS.loading:
            return {
                ...state,
                loadingGetPlaylists: true
            };
        case GET_SPOTIFY_PLAYLISTS_ACTIONS.success:
        case GET_SOUNDCLOUD_PLAYLISTS_ACTIONS.success:
            return {
                ...state,
                loadingGetPlaylists: false,
                playlists: action.payload.items
            }
        case CHANGE_PROVIDER:
            return {
                ...state,
                currentProvider: action.payload.currentProvider
            }
        default:
            return state;
    }
}
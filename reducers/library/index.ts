import { ADD_PLAYLIST_TO_PLAYLIST_ACTIONS, SWITCH_IS_ADDING_PLAYLIST, RESET_SELECTED_TRACK, ADD_TO_PLAYLIST_ACTIONS, SELECT_TRACK, CHANGE_PROVIDER, SAVE_PLAYLIST_ACTIONS, GET_PLAYLISTS_ACTIONS } from './constants';
import { LibraryReducerState, LibraryAction } from './types';

const initialState = {
    loadingGetPlaylists: false,
    loadingSavePlaylist: false,
    currentProvider: 1,
    playlistToBeAdded: null,
    playlists: [],
    selectedTrack: null
};

export default (state: LibraryReducerState = initialState, action: LibraryAction) => {
    switch (action.type) {
        case SELECT_TRACK:
            return {
                ...state,
                selectedTrack: action.payload.track
            }
        case ADD_PLAYLIST_TO_PLAYLIST_ACTIONS.success:
            return {
                ...state,
                playlistToBeAdded: null
            };
        case SWITCH_IS_ADDING_PLAYLIST:
            return {
                ...state,
                playlistToBeAdded: action.payload.playlistToBeAdded
            }
        case ADD_TO_PLAYLIST_ACTIONS.success:
            return {
                ...state,
                selectedTrack: null
            }
        case RESET_SELECTED_TRACK:
            return {
                ...state,
                selectedTrack: null
            }
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
        case GET_PLAYLISTS_ACTIONS.loading:
            return {
                ...state,
                loadingGetPlaylists: true
            };
        case GET_PLAYLISTS_ACTIONS.success:
            return {
                ...state,
                loadingGetPlaylists: false,
                playlists: action.payload.playlists
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
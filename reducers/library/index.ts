import { GET_SPOTIFY_PLAYLISTS_ACTIONS } from './constants';
import { LibraryReducerState, LibraryAction } from './types';

const initialState = {
    spotifyPlaylists: []
};

export default (state: LibraryReducerState = initialState, action: LibraryAction) => {
    switch (action.type) {
        case GET_SPOTIFY_PLAYLISTS_ACTIONS.loading:
            return {
                ...state,
                loadingGetSpotifyPlaylists: true
            };
        case GET_SPOTIFY_PLAYLISTS_ACTIONS.success:
            return {
                ...state,
                loadingGetSpotifyPlaylists: false,
                spotifyPlaylists: action.payload.items
            }
        default:
            return state;
    }
}
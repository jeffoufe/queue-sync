import { TracksAction, TracksReducerState } from './types';
import { 
    CHANGE_PROVIDER, 
    FETCH_TRACKS_ERROR, 
    FETCH_TRACKS_SUCCESS, 
    FETCH_TRACKS_LOADING,
    FETCH_PLAYLISTS_LOADING,
    FETCH_PLAYLISTS_ERROR,
    FETCH_PLAYLISTS_SUCCESS
} from './constants'

const initialProviderState = {
    loading: false,
    search: '',
    error: '',
    selected: null,
    tracks: [],
};

const initialState = {
    currentProviderIndex: 1,
    spotify: initialProviderState,
    soundcloud: initialProviderState,
    youtube: initialProviderState,
    playlists: {
        playlists: [],
        error: '',
        search: '',
        loading: false
    }
}

export default (state: TracksReducerState = initialState, action: TracksAction) => {
    switch (action.type) {
        case CHANGE_PROVIDER:
            return {
                ...state,
                currentProviderIndex: action.payload.currentProviderIndex
            };
        case FETCH_TRACKS_LOADING:
            return { 
                ...state,
                [action.payload.provider]: {
                    ...state.spotify,
                    search: action.payload.search,
                    loading: true 
                }
            }
        case FETCH_TRACKS_SUCCESS:
            return { 
                ...state, 
                [action.payload.provider]: {
                    ...state.spotify,
                    loading: false,
                    tracks: action.payload.tracks,
                    error: ''
                },
            }
        case FETCH_PLAYLISTS_LOADING:
            return {
                ...state,
                playlists: {
                    ...state.playlists,
                    loading: true,
                    search: action.payload.search
                }
            }
        case FETCH_PLAYLISTS_SUCCESS:
            return {
                ...state,
                playlists: {
                    ...state.playlists,
                    loading: false,
                    playlists: action.payload.playlists
                },
                
            }
        case FETCH_PLAYLISTS_ERROR:
            return {
                ...state,
                playlists: {
                    ...state.playlists,
                    loading: false,
                    error: action.payload.error
                },
            }
        case FETCH_TRACKS_ERROR:
            return {
                ...state,
                [action.payload.provider]: {
                    ...state.spotify,
                    loading: false,
                    error: action.payload.error
                },
            }
        default:
            return state;
    }
}
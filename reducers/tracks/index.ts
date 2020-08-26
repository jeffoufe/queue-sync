import { TracksAction, TracksReducerState } from './types';
import { 
    FETCH_PLAYLISTS_ACTIONS,
    FETCH_TRACKS_ACTIONS,
    CHANGE_PROVIDER_ACTIONS,
    RESET_SEARCH
} from './constants'

const initialProviderState = {
    loading: false,
    search: '',
    error: '',
    selected: null,
    tracks: [],
};

const initialState = {
    currentProviderIndex: 0,
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
        case RESET_SEARCH:
            return initialState;
        case CHANGE_PROVIDER_ACTIONS.success:
            return {
                ...state,
                currentProviderIndex: action.payload.currentProviderIndex,
                spotify: initialState.spotify,
                soundcloud: initialState.soundcloud,
            };
        case FETCH_TRACKS_ACTIONS.loading:
            return { 
                ...state,
                [action.payload.provider]: {
                    ...state.spotify,
                    search: action.payload.search,
                    loading: true 
                }
            }
        case FETCH_TRACKS_ACTIONS.success:
            return { 
                ...state, 
                [action.payload.provider]: {
                    ...state[action.payload.provider],
                    loading: false,
                    tracks: action.payload.tracks,
                    error: ''
                },
            }
        case FETCH_PLAYLISTS_ACTIONS.loading:
            return {
                ...state,
                playlists: {
                    ...state.playlists,
                    loading: true,
                    search: action.payload.search
                }
            }
        case FETCH_PLAYLISTS_ACTIONS.success:
            return {
                ...state,
                playlists: {
                    ...state.playlists,
                    loading: false,
                    playlists: action.payload.playlists
                },
                
            }
        case FETCH_PLAYLISTS_ACTIONS.error:
            return {
                ...state,
                playlists: {
                    ...state.playlists,
                    loading: false,
                    error: action.payload.error
                },
            }
        case FETCH_TRACKS_ACTIONS.error:
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
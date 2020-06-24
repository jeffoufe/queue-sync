import { TracksAction, TracksReducerState } from './types';
import { CHANGE_PROVIDER, FETCH_TRACKS_ERROR, FETCH_TRACKS_SUCCESS, FETCH_TRACKS_LOADING } from './constants'

const initialProviderState = {
    loading: false,
    search: '',
    error: '',
    selected: null,
    tracks: []
};

const initialState = {
    currentProviderIndex: 1,
    spotify: initialProviderState,
    soundcloud: initialProviderState,
    youtube: initialProviderState
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
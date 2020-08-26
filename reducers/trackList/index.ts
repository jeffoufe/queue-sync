import { TrackListAction, TrackListReducerState } from './types';
import { GO_TO_PLAYLIST, GET_PLAYLIST_ACTIONS, RESET_TRACKLIST } from './constants'

const initialState = {
    tracks: [],
    loading: false,
    offset: 0,
    name: '',
    id: null,
    ids: [],
    total: 0,
    playlists: [],
}

export default (state: TrackListReducerState = initialState, action: TrackListAction) => {
    switch (action.type) {
        case GO_TO_PLAYLIST:
            return {
                ...state,
                name: action.payload.name,
                id: action.payload.id,
                ids: action.payload.ids
            }
        case GET_PLAYLIST_ACTIONS.loading:
            return { 
                ...state,
                loading: true
            }
        case GET_PLAYLIST_ACTIONS.success:
            return { 
                ...state,
                loading: false,
                offset: state.offset + 50,
                total: action.payload.total,
                tracks: [...state.tracks, ...action.payload.tracks],
                playlists: action.payload.playlists || []
            }
        case RESET_TRACKLIST:
            return initialState;
        default:
            return state;
    }
  }
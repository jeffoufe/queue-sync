import { TrackListAction, TrackListReducerState } from './types';
import { GO_TO_PLAYLIST, GET_PLAYLIST_ACTIONS } from './constants'

const initialState = {
    tracks: [],
    loading: false,
    name: '',
    id: null,
    ids: [],
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
                tracks: action.payload.tracks,
                playlists: action.payload.playlists || []
            }
        default:
            return state;
    }
  }
import { QueueAction, QueueReducerState } from './types';
import { 
    ADD_TO_QUEUE, 
    PREPEND_TO_QUEUE, 
    CREATE_PARTY_ACTIONS, 
    POP_SONG, 
    INSTANT_PLAY_TRACK, 
    PLAY_PAUSE_TRACK,
    GET_PARTY_ACTIONS
} from './constants'

const initialState = {
    tracks: [],
    // _id: null,
    _id: '5edf93e9f3b83fc495fb31b1',
    name: null,
    loadingCreateParty: false,
    loadingGetParty: false
};

export default (state: QueueReducerState = initialState, action: QueueAction) => {
    const [track, ...rest] = state.tracks
    switch (action.type) {
        case CREATE_PARTY_ACTIONS.loading:
            return {
                ...state,
                loadingCreateParty: true
            }
        case CREATE_PARTY_ACTIONS.success:
            return {
                ...state,
                name: action.payload.name,
                _id: action.payload['_id'],
                loadingCreateParty: false
            }
        case GET_PARTY_ACTIONS.loading:
            return {
                ...state,
                loadingGetParty: true
            }
        case GET_PARTY_ACTIONS.success:
            return {
                ...state,
                name: action.payload.name,
                tracks: action.payload.tracks,
                loadingGetParty: false
            }
        case PREPEND_TO_QUEUE:
            return {
                ...state,
                tracks: [...action.payload.tracks, ...state.tracks.slice(1)],
            }
        case ADD_TO_QUEUE:
            return { 
                ...state,
                tracks: [...state.tracks, ...action.payload.tracks],
            }
        case PLAY_PAUSE_TRACK:
            return {
                ...state,
                tracks: [{ ...track, isPlayed: !track.isPlayed }, ...rest]
            }
        case INSTANT_PLAY_TRACK:
            return {
                ...state,
                tracks: [{ ...track, isPlayed: true }, ...rest]
            }
        case POP_SONG:
            return {
                ...state,
                tracks: [{ ...rest[0], isPlayed: true }, ...rest.slice(1)]
            }
        default:
            return state;
    }
}
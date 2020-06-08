import { QueueAction, QueueReducerState } from './types';
import { ADD_TO_QUEUE, PREPEND_TO_QUEUE, SET_ROOM_NAME, POP_SONG, INSTANT_PLAY_TRACK, PLAY_PAUSE_TRACK } from './constants'

const initialState = {
    tracks: []
};

export default (state: QueueReducerState = initialState, action: QueueAction) => {
    const [track, ...rest] = state.tracks
    switch (action.type) {
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
        case SET_ROOM_NAME:
            return {
                ...state,
                roomName: action.payload.roomName
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
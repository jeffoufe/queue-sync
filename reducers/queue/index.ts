import { QueueAction, QueueReducerState } from './types';
import { SET_QUEUE } from './constants'

const initialState = {
    tracks: []
}

export default (state: QueueReducerState = initialState, action: QueueAction) => {
    switch (action.type) {
        case SET_QUEUE:
            return { 
                ...state,
                tracks: action.payload.tracks
            }
        default:
            return state;
    }
}
import { QueueAction, QueueReducerState } from './types';
import { ADD_TO_QUEUE, NEXT_SONG, INCREMENT_INDEX } from './constants'

const initialState = {
    tracks: [],
    currentIndex: 0
};

export default (state: QueueReducerState = initialState, action: QueueAction) => {
    switch (action.type) {
        case ADD_TO_QUEUE:
            return { 
                ...state,
                tracks: [...state.tracks, ...action.payload.tracks]
            }
        case INCREMENT_INDEX:
            return {
                ...state,
                currentIndex: state.currentIndex + 1
            }
        default:
            return state;
    }
}
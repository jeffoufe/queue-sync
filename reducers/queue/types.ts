import { 
    ADD_TO_QUEUE, NEXT_SONG, INCREMENT_INDEX
} from './constants';

interface SetQueueAction {
    type: typeof ADD_TO_QUEUE,
    payload: {
        tracks: Array<any>
    }
}

interface NextSongAction {
    type: typeof INCREMENT_INDEX,
}
  
export type QueueAction = 
    SetQueueAction
    | NextSongAction

export interface QueueReducerState {
    tracks: Array<any>,
    currentIndex: number
}
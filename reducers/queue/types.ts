import { 
    SET_QUEUE
} from './constants';

interface SetQueueAction {
    type: typeof SET_QUEUE,
    payload: {
        tracks: Array<any>
    }
}
  
export type QueueAction = SetQueueAction

export interface QueueReducerState {
    tracks: Array<any>
}
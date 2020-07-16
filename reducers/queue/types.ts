import { 
    ADD_TO_QUEUE_ACTIONS, 
    DELETE_FROM_QUEUE_ACTIONS,
    PREPEND_TO_QUEUE, 
    POP_SONG, 
    CREATE_PARTY_ACTIONS, 
    PLAY_TRACK, 
    INSTANT_PLAY_TRACK, 
    PLAY_PAUSE_TRACK,
    START_TIMER,
    PAUSE_TIMER,
    RESET_TIMER
} from './constants';

interface AddToQueueAction {
    type: typeof ADD_TO_QUEUE_ACTIONS.success,
    payload: {
        tracks: Array<any>
    }
}

interface DeleteFromQueueAction {
    type: typeof DELETE_FROM_QUEUE_ACTIONS.success,
    payload: {
        tracks: Array<any>
    }
}

interface PlayTrackAction {
    type: typeof PLAY_TRACK | typeof INSTANT_PLAY_TRACK,
    payload: {}
}

interface PlayPauseTrackAction {
    type: typeof PLAY_PAUSE_TRACK,
    payload: {}
}

interface PrependToQueueAction {
    type: typeof PREPEND_TO_QUEUE,
    payload: {
        tracks: Array<any>
    }
}

interface CreatePartyLoading {
    type: typeof CREATE_PARTY_ACTIONS.loading,
    payload: {}
}

interface CreatePartyAction {
    type: typeof CREATE_PARTY_ACTIONS.success,
    payload: {
        name: string,
        _id: string
    }
}

interface PopSongAction {
    type: typeof POP_SONG,
    payload: {}
}

interface StartTimerAction {
    type: typeof START_TIMER,
    payload: {
        timerId: number,
        startTime: number
    }
}

interface PauseTimerAction {
    type: typeof PAUSE_TIMER,
    payload: {
        remainingTime: number
    }
}

interface ResetTimerAction {
    type: typeof RESET_TIMER,
    payload: {}
}

  
export type QueueAction = 
    AddToQueueAction
    | PopSongAction
    | PrependToQueueAction
    | CreatePartyAction
    | PlayTrackAction
    | PlayPauseTrackAction
    | DeleteFromQueueAction
    | StartTimerAction
    | PauseTimerAction
    | ResetTimerAction

export interface QueueReducerState {
    tracks: Array<any>,
    loading: boolean,
    name: string | null,
    _id: string | null,
}
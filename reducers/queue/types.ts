import { 
    ADD_TO_QUEUE, PREPEND_TO_QUEUE, POP_SONG, SET_ROOM_NAME, PLAY_TRACK, INSTANT_PLAY_TRACK, PLAY_PAUSE_TRACK
} from './constants';

interface AddToQueueAction {
    type: typeof ADD_TO_QUEUE,
    payload: {
        tracks: Array<any>
    }
}

interface PlayTrackAction {
    type: typeof PLAY_TRACK | typeof INSTANT_PLAY_TRACK
}

interface PLayPauseTrackAction {
    type: typeof PLAY_PAUSE_TRACK
}

interface PrependToQueueAction {
    type: typeof PREPEND_TO_QUEUE,
    payload: {
        tracks: Array<any>
    }
}

interface SetRoomNameAction {
    type: typeof SET_ROOM_NAME,
    payload: {
        roomName: string
    }
}

interface PopSongAction {
    type: typeof POP_SONG,
}

  
export type QueueAction = 
    AddToQueueAction
    | PopSongAction
    | PrependToQueueAction
    | SetRoomNameAction
    | PlayTrackAction
    | PLayPauseTrackAction

export interface QueueReducerState {
    tracks: Array<any>
}
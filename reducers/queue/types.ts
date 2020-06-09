import { 
    ADD_TO_QUEUE, PREPEND_TO_QUEUE, POP_SONG, CREATE_PARTY_ACTIONS, PLAY_TRACK, INSTANT_PLAY_TRACK, PLAY_PAUSE_TRACK
} from './constants';

interface AddToQueueAction {
    type: typeof ADD_TO_QUEUE,
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

  
export type QueueAction = 
    AddToQueueAction
    | PopSongAction
    | PrependToQueueAction
    | CreatePartyAction
    | PlayTrackAction
    | PlayPauseTrackAction

export interface QueueReducerState {
    tracks: Array<any>,
    loading: boolean,
    name: string | null,
    _id: string | null,
}
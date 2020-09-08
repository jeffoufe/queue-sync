import { QueueAction, QueueReducerState } from './types';
import { Audio } from 'expo-av';
import { 
    ADD_TO_QUEUE_ACTIONS, 
    DELETE_FROM_QUEUE_ACTIONS,
    PREPEND_TO_QUEUE, 
    CREATE_PARTY_ACTIONS, 
    SEND_PLAY_PAUSE, 
    INSTANT_PLAY_TRACK,
    GET_PARTY_ACTIONS,
    CREATE_SOUND_OBJECT,
    START_TIMER,
    PAUSE_TIMER,
    RESET_TIMER
} from './constants'

const initialState = {
    tracks: [],
    timerId: null,
    startTime: null,
    remainingTime: null,
    // _id: null,
    _id: '5f46298444e16bda06eb97d9',
    name: null,
    loadingCreateParty: false,
    loadingGetParty: true
};

Audio.setAudioModeAsync({ staysActiveInBackground: true, playThroughEarpieceAndroid: false })

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
        case CREATE_SOUND_OBJECT:
            return {
                ...state,
                tracks: [
                    { ...track, soundObject: new Audio.Sound() },
                    ...rest 
                ]
            }
        case PREPEND_TO_QUEUE:
            return {
                ...state,
                tracks: [...action.payload.tracks, ...state.tracks.slice(1)],
            }
        case ADD_TO_QUEUE_ACTIONS.success:
        case SEND_PLAY_PAUSE:
        case DELETE_FROM_QUEUE_ACTIONS.success:
            return { 
                ...state,
                tracks: action.payload.tracks,
            };
        case INSTANT_PLAY_TRACK:
            return {
                ...state,
                tracks: [{ ...track, isPlayed: true }, ...rest]
            }
        case START_TIMER:
            return {
                ...state,
                timerId: action.payload.timerId,
                startTime: action.payload.startTime
            }
        case PAUSE_TIMER:
            return {
                ...state,
                remainingTime: action.payload.remainingTime
            }
        case RESET_TIMER:
            return {
                ...state,
                timerId: null,
                startTime: null,
                remainingTime: null
            }
        default:
            return state;
    }
}
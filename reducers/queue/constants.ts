// import { generateActions } from '../../utils';

const generateActions = (reducerName: string, actionName: string) => {
    const prefix = `${reducerName}/${actionName}`;
    return {
        saga: prefix,
        loading: `${prefix}_LOADING`,
        success: `${prefix}_SUCCESS`,
        error: `${prefix}_ERROR`,   
    }
}


export const PREPEND_TO_QUEUE = 'QUEUE/PREPEND_TO_QUEUE';
export const PLAY_TRACK = 'QUEUE/PLAY_TRACK';
export const NEXT_SONG = 'QUEUE/NEXT_SONG';
export const POP_SONG = 'QUEUE/POP_SONG';
export const INSTANT_PLAY_TRACK = 'QUEUE/INSTANT_PLAY_TRACK';
export const PLAY_PAUSE_TRACK = 'QUEUE/PLAY_PAUSE_TRACK';

export const CREATE_PARTY_ACTIONS = generateActions('QUEUE', 'CREATE_PARTY');
export const GET_PARTY_ACTIONS = generateActions('QUEUE', 'GET_PARTY');



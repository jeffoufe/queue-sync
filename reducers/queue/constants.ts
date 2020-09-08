import generateActions from '../../utils/generateActions';

export const JOIN_QUEUE = 'QUEUE/JOIN_QUEUE';
export const PREPEND_TO_QUEUE = 'QUEUE/PREPEND_TO_QUEUE';
export const PLAY_TRACK = 'QUEUE/PLAY_TRACK';
export const NEXT_SONG = 'QUEUE/NEXT_SONG';
export const SEND_PLAY_PAUSE = 'QUEUE/SEND_PLAY_PAUSE';
export const INSTANT_PLAY_TRACK = 'QUEUE/INSTANT_PLAY_TRACK';
export const PLAY_PAUSE_TRACK = 'QUEUE/PLAY_PAUSE_TRACK';
export const CREATE_SOUND_OBJECT = 'QUEUE/CREATE_SOUND_OBJECT';
export const START_TIMER = 'QUEUE/START_TIMER';
export const PAUSE_TIMER = 'QUEUE/PAUSE_TIMER';
export const RESET_TIMER = 'QUEUE/RESET_TIMER';
export const ADD_PLAYLIST_TO_QUEUE = 'QUEUE/ADD_PLAYLIST_TO_QUEUE';

export const CREATE_PARTY_ACTIONS = generateActions('QUEUE', 'CREATE_PARTY');
export const GET_PARTY_ACTIONS = generateActions('QUEUE', 'GET_PARTY');
export const ADD_TO_QUEUE_ACTIONS = generateActions('QUEUE', 'ADD_TO_QUEUE');
export const DELETE_FROM_QUEUE_ACTIONS = generateActions('QUEUE', 'DELETE_FROM_QUEUE');



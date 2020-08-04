import generateActions from '../../utils/generateActions';
import { generateSaga } from '../../utils';

export const CHANGE_PROVIDER = 'LIBRARY/CHANGE_PROVIDER';
export const SELECT_TRACK = 'LIBRAY/SELECT_TRACK';
export const RESET_SELECTED_TRACK = 'LIBRARY/RESET_SELECTED_TRACK';
export const SWITCH_IS_ADDING_PLAYLIST = 'LIBRARY/SWITCH_IS_ADDING_PLAYLIST';

export const GET_PLAYLISTS_ACTIONS = generateActions('LIBRARY', 'GET_PLAYLISTS');
export const DELETE_PLAYLIST_ACTIONS = generateActions('LIBRARY', 'DELETE_PLAYLIST');
export const DELETE_FROM_PLAYLIST_ACTIONS = generateActions('LIBRARY', 'DELETE_FROM_PLAYLIST');
export const ADD_TO_PLAYLIST_ACTIONS = generateActions('LIBRARY','ADD_TO_PLAYLIST');
export const ADD_PLAYLIST_TO_PLAYLIST_ACTIONS = generateActions('LIBRARY', 'ADD_PLAYLIST_TO_PLAYLIST');
export const SAVE_PLAYLIST_ACTIONS = generateActions('LIBRARY', 'SAVE_PLAYLIST');
export const CREATE_MIXED_PLAYLIST_ACTIONS = generateActions('LIBRARY', 'CREATE_MIXED_PLAYLIST');

export const MIXED = -1;
export const SPOTIFY = 0;
export const SOUNDCLOUD = 1;


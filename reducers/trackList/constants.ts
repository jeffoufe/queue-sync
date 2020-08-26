import generateActions from '../../utils/generateActions';

export const GET_PLAYLIST_ACTIONS = generateActions('TRACKLIST', 'GET_PLAYLIST');

export const GO_TO_PLAYLIST = 'TRACKLIST/GO_TO_PLAYLIST';
export const RESET_TRACKLIST = 'TRACKLIST/RESET_TRACKLIST';
import generateActions from '../../utils/generateActions';

export const RESET_SEARCH = 'TRACKS/RESET_SEARCH';
export const CHANGE_PROVIDER_ACTIONS = generateActions('TRACKS', 'CHANGE_PROVIDER');
export const FETCH_TRACKS_ACTIONS = generateActions('TRACKS', 'FETCH_TRACKS');
export const FETCH_PLAYLISTS_ACTIONS = generateActions('TRACKS', 'FETCH_PLAYLISTS');

export const PROVIDERS = [
    'Spotify',
    'SoundCloud'
];
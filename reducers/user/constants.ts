export const AUTHORIZE_SPOTIFY = 'USER/AUTHORIZE_SPOTIFY';
export const AUTHORIZE_SPOTIFY_LOADING = 'USER/AUTHORIZE_SPOTIFY_LOADING';
export const AUTHORIZE_SPOTIFY_SUCCESS = 'USER/AUTHORIZE_SPOTIFY_SUCCESS';
export const AUTHORIZE_SPOTIFY_ERROR = 'USER/AUTHORIZE_SPOTIFY_ERROR';
export const SELECT_DEVICE_SPOTIFY = 'USER/SELECT_DEVICE_SPOTIFY';
export const LOGOUT_SPOTIFY = 'USER/LOGOUT_SPOTIFY';
export const GET_DEVICES_SPOTIFY = 'USER/GET_DEVICES_SPOTIFY';

export const SCOPES = [
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-library-modify',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-read-recently-played',
    'user-top-read'
];
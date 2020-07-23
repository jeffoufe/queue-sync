export const AUTHORIZE_SPOTIFY = 'USER/AUTHORIZE_SPOTIFY';
export const REFRESH_SPOTIFY = 'USER/REFRESH_SPOTIFY';
export const AUTHORIZE_SPOTIFY_LOADING = 'USER/AUTHORIZE_SPOTIFY_LOADING';
export const AUTHORIZE_SPOTIFY_SUCCESS = 'USER/AUTHORIZE_SPOTIFY_SUCCESS';
export const AUTHORIZE_SPOTIFY_ERROR = 'USER/AUTHORIZE_SPOTIFY_ERROR';
export const SELECT_DEVICE_SPOTIFY = 'USER/SELECT_DEVICE_SPOTIFY';
export const LOGOUT_SPOTIFY = 'USER/LOGOUT_SPOTIFY';
export const GET_DEVICES_SPOTIFY = 'USER/GET_DEVICES_SPOTIFY';
export const REFRESH_ACCESS_TOKEN = 'USER/REFRESH_ACCESS_TOKEN';
export const CHECK_SPOTIFY_TOKEN = 'USER/CHECK_SPOTIFY_TOKEN';

export const AUTHORIZE_DEEZER = 'USER/AUTHORIZE_DEEZER';
export const LOGOUT_DEEZER = 'USER/LOGOUT_DEEZER';

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

export const SCOPES_DEEZER = [
    'basic_access',
    'email',
    'offline_access',
    'manage_library',
    'manage_community',
    'delete_library',
    'listening_history'
]
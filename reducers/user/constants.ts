import generateActions from '../../utils/generateActions';
import { generateSaga } from '../../utils';

export const REFRESH_SPOTIFY = 'USER/REFRESH_SPOTIFY';
export const SELECT_DEVICE_SPOTIFY = 'USER/SELECT_DEVICE_SPOTIFY';
export const LOGOUT_SPOTIFY = 'USER/LOGOUT_SPOTIFY';
export const GET_DEVICES_SPOTIFY = 'USER/GET_DEVICES_SPOTIFY';
export const REFRESH_ACCESS_TOKEN = 'USER/REFRESH_ACCESS_TOKEN';
export const CHECK_SPOTIFY_TOKEN = 'USER/CHECK_SPOTIFY_TOKEN';

export const GET_CREDENTIALS_ACTIONS = generateActions('USER', 'GET_CREDENTIALS')
export const AUTHORIZE_SPOTIFY_ACTIONS = generateActions('USER', 'AUTHORIZE_SPOTIFY');

/* export const AUTHORIZE_DEEZER = 'USER/AUTHORIZE_DEEZER';
export const LOGOUT_DEEZER = 'USER/LOGOUT_DEEZER'; */

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

export const CREDENTIALS = {
    clientId: 'f8634a51ee354df48d96d6262f84ff02',
    clientSecret: 'e3121e0a8c8849d4b1de403e0ce579bf',
}
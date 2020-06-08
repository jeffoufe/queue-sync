import { 
    AUTHORIZE_SPOTIFY_SUCCESS, 
    AUTHORIZE_SPOTIFY_ERROR, 
    AUTHORIZE_SPOTIFY_LOADING,
    SELECT_DEVICE_SPOTIFY,
    LOGOUT_SPOTIFY,
} from './constants';

import { REHYDRATE } from 'redux-persist';

export interface SpotifyAuthResponse {
    access_token: string,
    refresh_token: string,
    expires_in: number
};

export interface SpotifyAuthObject {
    accessToken: string,
    refreshToken: string,
    expirationTime: number
}

export interface SpotifyDeviceObject {
    type: string,
    id: string,
    name: string
}

interface SpotifyDevicesObject {
    devices: Array<SpotifyDeviceObject>
}

interface SpotifyDeviceIDObject {
    deviceID: string
}

interface SpotifyObject extends SpotifyAuthObject, SpotifyDeviceObject, SpotifyDeviceIDObject {
    loading: boolean,
}

interface AuthorizeSpotifyLoadingAction {
    type: typeof AUTHORIZE_SPOTIFY_LOADING,
    payload: SpotifyAuthObject
}
  
interface AuthorizeSpotifySuccessAction {
    type: typeof AUTHORIZE_SPOTIFY_SUCCESS,
    payload: SpotifyDevicesObject
}

interface SelectDeviceSpotifyAction {
    type: typeof SELECT_DEVICE_SPOTIFY,
    payload: SpotifyDeviceIDObject
}

interface LogoutpotifyAction {
    type: typeof LOGOUT_SPOTIFY
}

interface SoundcloudObject {
    accessToken: null | string,
    expirationTime: null | number,
    error: null | string,
    loading: boolean
}

interface RehydrateAction {
    type: typeof REHYDRATE,
    payload: {
        spotify: SpotifyObject,
        soundcloud: SoundcloudObject
    }
}

export type UserAction = 
    AuthorizeSpotifySuccessAction 
    | AuthorizeSpotifyLoadingAction 
    | SelectDeviceSpotifyAction
    | RehydrateAction
    | LogoutpotifyAction

export interface UserReducerState {
    spotify: {
        devices: Array<SpotifyDeviceObject>,
        loading: boolean,
        deviceID: string | null,
        refreshToken: string | null,
        accessToken: string | null,
        expirationTime: number | null
    },
    soundcloud: {
        accessToken: null,
        expirationTime: null,
        error: null,
        loading: boolean
    }
}
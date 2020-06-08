import { put, takeEvery, select, call } from 'redux-saga/effects'
import * as AuthSession from 'expo-auth-session';
import { Clipboard } from 'react-native';
import { 
    AUTHORIZE_SPOTIFY_ERROR, 
    AUTHORIZE_SPOTIFY_LOADING, 
    AUTHORIZE_SPOTIFY_SUCCESS,
    AUTHORIZE_SPOTIFY,
    GET_DEVICES_SPOTIFY,
    SCOPES
} from './constants';

const scopes = SCOPES.join(' ');

const credentials = {
    clientId: 'f8634a51ee354df48d96d6262f84ff02',
    clientSecret: 'e3121e0a8c8849d4b1de403e0ce579bf',
}

function* getAvailableDevices() {
    const accessToken = yield select((state: any) => state.user.spotify.accessToken);

    const availableDevicesResponse = yield fetch(
        'https://api.spotify.com/v1/me/player/devices',
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );

    if (availableDevicesResponse.status >= 400) {
        yield put({ type: AUTHORIZE_SPOTIFY_ERROR, payload: { error: "Bad response from server" }})
    } else {
        const { devices } = yield availableDevicesResponse.json();
        yield put({ type: AUTHORIZE_SPOTIFY_SUCCESS, payload: { devices: devices.filter((device: any) => device.type === "Smartphone") }});
    }
}

function* authorizeSpotify() {
    const result = yield AuthSession.startAsync({
        authUrl:
          'https://accounts.spotify.com/authorize' +
          '?response_type=code' +
          '&client_id=' +
          credentials.clientId +
          (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
          '&redirect_uri=' +
          encodeURIComponent(AuthSession.getRedirectUrl()),
    })

    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);

    const tokenResponse = yield fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${credsB64}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${result.params.code}&redirect_uri=${
            AuthSession.getRedirectUrl()
        }`,
    });

    const tokenResponseJSON = yield tokenResponse.json();

    Clipboard.setString(`${tokenResponseJSON.access_token}`);

    yield put({ 
        type: AUTHORIZE_SPOTIFY_LOADING, 
        payload: {
            accessToken: tokenResponseJSON.access_token,
            refreshToken: tokenResponseJSON.refresh_token,
            expirationTime: new Date().getTime() + tokenResponseJSON['expires_in'] * 1000
        }
    });

    yield call(getAvailableDevices);
}

export function* watchAuthorize() {
    yield takeEvery(AUTHORIZE_SPOTIFY, authorizeSpotify)
}

export function* watchGetAvailableDevices() {
    yield takeEvery(GET_DEVICES_SPOTIFY, getAvailableDevices)
}
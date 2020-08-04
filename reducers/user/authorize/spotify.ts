import { put, takeEvery, select, call } from 'redux-saga/effects'
import * as AuthSession from 'expo-auth-session';
import { domain } from '../../../utils';
import axios from 'axios';
import {
    AUTHORIZE_SPOTIFY_ACTIONS,
    GET_DEVICES_SPOTIFY,
    SCOPES,
    CREDENTIALS
} from '../constants';

const scopes = SCOPES.join(' ');

function* authorizeSpotify() {
    const { _id } = yield select((state: any) => state.queue);
    const result = yield AuthSession.startAsync({
        authUrl:
          'https://accounts.spotify.com/authorize' +
          '?response_type=code' +
          '&client_id=' +
          CREDENTIALS.clientId +
          (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
          '&redirect_uri=' +
          encodeURIComponent(AuthSession.getRedirectUrl()),
    })

    if (result.params.code) {
        const credsB64 = btoa(`${CREDENTIALS.clientId}:${CREDENTIALS.clientSecret}`);
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

        const spotifyResponse = yield axios({
            url: `${domain}/parties/${_id}/authorize?type=0`,
            method: 'POST',
            data: tokenResponseJSON,
        })

        yield put({ 
            type: AUTHORIZE_SPOTIFY_ACTIONS.loading, 
            payload: spotifyResponse.data.credentials.spotify
        });

        yield call(getAvailableDevices);
    }
}

function* getAvailableDevices() {
    const { spotify } = yield select((state: any) => state.user);

    const availableDevicesResponse = yield fetch(
        'https://api.spotify.com/v1/me/player/devices',
        {
            headers: {
                Authorization: `Bearer ${spotify.accessToken}`
            }
        }
    );

    if (availableDevicesResponse.status >= 400) {
        yield put({ 
            type: AUTHORIZE_SPOTIFY_ACTIONS.error, 
            payload: { error: "Bad response from server" }
        })
    } else {
        const { devices } = yield availableDevicesResponse.json();
        yield put({ 
            type: AUTHORIZE_SPOTIFY_ACTIONS.success, 
            payload: { 
                devices: devices.filter((device: any) => device.type === "Smartphone") 
            }
        });
    }
}

export function* watchGetAvailableDevices() {
    yield takeEvery(GET_DEVICES_SPOTIFY, getAvailableDevices)
}

export function* watchAuthorize() {
    yield takeEvery(AUTHORIZE_SPOTIFY_ACTIONS.saga, authorizeSpotify)
}
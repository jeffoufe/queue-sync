import { put, takeEvery, select, call } from 'redux-saga/effects'
import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import { domain } from '../../../utils';
import axios from 'axios';
import {
    AUTHORIZE_SPOTIFY_ACTIONS,
    GET_DEVICES_SPOTIFY,
    SELECT_DEVICE_SPOTIFY_ACTIONS,
    SCOPES,
    CREDENTIALS
} from '../constants';

const scopes = SCOPES.join(' ');

const generateCodeChallenge = async () => {
    let randomString = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 45; i++) {
       randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const hashedRandomString = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        randomString
    );
    console.log(btoa(hashedRandomString));
    return btoa(hashedRandomString);
}

function* authorizeSpotify() {
    const { _id } = yield select((state: any) => state.queue);
    const codeVerifier = generateCodeChallenge();
    const result = yield AuthSession.startAsync({
        authUrl:
            'https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&code_challenge_method=S256' +
            `code_challenge=${encodeURIComponent(codeVerifier)}` +
            `&client_id=${CREDENTIALS.clientId}` +
            `&scope=${encodeURIComponent(scopes)}` +
            `&redirect_uri=${encodeURIComponent(AuthSession.getRedirectUrl())}`
    })

    if (result.params && result.params.code) {
        const credsB64 = btoa(`${CREDENTIALS.clientId}:${CREDENTIALS.clientSecret}`);
        const tokenResponse = yield fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credsB64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 
                `grant_type=authorization_code` +
                `&code=${result.params.code}` +
                `&code_verifier=${codeVerifier}` +
                `&client_id=${CREDENTIALS.clientId}` +
                `&redirect_uri=${AuthSession.getRedirectUrl()}`
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

function* selectDevice(action: any) {
    const { deviceID } = action.payload;
    const { _id } = yield select((state: any) => state.queue);
    const spotifyResponse = yield axios({
        url: `${domain}/parties/${_id}/selectDevice?type=0`,
        method: 'POST',
        data: { deviceID }
    })
    yield put({
        type: SELECT_DEVICE_SPOTIFY_ACTIONS.success,
        payload: spotifyResponse.data.credentials.spotify
    });
}

export function* watchGetAvailableDevices() {
    yield takeEvery(GET_DEVICES_SPOTIFY, getAvailableDevices)
}

export function* watchAuthorize() {
    yield takeEvery(AUTHORIZE_SPOTIFY_ACTIONS.saga, authorizeSpotify)
}

export function* watchSelectDevice() {
    yield takeEvery(SELECT_DEVICE_SPOTIFY_ACTIONS.saga, selectDevice)
}
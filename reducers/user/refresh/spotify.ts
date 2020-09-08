import { put, takeEvery, select } from 'redux-saga/effects';
import {
    REFRESH_SPOTIFY,
    CREDENTIALS,
    AUTHORIZE_SPOTIFY_ACTIONS
} from '../constants';

export function* refreshSpotify() {
    const { refreshToken, expirationTime } = yield select((state: any) => state.user.spotify);
    if (refreshToken && Date.now() > expirationTime) {
        const credsB64 = btoa(`${CREDENTIALS.clientId}:${CREDENTIALS.clientSecret}`);
        const tokenResponse = yield fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credsB64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
        });

        const tokenResponseJSON = yield tokenResponse.json();
        console.log(tokenResponseJSON);

        yield put({ 
            type: AUTHORIZE_SPOTIFY_ACTIONS.loading, 
            payload: {
                accessToken: tokenResponseJSON.access_token,
                refreshToken: tokenResponseJSON.refresh_token,
                expirationTime: new Date().getTime() + tokenResponseJSON['expires_in'] * 1000
            }
        });
    }
}

export function* watchRefreshSpotify() {
    yield takeEvery(REFRESH_SPOTIFY, refreshSpotify)
}
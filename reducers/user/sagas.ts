import { put, takeEvery, call } from 'redux-saga/effects';
import { domain } from '../../utils';
import { GET_CREDENTIALS_ACTIONS } from './constants'; 
import { refreshSpotify } from './refresh/spotify';
import axios from 'axios';

function* getCredentials(action: any) {
    const { id } = action.payload;

    const response = yield axios({
        method: 'GET',
        url: `${domain}/parties/${id}/credentials`,
    });

    yield put({
        type: GET_CREDENTIALS_ACTIONS.success,
        payload: response.data
    });

    yield call(refreshSpotify);
}

export function* watchGetCredentials() {
    yield takeEvery(GET_CREDENTIALS_ACTIONS.saga, getCredentials)
}

/* function* authorizeDeezer() {
    const result = yield AuthSession.startAsync({
        authUrl:
            'https://connect.deezer.com/oauth/auth.php' +
            '?response_type=token' +
            `?perms=${SCOPES_DEEZER.join(',')}` +
            '&app_id=420362' +
            '&redirect_uri=' +
            encodeURIComponent(AuthSession.getRedirectUrl()),
    });

    if (result.params.code) {
        const tokenResponse = yield fetch(
            'https://connect.deezer.com/oauth/access_token.php' +
            '&app_id=420362' +
            'secret=dd9c9e360947ba0e36797752a1ba007a' +
            `&code=${result.params.code}`
        );
    
        const tokenResponseJSON = yield tokenResponse.json();
    }

}

export function* watchAuthorizeDeezer() {
    yield takeEvery(AUTHORIZE_DEEZER, authorizeDeezer)
} */
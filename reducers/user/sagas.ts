// import { put, takeEvery, select, call } from 'redux-saga/effects'
// import * as AuthSession from 'expo-auth-session';
import { generateSaga, domain } from '../../utils';
import { GET_CREDENTIALS_ACTIONS } from './constants'; 

export const watchGetCredentials = generateSaga({
    ...GET_CREDENTIALS_ACTIONS,
    url: ({ id }: { id: string }) => `${domain}/parties/${id}/credentials`,
    method: 'GET'
})

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
import { generateSaga, domain } from '../../utils';
import { put, takeEvery, select } from 'redux-saga/effects';
import {
    FETCH_TRACKS_ACTIONS,
    FETCH_PLAYLISTS_ACTIONS,
    CHANGE_PROVIDER_ACTIONS
} from './constants';

export const watchFetchTracks = generateSaga({ 
    ...FETCH_TRACKS_ACTIONS,
    url: ({ id, q, type }) => `${domain}/users/${id}/tracks/search?q=${q}&type=${type}`,
    method: 'GET',
})

export const watchFetchPlaylists = generateSaga({
    ...FETCH_PLAYLISTS_ACTIONS,
    url: ({ id, q, type }) => `${domain}/users/${id}/playlists/search?q=${q}&type=1`,
    method: 'GET',
})

function * changeProvider(action: any) {
    const { currentProviderIndex, search } = action.payload;
    const { _id } = yield select((state: any) => state.queue);
    yield put({ type: CHANGE_PROVIDER_ACTIONS.success, payload: { currentProviderIndex } });
    yield put({ 
        type: FETCH_TRACKS_ACTIONS.saga, 
        loadingPayload: {
            provider: currentProviderIndex === 0 ? 'spotify' : 'soundcloud',
            search
        },
        urlParams: { id: _id, q: search, type: currentProviderIndex },
    })
}

export function * watchChangeProvider() {
    yield takeEvery(CHANGE_PROVIDER_ACTIONS.saga, changeProvider)
}
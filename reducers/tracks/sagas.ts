import { put, takeEvery, select, call } from 'redux-saga/effects'
import {
    FETCH_TRACKS,
    FETCH_TRACKS_ERROR,
    FETCH_TRACKS_LOADING,
    FETCH_TRACKS_SUCCESS,
    PROVIDERS,
    TRANSFORMS,
    SEARCH_URLS
} from './constants';
import { getFetchParameters } from './utils';

interface FetchTracksAction {
    payload: {
        search: string,
        index: number
    }
}

function* fetchTracks(action: FetchTracksAction) {
    const { search } = action.payload;
    const { currentProviderIndex } = yield select((state: any) => state.tracks);
    const provider = PROVIDERS[currentProviderIndex].toLowerCase();
    const providerObject = yield select((state: any) => state.user[provider])
    if (providerObject.accessToken || provider === 'soundcloud' || provider === 'youtube') {
        yield put({ type: FETCH_TRACKS_LOADING, payload: { search, provider } });
        const response = yield fetch(
            SEARCH_URLS[currentProviderIndex](search),
            getFetchParameters(provider, providerObject.accessToken)
        );
        if (response.status >= 400) {
            alert('pute');
            yield put({ type: FETCH_TRACKS_ERROR, payload: { error: "Bad response from server", provider }})
        } else {
            const responseJSON = yield response.json();
            const tracks = yield TRANSFORMS[currentProviderIndex](responseJSON);
            yield put({ type: FETCH_TRACKS_SUCCESS, payload: { tracks, provider } }) 
        }
    }
}


export function* watchFetchTracks() {
    yield takeEvery(FETCH_TRACKS, fetchTracks)
}
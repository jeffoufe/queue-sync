import { put, takeEvery, select, call } from 'redux-saga/effects'
import {
    FETCH_TRACKS,
    FETCH_TRACKS_ERROR,
    FETCH_TRACKS_LOADING,
    FETCH_TRACKS_SUCCESS,
    FETCH_PLAYLISTS_LOADING,
    FETCH_PLAYLISTS_SUCCESS,
    FETCH_PLAYLISTS_ERROR,
    PROVIDERS,
    TRANSFORMS,
    SEARCH_URLS,
    FETCH_PLAYLISTS
} from './constants';
import { getFetchParameters, formatSoundCloudPlaylists } from './utils';

interface FetchTracksAction {
    payload: {
        search: string,
        index: number
    }
}

function* fetchPlaylists(action: FetchTracksAction) {
    const { search } = action.payload;
    yield put({ type: FETCH_PLAYLISTS_LOADING, payload: { search } });
    const response = yield fetch(
        `https://api-v2.soundcloud.com/search/playlists_without_albums?q=${search}&client_id=LwwkfCVkKXcE8djbcXfrQLnZZBqZk3f3`
    );
    if (response.status >= 400) {
        yield put({ type: FETCH_PLAYLISTS_ERROR, payload: { error: "Bad response from server" }})
    } else {
        const responseJSON = yield response.json();
        const playlists = formatSoundCloudPlaylists(responseJSON);
        yield put({ type: FETCH_PLAYLISTS_SUCCESS, payload: { playlists } }) 
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
            yield put({ type: FETCH_TRACKS_ERROR, payload: { error: "Bad response from server", provider }})
        } else {
            const responseJSON = yield response.json();
            const tracks = yield TRANSFORMS[currentProviderIndex](responseJSON);
            yield put({ type: FETCH_TRACKS_SUCCESS, payload: { tracks, provider } }) 
        }
    }
}

export function* watchFetchPlaylists() {
    yield takeEvery(FETCH_PLAYLISTS, fetchPlaylists)
}

export function* watchFetchTracks() {
    yield takeEvery(FETCH_TRACKS, fetchTracks)
}
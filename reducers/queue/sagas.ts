import { put, takeEvery, select } from 'redux-saga/effects'
import { SET_QUEUE } from './constants';

interface SetQueueAction {
    payload: {
        tracks: Array<any>
    }
}

/* function* setQueue(action: SetQueueAction) {
    const { tracks, index } = action.payload;
    yield put({ type: FETCH_TRACKS_LOADING, payload: { search } });
    const { accessToken } = yield select((state: any) => state.user.spotify)
    const response = yield fetch(
        `https://api.spotify.com/v1/search?q=${search}&offset=${index}&type=track`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
    if (response.status >= 400) {
        console.log(response);
        yield put({ type: FETCH_TRACKS_ERROR, payload: { error: "Bad response from server" }})
    } else {
        const { tracks } = yield response.json();
        yield put({ type: FETCH_TRACKS_SUCCESS, payload: { tracks: tracks.items } })
    }
}

export function* watchFetchTracks() {
    yield takeEvery(FETCH_TRACKS, fetchTracks)
} */
import { generateSaga } from '../../utils/';
import { GET_SPOTIFY_PLAYLIST_ACTIONS, GET_SOUNDCLOUD_PLAYLIST_ACTIONS } from './constants';
import { takeEvery, select, put } from 'redux-saga/effects';
import { formatSoundCloudTracks } from '../tracks/utils';

export const watchGetSpotifyPlaylist = generateSaga({
    ...GET_SPOTIFY_PLAYLIST_ACTIONS,
    url: ({ playlistId }: { playlistId: string }) => `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    method: 'GET',
    isSpotify: true,
})

function* getSoundCloudPlaylist() {
    const { ids } = yield select((state: any) => state.trackList);
    const rangedIds = ids.slice(0,50).join('%2C');
    yield put({ type: GET_SOUNDCLOUD_PLAYLIST_ACTIONS.loading });
    const response = yield fetch(
        `https://api-v2.soundcloud.com/tracks?ids=${rangedIds}&client_id=LwwkfCVkKXcE8djbcXfrQLnZZBqZk3f3&%5Bobject%20Object%5D=&app_version=1595844156&app_locale=en`
    );
    if (response.status >= 400) {
        yield put({ type: GET_SOUNDCLOUD_PLAYLIST_ACTIONS.error, payload: { error: "Bad response from server" }})
    } else {
        const responseJSON = yield response.json();
        const items = formatSoundCloudTracks({ collection: responseJSON });
        yield put({ type: GET_SOUNDCLOUD_PLAYLIST_ACTIONS.success, payload: { items } })    
    }
}

export function* watchGetSoundCloudPlaylist() {
    yield takeEvery(GET_SOUNDCLOUD_PLAYLIST_ACTIONS.saga, getSoundCloudPlaylist);
}


import { generateSaga, domain } from '../../utils';
import { GET_PLAYLIST_ACTIONS } from './constants';

export const watchGetPlaylist = generateSaga({
    ...GET_PLAYLIST_ACTIONS,
    url: ({ id, playlistId, type, offset }: { id: string, playlistId: string, type: number, offset: number }) => `${domain}/users/${id}/playlists/${playlistId}?type=${type}&offset=${offset}`,
    method: 'GET'
})

/* function* getSoundCloudPlaylist() {
    const { ids } = yield select((state: any) => state.trackList);
    const { _id } = yield select((state: any) => state.queue);
    const rangedIds = ids.slice(0,50).join('%2C');
    yield put({ type: GET_SOUNDCLOUD_PLAYLIST_ACTIONS.loading });
    const response = yield fetch(
        `https://api-v2.soundcloud.com/tracks?ids=${rangedIds}&client_id=LwwkfCVkKXcE8djbcXfrQLnZZBqZk3f3&%5Bobject%20Object%5D=&app_version=1595844156&app_locale=en`
    );
    if (response.status >= 400) {
        yield put({ type: GET_SOUNDCLOUD_PLAYLIST_ACTIONS.error, payload: { error: "Bad response from server" }})
    } else {
        const responseJSON = yield response.json();
        const items = formatSoundCloudTracks({ collection: responseJSON }, _id);
        yield put({ type: GET_SOUNDCLOUD_PLAYLIST_ACTIONS.success, payload: { items } })    
    }
}

export function* watchGetSoundCloudPlaylist() {
    yield takeEvery(GET_SOUNDCLOUD_PLAYLIST_ACTIONS.saga, getSoundCloudPlaylist);
} */


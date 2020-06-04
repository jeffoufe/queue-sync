import { call, takeEvery, select, put } from 'redux-saga/effects'
import { PLAY_TRACK, NEXT_SONG, INCREMENT_INDEX } from './constants';

function* playSpotifyTrack(track: any) {
    const { deviceID, accessToken } = yield select((state: any) => state.user.spotify);
    yield fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`, 
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                uris: [`spotify:track:${track.id}`]
            })
        }
    );
}

function* playSoundCloudTrack(track: any) {
    const { soundObject } = track;
    try {
        const response = yield fetch(track.url)
        const stream = yield response.json();
        const mp3Url = stream.url;
        yield soundObject.loadAsync({ uri: mp3Url });
        yield soundObject.playAsync();
    } catch (error) {
        alert(error);
    }
}

function* playTrack() {
    const { currentIndex, tracks } = yield select((state: any) => state.queue);
    const track = tracks[currentIndex];
    let playFn;
    switch(track.type) {
        case 'spotify':
            playFn = playSpotifyTrack;
            break;
        case 'soundcloud':
            playFn = playSoundCloudTrack;
            break;
        default:
            break;
    }
    if (playFn) {
        yield call(playFn, track);
    }
}

export function* watchPlayTrack() {
    yield takeEvery(PLAY_TRACK, playTrack)
}

function* stopSoundCloudTrack(currentTrack: any) {
    yield currentTrack.soundObject.pauseAsync();
    yield currentTrack.soundObject.unloadAsync();
}

function* stopSpotifyTrack() {
    const { deviceID, accessToken } = yield select((state: any) => state.user.spotify);
    yield fetch(
        `https://api.spotify.com/v1/me/player/pause?device_id=${deviceID}`, 
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
}

function* pauseCurrentTrack() {
    const { currentIndex, tracks } = yield select((state: any) => state.queue);
    const currentTrack = tracks[currentIndex];
    switch (currentTrack.type) {
        case 'soundcloud':
            yield call(stopSoundCloudTrack, currentTrack);
            break;
        case 'spotify':
            yield call(stopSpotifyTrack);
            break;
            
    }
}

function* nextSong() {
    yield call(pauseCurrentTrack)
    yield put({ type: INCREMENT_INDEX });
    yield put({ type: PLAY_TRACK });
}

export function* watchNextSong() {
    yield takeEvery(NEXT_SONG, nextSong)
}

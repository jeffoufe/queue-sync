import { select, put } from 'redux-saga/effects';
import { PAUSE_TIMER, RESET_TIMER } from '../constants';
import { sendPause } from '.';

export default function* pauseSpotifyTrack(isFinished: boolean) {
    const { remainingTime, timerId, startTime, _id } = yield select((state: any) => state.queue);
    const spotify = yield select((state: any) => state.user.spotify);
    if (spotify && spotify.accessToken && spotify.deviceID) {
        const response = yield fetch(
            `https://api.spotify.com/v1/me/player/pause?device_id=${spotify.deviceID}`, 
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${spotify.accessToken}`
                }
            }
        );
        if (response.status !== 404) {
            if (isFinished) {
                yield put({ type: RESET_TIMER });
            } else {
                window.clearTimeout(timerId);
                put({
                    type: PAUSE_TIMER,
                    payload: {
                        remainingTime: remainingTime - (Date.now() - startTime)
                    } 
                })
                sendPause(_id);
            }
        }
    }
}
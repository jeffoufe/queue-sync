import { select } from 'redux-saga/effects';
import { sendPause } from '.';

export default function* pauseSoundCloudTrack(isFinished: boolean) {
    const { tracks, _id } = yield select((state: any) => state.queue);
    const currentTrack = tracks[0];
    try {
        yield currentTrack.soundObject.pauseAsync();
        if (isFinished) {
            yield currentTrack.soundObject.unloadAsync();
        }
        sendPause(_id);
    } catch (e) {
        console.log('Sound not loaded');
    }
}
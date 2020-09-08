import { store } from '../../../store';
import { NEXT_SONG } from '../constants';
import { sendPlay } from '.';
import { select } from 'redux-saga/effects';

const onPlaybackStatusUpdate = ({ didJustFinish }: any) => {
    if (didJustFinish) {
        store.dispatch({ type: NEXT_SONG });
    }
}

export default function* playSoundCloudTrack(track: any) {
    const { _id } = yield select((state: any) => state.queue);
    const { soundObject } = track;
    try {
        const response = yield fetch(track.url)
        const stream = yield response.json();
        const mp3Url = stream.url;
        if (!soundObject['_loaded']) {
            yield soundObject.loadAsync({ uri: mp3Url });
            yield soundObject.setProgressUpdateIntervalAsync(1000)
            yield soundObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
        }
        yield soundObject.playAsync();
        sendPlay(_id);
    } catch (error) {
        alert(error);
    }
}
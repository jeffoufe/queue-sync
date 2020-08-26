import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { tracksReducer, userReducer, queueReducer, routerReducer, libraryReducer, trackListReducer } from './reducers';
import { watchFetchTracks, watchFetchPlaylists, watchChangeProvider } from './reducers/tracks/sagas';
import { watchAddPlaylistToPlaylist, watchSavePlaylist, watchGetPlaylists, watchCreateMixedPlaylist, watchAddToPlaylist, watchDeleteFromPlaylist, watchDeletePlaylist } from './reducers/library/sagas';
import { watchPlayTrack, watchNextSong, watchInstantPlayTrack, watchPlayPauseCurrentTrack, watchGetParty, watchCreateParty, watchAddToQueue, watchDeleteFromQueue, watchAddPlaylistToQueue } from './reducers/queue/sagas';
import { watchAuthorize, watchGetAvailableDevices, watchSelectDevice } from './reducers/user/authorize/spotify';
import { watchRefreshSpotify } from './reducers/user/refresh/spotify';
import { watchGetCredentials } from './reducers/user/sagas';
import { watchGetPlaylist } from './reducers/trackList/sagas';
import { all } from 'redux-saga/effects';
import logger from 'redux-logger'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user'],
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    yield all([
        watchDeletePlaylist(),
        watchGetCredentials(),
        watchAddPlaylistToQueue(),
        watchAddPlaylistToPlaylist(),
        watchDeleteFromPlaylist(),
        watchAddToPlaylist(),
        watchCreateMixedPlaylist(),
        watchGetPlaylists(),
        watchGetPlaylist(),
        watchSavePlaylist(),
        watchRefreshSpotify(),
        watchFetchTracks(),
        watchFetchPlaylists(),
        watchChangeProvider(),
        watchAuthorize(),
        watchGetAvailableDevices(),
        watchPlayTrack(),
        watchInstantPlayTrack(),
        watchNextSong(),
        watchPlayPauseCurrentTrack(),
        watchCreateParty(),
        watchGetParty(),
        watchAddToQueue(),
        watchDeleteFromQueue(),
        watchSelectDevice()
    ])
  }

const reducers = combineReducers({
    tracks: tracksReducer,
    user: userReducer,
    queue: queueReducer,
    router: routerReducer,
    library: libraryReducer,
    trackList: trackListReducer
});

const persistedReducerers = persistReducer(persistConfig, reducers);

export const store = createStore(
    persistedReducerers,
    applyMiddleware(sagaMiddleware, logger)
)

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga)
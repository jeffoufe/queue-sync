import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist';
// import { AsyncStorage } from 'react-native'
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { tracksReducer, userReducer, queueReducer, routerReducer } from './reducers';
import { watchFetchTracks } from './reducers/tracks/sagas';
import { watchPlayTrack, watchNextSong, watchInstantPlayTrack, watchPlayPauseCurrentTrack, watchGetParty, watchCreateParty, watchAddToQueue, watchDeleteFromQueue } from './reducers/queue/sagas';
import { watchAuthorize, watchAuthorizeDeezer } from './reducers/user/sagas';
import { all } from 'redux-saga/effects';
import logger from 'redux-logger'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
    yield all([
        watchFetchTracks(),
        watchAuthorize(),
        watchAuthorizeDeezer(),
        watchPlayTrack(),
        watchInstantPlayTrack(),
        watchNextSong(),
        watchPlayPauseCurrentTrack(),
        watchCreateParty(),
        watchGetParty(),
        watchAddToQueue(),
        watchDeleteFromQueue()
    ])
  }

const reducers = combineReducers({
    tracks: tracksReducer,
    user: userReducer,
    queue: queueReducer,
    router: routerReducer
});

const persistedReducerers = persistReducer(persistConfig, reducers);

export const store = createStore(
    persistedReducerers,
    applyMiddleware(sagaMiddleware, logger)
)

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga)
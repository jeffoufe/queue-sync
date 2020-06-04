import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { tracksReducer, userReducer, queueReducer } from './reducers';
import { watchFetchTracks } from './reducers/tracks/sagas';
import { watchPlayTrack, watchNextSong } from './reducers/queue/sagas';
import { watchAuthorize } from './reducers/user/sagas';
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
        watchFetchTracks(),
        watchAuthorize(),
        watchPlayTrack(),
        watchNextSong()
    ])
  }

const reducers = combineReducers({
    tracks: tracksReducer,
    user: userReducer,
    queue: queueReducer
});

const persistedReducerers = persistReducer(persistConfig, reducers);

export const store = createStore(
    persistedReducerers,
    applyMiddleware(sagaMiddleware, logger)
)

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga)
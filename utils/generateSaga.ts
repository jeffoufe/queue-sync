import { put, takeEvery, select } from 'redux-saga/effects';
import axios from 'axios'; 

interface Actions {
    saga: string,
    loading: string,
    success: string,
    error: string,
}

interface Saga extends Actions {
    url: (params?: Object) => string,
    method: "PUT" | "GET" | "DELETE" | "POST" | "PATCH",
    params?: Object,
    isSpotify?: boolean,
    streaming?: boolean,
    responsePath: string,
}

interface Action {
    type: string,
    payload?: Object,
    urlParams?: Object,
    loadingPayload?: Object,
    successCallback?: () => void
}

export default (saga: Saga) => {
    const sagaFn = function* (action: Action) {
        yield put({ type: saga.loading, payload: action.loadingPayload || {} })
        
        const accessToken = yield select((state: any) => state.user.spotify.accessToken);
        const { onDownloadProgress } = saga;
        
        const headers = !saga.isSpotify || !accessToken
            ? {} 
            : { Authorization: `Bearer ${accessToken}` } 

        const response = yield axios({
            method: saga.method,
            url: saga.url(action.urlParams),
            data: action && action.payload ? action.payload : {},
            onDownloadProgress,
            headers
        })

        if (response.status >= 400) {
            yield put({ type: saga.error, payload: { error: response.error } });
        } else {
            yield put({ type: saga.success, payload: response.data })
            if (action.successCallback) {
                action.successCallback()
            }
        }
    };
    return function* () {
        yield takeEvery(saga.saga, sagaFn)
    }
}
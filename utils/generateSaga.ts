import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios'; 

interface Actions {
    saga: string,
    loading: string,
    success: string,
    error: string,
}

interface Saga extends Actions {
    url: string,
    method: "PUT" | "GET" | "DELETE" | "POST" | "PATCH",
    params?: Object,
    responsePath: string,
}

interface Action {
    type: string,
    payload?: Object,
    urlParams?: Object,
    successCallback?: () => void
}

export default (saga: Saga) => {
    const sagaFn = function* (action: Action) {
        yield put({ type: saga.loading })
        const response = yield axios({
            method: saga.method,
            url: saga.url(action.urlParams),
            data: action && action.payload ? action.payload : {}
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
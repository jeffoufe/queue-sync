export const generateActions = (reducerName: string, actionName: string) => {
    const prefix = `${reducerName}/${actionName}`;
    return {
        saga: prefix,
        loading: `${prefix}_LOADING`,
        success: `${prefix}_SUCCESS`,
        error: `${prefix}_ERROR`,   
    }
}

export { default as debounce } from './debounce';
export { default as canSeePlayer } from './canSeePlayer';
export { default as routes } from './routes';
// export { generateActions } from './generateActions';
export { default as generateSaga } from './generateSaga';
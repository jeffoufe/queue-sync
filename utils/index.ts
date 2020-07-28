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

// export const domain = 'http://node-express-env-3.eba-ppfp3jba.us-east-2.elasticbeanstalk.com/'
export const domain = 'http://localhost:3000';